<template>
  <Loader :api="api">
    <Card v-if="uploads?.length">
      <ul class="flex flex-wrap justify-center">
        <template v-if="uploads?.length">
          <li
            v-for="upload in uploads"
            :id="upload.id"
            :key="upload.id"
            :class="
              selectable && upload === selectedItem
                ? 'border-red-600'
                : 'border-transparent'
            "
            class="relative box-border border-4"
            @click="toggleSelect(upload)"
          >
            <div v-if="upload.storageKey">
              <LoaderImage
                :alt="upload.storageKey ? t('uploadAlt') : t('uploadAltFailed')"
                class="h-32 w-32"
                height="128"
                :src="getUploadImageSrc(upload.storageKey)"
                :title="
                  t('uploadSize', { size: bytesToString(upload.sizeByte) })
                "
                width="128"
              />
              <div v-if="allowDeletion">
                <div
                  class="absolute right-0 top-0 rounded-bl-lg bg-red-600 opacity-75"
                >
                  <div class="flex h-full items-center justify-center">
                    <IconTrash class="m-2" :title="t('iconTrash')" />
                  </div>
                </div>
                <div
                  class="absolute right-0 top-0"
                  @click="deleteImageUpload(upload.id)"
                >
                  <Button
                    :aria-label="t('iconTrashLabel')"
                    class="flex h-full items-center justify-center"
                  >
                    <IconTrash
                      class="m-2 text-text-bright"
                      :title="t('iconTrash')"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </template>
        <li class="relative box-border border-4 border-transparent">
          <Button
            :aria-label="
              t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            class="flex h-32 w-32 items-center justify-center bg-gray-200"
            :title="
              t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            @click="changeProfilePicture"
          >
            <IconPlus classes="h-12 text-gray-500 w-12" />
          </Button>
          <input
            id="input-profile-picture"
            accept="image/*"
            hidden
            name="input-profile-picture"
            type="file"
            @change="loadProfilePicture"
          />
        </li>
      </ul>
      <div
        v-if="api.data.allUploads?.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <ButtonColored
          :aria-label="t('globalShowMore')"
          @click="apiUploadsAfter = api.data.allUploads?.pageInfo.endCursor"
        >
          {{ t('globalShowMore') }}
        </ButtonColored>
      </div>
    </Card>
    <Modal
      id="ModalImageUploadGallery"
      :submit-name="t('upload')"
      :submit-task-provider="() => getUploadBlobPromise()"
    >
      <div class="text-center">
        <croppa
          ref="croppy"
          :initial-image="fileSelectedUrl"
          :placeholder="t('croppaPlaceholder')"
          :placeholder-font-size="17.5"
          prevent-white-space
          :show-remove-button="false"
        />
      </div>
      <template slot="header">{{ t('uploadNew') }}</template>
      <template slot="submit-icon"><IconUpload /></template>
    </Modal>
  </Loader>
</template>

<script lang="ts">
import { Uppy, UploadResult, UppyFile } from '@uppy/core'
import Tus from '@uppy/tus'
import consola from 'consola'
import prettyBytes from 'pretty-bytes'
import Swal from 'sweetalert2'
import {
  defineComponent,
  PropType,
  reactive,
  computed,
  onBeforeUnmount,
  ref,
  watch,
} from 'vue'
import { useI18n } from 'vue-i18n'

