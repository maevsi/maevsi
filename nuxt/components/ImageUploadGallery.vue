<template>
  <Loader
    v-if="($apollo.loading && !allUploads) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div
      v-if="
        (allUploads !== undefined && allUploads.nodes.length > 0) ||
        allowAddition
      "
      class="card dark:card-dark"
    >
      <ul class="flex flex-wrap justify-center">
        <template v-if="allUploads">
          <li
            v-for="upload in allUploads.nodes"
            :id="uploadIdPrefix + upload.uuid"
            :key="upload.uuid"
            :class="{
              'border-red-600': selectable && upload === selectedItem,
            }"
            class="border-4 border-transparent box-border relative"
            @click="toggleSelect(upload)"
          >
            <LoaderImage
              :alt="upload.storageKey ? $t('uploadAlt') : $t('uploadAltFailed')"
              class="h-32 w-32"
              height="128"
              :src="$global.TUSD_FILES_URL + upload.storageKey + '+'"
              :title="
                $t('uploadSize', { size: bytesToString(upload.sizeByte) })
              "
              width="128"
            />
            <div v-if="allowDeletion">
              <div
                class="
                  absolute
                  bg-red-600
                  opacity-75
                  right-0
                  rounded-bl-lg
                  top-0
                "
              >
                <div class="flex h-full justify-center items-center">
                  <FontAwesomeIcon
                    :icon="['fas', 'trash']"
                    class="m-2"
                    size="lg"
                    :title="$t('iconTrash')"
                  />
                </div>
              </div>
              <div
                class="absolute right-0 top-0"
                @click="deleteImageUpload(upload.uuid)"
              >
                <button
                  :aria-label="$t('iconTrashLabel')"
                  class="flex h-full justify-center items-center"
                  type="button"
                >
                  <FontAwesomeIcon
                    :icon="['fas', 'trash']"
                    class="m-2 text-text-bright"
                    size="lg"
                    :title="$t('iconTrash')"
                  />
                </button>
              </div>
            </div>
          </li>
        </template>
        <li>
          <button
            v-if="allowAddition"
            :aria-label="
              $t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            class="bg-gray-200 h-32 m-1 w-32"
            :title="
              $t('iconAdd', {
                sizeUsed: bytesToString(sizeByteTotal),
                sizeTotal: bytesToString(accountUploadQuotaBytes),
              })
            "
            type="button"
            @click="changeProfilePicture"
          >
            <FontAwesomeIcon
              :icon="['fas', 'plus']"
              class="text-gray-500"
              size="2x"
            />
          </button>
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
        <Button :aria-label="$t('globalPagingMore')" @click="showMore">
          {{ $t('globalPagingMore') }}
        </Button>
      </div>
    </div>
    <p v-else class="text-center">{{ $t('noPictures') }}</p>
    <Modal
      id="ModalImageUploadGallery"
      :submit-icon-id="['fas', 'upload']"
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
    </Modal>
  </div>
</template>

<script lang="ts">
import Uppy, { UploadResult, UppyFile } from '@uppy/core'
import Tus from '@uppy/tus'
import prettyBytes from 'pretty-bytes'
import { mapGetters } from 'vuex'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ACCOUNT_UPLOAD_QUOTA_BYTES from '~/gql/query/account/accountUploadQuotaBytes.gql'
import UPLOADS_ALL_QUERY from '~/gql/query/upload/uploadsAll.gql'
import UPLOAD_CREATE_MUTATION from '~/gql/mutation/upload/uploadCreate.gql'

require('@uppy/core/dist/style.css')

const consola = require('consola')

interface Item {
  storageKey: string
}

export default defineComponent({
  apollo: {
    allUploads(): any {
      return {
        query: UPLOADS_ALL_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
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
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  data() {
    return {
      accountUploadQuotaBytes: undefined as number | undefined,
      allUploads: undefined as any,
      croppy: {},
      fileSelectedUrl: undefined as string | undefined,
      graphqlError: undefined as any,
      selectedItem: undefined as Item | undefined,
      uploadIdPrefix: 'upid_',
      uppy: undefined as Uppy | undefined,
    }
  },
  async fetch() {
    if (this.$store.getters.signedInUsername) {
      this.accountUploadQuotaBytes = await this.$apollo
        .query({
          query: ACCOUNT_UPLOAD_QUOTA_BYTES,
        })
        .then(({ data }) => data.accountUploadQuotaBytes)
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    }
  },
  computed: {
    ...mapGetters(['jwt']),
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
    deleteImageUpload(uploadUuid: string) {
      const element = document.getElementById(
        this.uploadIdPrefix + uploadUuid
      ) as Element

      element.classList.add('disabled')

      const xhr = new XMLHttpRequest()

      xhr.open('DELETE', '/tusd?uploadId=' + uploadUuid, true)
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
              this.$store.commit('modalAdd', {
                contentBody: this.$t('uploadDeleteFailed'),
              })
              break
            default:
              this.$store.commit('modalAdd', {
                contentBody: this.$t('uploadDeleteUnexpectedStatusCode'),
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
      } catch (err) {
        if (err.isRestriction) {
          consola.log('Restriction error: ' + err)
        } else {
          consola.error(err)
        }
      }
    },
    showMore() {
      this.$apollo.queries.allUploads.fetchMore({
        variables: {
          cursor: this.allUploads.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          if (!fetchMoreResult) {
            return previousResult
          }

          const newNodes = fetchMoreResult.allUploads.nodes
          const pageInfo = fetchMoreResult.allUploads.pageInfo

          return {
            allUploads: {
              __typename: previousResult.allUploads.__typename,
              nodes: [...previousResult.allUploads.nodes, ...newNodes],
              pageInfo,
            },
          }
        },
      })
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
            .then(({ data }) => this.$global.getNested(data, 'uploadCreate'))
            .catch((reason) => {
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
            endpoint: this.$global.TUSD_FILES_URL,
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
  upload: Hochladen
  uploadAlt: Ein hochgeladenes Bild.
  uploadAltFailed: Ein Bild, das nicht vollständig hochgeladen wurde.
  uploadDeleteFailed: Das Löschen des Elements ist fehlgeschlagen!
  uploadDeleteUnexpectedStatusCode: Beim Löschen des Elements trat ein unerwarteter Statuscode auf.
  uploadError: 'Fehler: Dateien wurden nicht erfolgreich hochgeladen!'
  uploadNew: Lade ein neues Bild hoch
  uploadSize: 'Größe: {size}'
en:
  cancel: Cancel
  croppaPlaceholder: Choose an image
  iconAdd: 'Upload a new image. Used storage space: {sizeUsed}/{sizeTotal}.'
  iconTrash: trash
  iconTrashLabel: Delete this uploaded image.
  noPictures: "You don't have any uploaded pictures 😕"
  upload: Upload
  uploadAlt: An uploaded image.
  uploadAltFailed: An image for which the upload didn't finish.
  uploadDeleteFailed: Deleting upload failed!
  uploadDeleteUnexpectedStatusCode: Deleting upload returned an unexpected status code.
  uploadError: 'Error: Some files did not upload successfully!'
  uploadNew: Upload a new image
  uploadSize: 'Size: {size}'
</i18n>
