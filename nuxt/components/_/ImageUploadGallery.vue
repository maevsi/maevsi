<template>
  <Loader :api="api">
    <Card v-if="uploads?.length || allowAddition">
      <ul class="flex flex-wrap justify-center">
        <template v-if="uploads?.length">
          <li
            v-for="upload in uploads"
            :id="upload.id"
            :key="upload.id"
            :class="{
              'border-red-600': selectable && upload === selectedItem,
            }"
            class="relative box-border border-4 border-transparent"
            @click="toggleSelect(upload)"
          >
            <div v-if="upload.storageKey">
              <LoaderImage
                :alt="
                  upload.storageKey ? $t('uploadAlt') : $t('uploadAltFailed')
                "
                class="h-32 w-32"
                height="128"
                :src="getUploadImageSrc(upload.storageKey)"
                :title="
                  $t('uploadSize', { size: bytesToString(upload.sizeByte) })
                "
                width="128"
              />
              <div v-if="allowDeletion">
                <div
                  class="absolute right-0 top-0 rounded-bl-lg bg-red-600 opacity-75"
                >
                  <div class="flex h-full items-center justify-center">
                    <IconTrash class="m-2" :title="$t('iconTrash')" />
                  </div>
                </div>
                <div
                  class="absolute right-0 top-0"
                  @click="deleteImageUpload(upload.id)"
                >
                  <Button
                    :aria-label="$t('iconTrashLabel')"
                    class="flex h-full items-center justify-center"
                  >
                    <IconTrash
                      class="m-2 text-text-bright"
                      :title="$t('iconTrash')"
                    />
                  </Button>
                </div>
              </div>
            </div>
          </li>
        </template>
        <li class="relative box-border border-4 border-transparent">
          <Button
            v-if="allowAddition"
            :aria-label="
              $t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            class="flex h-32 w-32 items-center justify-center bg-gray-200"
            :title="
              $t('iconAdd', {
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
          :aria-label="$t('globalShowMore')"
          @click="apiUploadsAfter = api.data.allUploads?.pageInfo.endCursor"
        >
          {{ $t('globalShowMore') }}
        </ButtonColored>
      </div>
    </Card>
    <div v-else class="flex flex-col gap-1 py-2">
      <!-- <p class="text-center">{{ $t('noPictures') }}</p> -->
      <div class="flex justify-center">
        <ButtonColored
          :aria-label="$t('uploadImages')"
          :to="localePath('/upload')"
        >
          {{ $t('uploadImages') }}
          <template slot="suffix">
            <IconArrowRight />
          </template>
        </ButtonColored>
      </div>
    </div>
    <Modal
      id="ModalImageUploadGallery"
      :submit-name="$t('upload')"
      :submit-task-provider="() => getUploadBlobPromise()"
    >
      <div class="text-center">
        <croppa
          ref="croppy"
          :initial-image="fileSelectedUrl"
          :placeholder="$t('croppaPlaceholder')"
          :placeholder-font-size="17.5"
          prevent-white-space
          :show-remove-button="false"
        />
      </div>
      <template slot="header">{{ $t('uploadNew') }}</template>
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
import { computed, onBeforeUnmount, ref, watch } from 'vue'
import { mapGetters } from 'vuex'

import { useNuxtApp, defineComponent, PropType, reactive } from '#app'

import {
  useAccountUploadQuotaBytesQuery,
  useAllUploadsQuery,
  useUploadCreateMutation,
} from '~/gql/generated'
import { TUSD_FILES_URL } from '~/plugins/util/validation'
import { ITEMS_PER_PAGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'

require('@uppy/core/dist/style.css')

interface Item {
  storageKey: string
}

export default defineComponent({
  props: {
    allowAddition: {
      default: true,
      type: Boolean,
    },
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
    const { $store, $t } = useNuxtApp()

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

    const apiData = reactive({
      api: {
        data: {
          ...allUploadsQuery.data.value,
          ...accountUploadQuotaBytesQuery.data.value,
        },
        ...getApiMeta([allUploadsQuery, accountUploadQuotaBytesQuery]),
      },
      uploads: allUploadsQuery.data.value?.allUploads?.nodes,
      accountUploadQuotaBytes:
        accountUploadQuotaBytesQuery.data.value?.accountUploadQuotaBytes,
    })
    const data = reactive({
      fileSelectedUrl: undefined as string | undefined,
      selectedItem: undefined as Item | undefined,
      uppy: undefined as Uppy | undefined,
    })
    const computations = {
      ...mapGetters(['jwt', 'signedInUsername']),
      sizeByteTotal: computed((): number | undefined => {
        if (!apiData.uploads) {
          return undefined
        }

        let sizeByteTotal = 0

        for (const upload of apiData.uploads) {
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
        xhr.setRequestHeader('Authorization', 'Bearer ' + computations.jwt())
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
                  text: $t('uploadDeleteFailed') as string,
                  title: $t('globalStatusError'),
                })
                break
              default:
                Swal.fire({
                  icon: 'warning',
                  text: $t('uploadDeleteUnexpectedStatusCode') as string,
                  title: $t('globalStatusWarning'),
                })
            }
          }
        }
        xhr.send()
      },
      fileLoaded(e: ProgressEvent<FileReader>) {
        data.fileSelectedUrl = e.target?.result as string | undefined
        $store.commit('modalAdd', { id: 'ModalImageUploadGallery' })
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
          fileReader.onload = (e) => this.fileLoaded(e)
          fileReader.readAsDataURL(file)
        } catch (err: any) {
          if (err.isRestriction) {
            consola.log('Restriction error: ' + err)
          } else {
            consola.error(err)
          }
        }
      },
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
              apiData.api.errors.push(result.error)
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
                reject($t('uploadError'))
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
@import '~/node_modules/vue-croppa/dist/vue-croppa.min.css';
</style>

<i18n lang="yml">
de:
  cancel: Abbrechen
  croppaPlaceholder: Wähle ein Bild
  iconAdd: 'Ein neues Bild hochladen. Genutzter Speicherplatz: {sizeUsed}/{sizeTotal}.'
  iconTrash: löschen
  iconTrashLabel: Dieses hochgeladene Bild löschen.
  noPictures: Du hast keine hochgeladenen Bilder 😕
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
  noPictures: "You don't have any uploaded pictures 😕"
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