import {
  useAccountUploadQuotaBytesQuery,
  useAllUploadsQuery,
  useUploadCreateMutation,
} from '~/gql/generated'
import { TUSD_FILES_URL } from '~/plugins/util/validation'
import { ITEMS_PER_PAGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'
import { useMaevsiStore } from '~/store'

interface Item {
  storageKey: string
}

export default defineComponent({
  props: {
    allowDeletion: {
      default: true,
      type: Boolean,
    },
    selectable: {
      default: false,
      type: Boolean,
    },
    username: {
      required: true,
      type: String as PropType<string | undefined>,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()
    const store = useMaevsiStore()

    const { executeMutation: executeMutationUploadCreate } =
      useUploadCreateMutation()

    const refs = {
      apiUploadsAfter: ref<string>(),
      croppy: ref(),
    }
    const allUploadsQuery = useAllUploadsQuery({
      variables: {
        after: refs.apiUploadsAfter,
        username: props.username,
        first: ITEMS_PER_PAGE,
      },
    })
    const accountUploadQuotaBytesQuery = useAccountUploadQuotaBytesQuery()

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...allUploadsQuery.data.value,
            ...accountUploadQuotaBytesQuery.data.value,
          },
          ...getApiMeta([allUploadsQuery, accountUploadQuotaBytesQuery]),
        }
      }),
      uploads: computed(() => allUploadsQuery.data.value?.allUploads?.nodes),
      accountUploadQuotaBytes: computed(
        () => accountUploadQuotaBytesQuery.data.value?.accountUploadQuotaBytes
      ),
    }
    const data = reactive({
      fileSelectedUrl: undefined as string | undefined,
      jwt: store.jwt,
      selectedItem: undefined as Item | undefined,
      signedInUsername: store.signedInUsername,
      uppy: undefined as Uppy | undefined,
    })
    const computations = {
      sizeByteTotal: computed((): number | undefined => {
        if (!apiData.uploads.value) {
          return undefined
        }

        let sizeByteTotal = 0

        for (const upload of apiData.uploads.value) {
          sizeByteTotal += upload.sizeByte
        }

        return sizeByteTotal
      }),
    }
    const methods = {
      bytesToString(
        bytes: number | string | undefined | null
      ): string | undefined {
        if (bytes === undefined || bytes === null) {
          return undefined
        }
        return prettyBytes(+bytes)
      },
      changeProfilePicture() {
        ;(
          document.querySelector('#input-profile-picture') as HTMLInputElement
        ).click()
      },
      deleteImageUpload(uploadId: string) {
        const element = document.getElementById(uploadId) as Element

        element.classList.add('disabled')

        const xhr = new XMLHttpRequest()

        xhr.open('DELETE', '/api/tusd?uploadId=' + uploadId, true)
        xhr.setRequestHeader('Hook-Name', 'maevsi/pre-terminate')
        xhr.setRequestHeader('Authorization', 'Bearer ' + data.jwt)
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            element.classList.remove('disabled')

            switch (xhr.status) {
              case 204:
                // TODO: cache update (allUploads)
                emit('deletion')
                break
              case 500:
                Swal.fire({
                  icon: 'error',
                  text: t('uploadDeleteFailed') as string,
                  title: t('globalStatusError'),
                })
                break
              default:
                Swal.fire({
                  icon: 'warning',
                  text: t('uploadDeleteUnexpectedStatusCode') as string,
                  title: t('globalStatusWarning'),
                })
            }
          }
        }
        xhr.send()
      },
      fileLoaded(e: ProgressEvent<FileReader>) {
        data.fileSelectedUrl = e.target?.result as string | undefined
        store.modalAdd({ id: 'ModalImageUploadGallery' })
      },
      getUploadImageSrc(uploadStorageKey: string) {
        return TUSD_FILES_URL + uploadStorageKey + '+'
      },
      loadProfilePicture(payload: Event) {
        const target = payload.target as HTMLInputElement
        const files = Array.from(target.files ?? [])

        if (files.length !== 1) {
          return
        }

        const file = files[0]

        try {
          const fileReader = new FileReader()
          fileReader.onload = (e) => methods.fileLoaded(e)
          fileReader.readAsDataURL(file)
        } catch (err: any) {
          if (err.isRestriction) {
            consola.log('Restriction error: ' + err)
          } else {
            consola.error(err)
          }
        }
      },
      t,
      toggleSelect(upload: any) {
        if (data.selectedItem === upload) {
          data.selectedItem = undefined
          emit('selection', undefined)
        } else {
          data.selectedItem = upload
          emit('selection', data.selectedItem?.storageKey)
        }
      },
      getUploadBlobPromise() {
        return new Promise<void>((resolve, reject) => {
          refs.croppy.value?.promisedBlob().then(async (blob: Blob) => {
            const result = await executeMutationUploadCreate({
              uploadCreateInput: {
                sizeByte: blob.size,
              },
            })

            if (result.error) {
              apiData.api.value.errors.push(result.error)
              consola.error(result.error)
              return reject(result.error)
            }

            if (!result.data) {
              return
            }

            data.uppy = new Uppy({
              id: 'profile-picture',
              debug: process.env.NODE_ENV !== 'production',
              restrictions: {
                maxFileSize: 1048576,
                maxNumberOfFiles: 1,
                minNumberOfFiles: 1,
                allowedFileTypes: ['image/*'],
              },
              meta: {
                maevsiUploadUuid: result.data.uploadCreate?.uuid,
              },
              onBeforeUpload: (files: { [key: string]: UppyFile }) => {
                const updatedFiles: Record<string, any> = {}

                Object.keys(files).forEach((fileID) => {
                  updatedFiles[fileID] = {
                    ...files[fileID],
                    name: '/profile-pictures/' + files[fileID].name,
                  }
                })

                return updatedFiles
              },
            })

            data.uppy.use(Tus, {
              endpoint: TUSD_FILES_URL,
              limit: 1,
              removeFingerprintOnSuccess: true,
            })

            data.uppy.addFile({
              source: 'croppy',
              name: (
                document.querySelector(
                  '#input-profile-picture'
                ) as HTMLInputElement
              ).files![0]!.name,
              type: blob.type,
              data: blob,
            })

            data.uppy.upload().then((value: UploadResult) => {
              // TODO: cache update (allUploads)

              if (value.failed.length > 0) {
                reject(t('uploadError'))
              } else {
                resolve()
              }
            })
          })
        })
      },
    }

    onBeforeUnmount(() => {
      if (data.uppy) {
        data.uppy.close()
      }
    })

    watch(allUploadsQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...apiData,
      ...refs,
      ...data,
      ...computations,
      ...methods,
    }
  },
})
</script>

