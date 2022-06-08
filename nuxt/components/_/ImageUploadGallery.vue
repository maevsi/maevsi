<template>
  <Loader
    v-if="($apollo.loading && !allUploads) || graphqlError"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
  />
  <div v-else>
    <Card
      v-if="
        (allUploads !== undefined && allUploads.nodes.length > 0) ||
        allowAddition
      "
    >
      <ul class="flex flex-wrap justify-center">
        <template v-if="allUploads">
          <li
            v-for="upload in allUploads.nodes"
            :id="upload.id"
            :key="upload.id"
            :class="{
              'border-red-600': selectable && upload === selectedItem,
            }"
            class="relative box-border border-4 border-transparent"
            @click="toggleSelect(upload)"
          >
            <LoaderImage
              :alt="upload.storageKey ? $t('uploadAlt') : $t('uploadAltFailed')"
              class="h-32 w-32"
              height="128"
              :src="$util.TUSD_FILES_URL + upload.storageKey + '+'"
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
        v-if="allUploads !== undefined && allUploads.pageInfo.hasNextPage"
        class="flex justify-center"
      >
        <ButtonColored
          :aria-label="$t('globalShowMore')"
          @click="$util.loadMore($apollo, 'allUploads', allUploads)"
        >
          {{ $t('globalShowMore') }}
        </ButtonColored>
      </div>
    </Card>
    <div v-else class="flex flex-col gap-1 py-2">
      <!-- <p class="text-center">{{ $t('noPictures') }}</p> -->
      <div class="flex justify-center">
        <Button :aria-label="$t('uploadImages')" :to="localePath('/upload')">
          {{ $t('uploadImages') }}
          <template slot="suffix">
            <IconArrowRight />
          </template>
        </Button>
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
  </div>
</template>

<script lang="ts">
import { Uppy, UploadResult, UppyFile } from '@uppy/core'
import Tus from '@uppy/tus'
import consola from 'consola'
import prettyBytes from 'pretty-bytes'
import { mapGetters } from 'vuex'

import { defineComponent, PropType } from '#app'
import ACCOUNT_UPLOAD_QUOTA_BYTES from '~/gql/query/account/accountUploadQuotaBytes.gql'
import UPLOADS_ALL_QUERY from '~/gql/query/upload/uploadsAll.gql'
import UPLOAD_CREATE_MUTATION from '~/gql/mutation/upload/uploadCreate.gql'

require('@uppy/core/dist/style.css')

interface Item {
  storageKey: string
}

export default defineComponent({
  apollo: {
    allUploads(): any {
      return {
        query: UPLOADS_ALL_QUERY,
        variables: {
          first: this.$util.ITEMS_PER_PAGE,
          offset: null,
          username: this.username,
        },
        update: (data: any) => data.allUploads,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
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
  data() {
    return {
      accountUploadQuotaBytes: undefined as number | undefined,
      allUploads: undefined as any,
      croppy: {},
      fileSelectedUrl: undefined as string | undefined,
      graphqlError: undefined as Error | undefined,
      selectedItem: undefined as Item | undefined,
      uploadIdPrefix: 'upid_',
      uppy: undefined as Uppy | undefined,
    }
  },
  async fetch() {
    if (!this.signedInUsername) return

    this.accountUploadQuotaBytes = await this.$apollo
      .query({
        query: ACCOUNT_UPLOAD_QUOTA_BYTES,
        fetchPolicy: 'network-only',
      })
      .then(({ data }) => data.accountUploadQuotaBytes)
      .catch((reason) => {
        this.graphqlError = reason
        consola.error(reason)
      })
  },
  computed: {
    ...mapGetters(['jwt', 'signedInUsername']),
    sizeByteTotal(): number | undefined {
      if (!this.allUploads) {
        return undefined
      }

      let sizeByteTotal = 0

      for (const upload of this.allUploads.nodes) {
        sizeByteTotal += upload.sizeByte
      }

      return sizeByteTotal
    },
  },
  beforeUnmount() {
    if (this.uppy) {
      this.uppy.close()
    }
  },
  methods: {
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
      xhr.setRequestHeader('Authorization', 'Bearer ' + this.jwt)
      xhr.onreadystatechange = () => {
        if (xhr.readyState === 4) {
          element.classList.remove('disabled')

          switch (xhr.status) {
            case 204:
              this.$apollo.queries.allUploads.refetch()
              this.$emit('deletion')
              break
            case 500:
              this.$swal({
                icon: 'error',
                text: this.$t('uploadDeleteFailed') as string,
                title: this.$t('globalStatusError'),
              })
              break
            default:
              this.$swal({
                icon: 'warning',
                text: this.$t('uploadDeleteUnexpectedStatusCode') as string,
                title: this.$t('globalStatusWarning'),
              })
          }
        }
      }
      xhr.send()
    },
    fileLoaded(e: ProgressEvent<FileReader>) {
      this.fileSelectedUrl = e.target?.result as string | undefined
      this.$store.commit('modalAdd', { id: 'ModalImageUploadGallery' })
    },
    loadProfilePicture(event: InputEvent) {
      const target = event.target as HTMLInputElement
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
      if (this.selectedItem === upload) {
        this.selectedItem = undefined
        this.$emit('selection', undefined)
      } else {
        this.selectedItem = upload
        this.$emit('selection', this.selectedItem?.storageKey)
      }
    },
    getUploadBlobPromise() {
      return new Promise<void>((resolve, reject) => {
        ;(this.$refs.croppy as any).promisedBlob().then(async (blob: Blob) => {
          const res = await this.$apollo
            .mutate({
              mutation: UPLOAD_CREATE_MUTATION,
              variables: {
                uploadCreateInput: {
                  sizeByte: blob.size,
                },
              },
            })
            .then(({ data }) => this.$util.getNested(data, 'uploadCreate'))
            .catch((graphqlError) => {
              const reason = this.$util.getGqlErrorMessages(graphqlError, this)
              consola.error(reason)
              reject(reason)
            })

          if (!res) {
            return
          }

          this.uppy = new Uppy({
            id: 'profile-picture',
            debug: process.env.NODE_ENV !== 'production',
            restrictions: {
              maxFileSize: 1048576,
              maxNumberOfFiles: 1,
              minNumberOfFiles: 1,
              allowedFileTypes: ['image/*'],
            },
            meta: {
              maevsiUploadUuid: res.uuid,
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

          this.uppy.use(Tus, {
            endpoint: this.$util.TUSD_FILES_URL,
            limit: 1,
            removeFingerprintOnSuccess: true,
          })

          this.uppy.addFile({
            source: 'croppy',
            name: (
              document.querySelector(
                '#input-profile-picture'
              ) as HTMLInputElement
            ).files![0]!.name,
            type: blob.type,
            data: blob,
          })

          this.uppy.upload().then((value: UploadResult) => {
            this.$apollo.queries.allUploads.refetch()

            if (value.failed.length > 0) {
              reject(this.$t('uploadError'))
            } else {
              resolve()
            }
          })
        })
      })
    },
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