<style scoped>
@import '~/node_modules/@uppy/core/dist/style.css';
@import '~/node_modules/vue-croppa/dist/vue-croppa.min.css';
</style>

<i18n lang="yml">
de:
  cancel: Abbrechen
  croppaPlaceholder: Wähle ein Bild
  iconAdd: 'Ein neues Bild hochladen. Genutzter Speicherplatz: {sizeUsed}/{sizeTotal}.'
  iconTrash: löschen
  iconTrashLabel: Dieses hochgeladene Bild löschen.
  postgres53100: Der Speicherplatz deines Accounts ist aufgebraucht!
  upload: Hochladen
  uploadAlt: Ein hochgeladenes Bild.
  uploadAltFailed: Ein Bild, das nicht vollständig hochgeladen wurde.
  uploadDeleteFailed: Das Löschen des Elements ist fehlgeschlagen!
  uploadDeleteUnexpectedStatusCode: Beim Löschen des Elements trat ein unerwarteter Statuscode auf.
  uploadError: 'Fehler: Dateien wurden nicht erfolgreich hochgeladen!'
  uploadImages: Bilder hochladen
  uploadNew: Lade ein neues Bild hoch
  uploadSize: 'Größe: {size}'
en:
  cancel: Cancel
  croppaPlaceholder: Choose an image
  iconAdd: 'Upload a new image. Used storage space: {sizeUsed}/{sizeTotal}.'
  iconTrash: trash
  iconTrashLabel: Delete this uploaded image.
  postgres53100: Your account space has been used up!
  upload: Upload
  uploadAlt: An uploaded image.
  uploadAltFailed: An image for which the upload didn't finish.
  uploadDeleteFailed: Deleting upload failed!
  uploadDeleteUnexpectedStatusCode: Deleting upload returned an unexpected status code.
  uploadError: 'Error: Some files did not upload successfully!'
  uploadImages: Upload pictures
  uploadNew: Upload a new image
  uploadSize: 'Size: {size}'
</i18n>
