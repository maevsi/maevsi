<template>
  <Loader
    v-if="($apollo.loading && !allUploads) || graphqlErrorMessage"
    :error-message="graphqlErrorMessage"
  />
  <div v-else>
    <div
      v-if="
        (allUploads !== undefined && allUploads.nodes.length > 0) ||
        allowAddition
      "
      class="card"
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
              :alt="$t('uploadAlt')"
              class="h-32 w-32"
              :src="$global.TUSD_FILES_URL + upload.storageKey + '+'"
              :title="
                $t('uploadSize', { size: bytesToString(upload.sizeByte) })
              "
            />
            <div v-if="allowDeletion">
              <div
                class="absolute bg-red-600 opacity-75 right-0 rounded-bl-lg top-0"
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
            :aria-label="$t('iconAddLabel')"
            class="bg-gray-600 flex-none h-32 m-1 w-32"
            type="button"
            @click="changeProfilePicture"
          >
            <FontAwesomeIcon
              :icon="['fas', 'plus']"
              class="text-text-bright"
              :title="$t('iconAdd')"
              size="3x"
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
        <Button @click="showMore">
          {{ $t('globalPagingMore') }}
        </Button>
      </div>
    </div>
    <p v-else>{{ $t('noPictures') }}</p>
    <Modal
      id="ModalImageUploadGallery"
      is-cancellable
      :submit-icon-id="['fas', 'upload']"
      :submit-name="$t('upload')"
      :submit-task-provider="() => getUploadBlobPromise()"
    >
      <h2 slot="header">{{ $t('uploadNew') }}</h2>
      <Croppa
        ref="croppy"
        :initial-image="fileSelectedUrl"
        :placeholder="$t('croppaPlaceholder')"
        :placeholder-font-size="17.5"
        prevent-white-space
        :show-remove-button="false"
      />
    </Modal>
  </div>
</template>

<script>
import Croppa from 'vue-croppa'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import prettyBytes from 'pretty-bytes'

import UPLOADS_ALL_QUERY from '~/gql/query/upload/uploadsAll'
import UPLOAD_CREATE_MUTATION from '~/gql/mutation/upload/uploadCreate'

require('@uppy/core/dist/style.css')

const consola = require('consola')

export default {
  apollo: {
    allUploads() {
      return {
        query: UPLOADS_ALL_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          username: this.username,
        },
        update: (data) => data.allUploads,
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        },
      }
    },
  },
  components: {
    Croppa: Croppa.component,
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
      type: String,
    },
  },
  data() {
    return {
      allUploads: undefined,
      croppy: {},
      fileSelectedUrl: undefined,
      graphqlErrorMessage: undefined,
      selectedItem: undefined,
      uploadIdPrefix: 'upid_',
      uppy: undefined,
    }
  },
  computed: {
    jwt() {
      return this.$store.state.jwt
    },
  },
  methods: {
    bytesToString(bytes) {
      return prettyBytes(+bytes)
    },
    changeProfilePicture() {
      document.querySelector('#input-profile-picture').click()
    },
    deleteImageUpload(uploadUuid) {
      const element = document.getElementById(this.uploadIdPrefix + uploadUuid)

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
              alert(this.$t('uploadDeleteFailed'))
              break
            default:
              alert(this.$t('uploadDeleteUnexpectedStatusCode'))
          }
        }
      }
      xhr.send()
    },
    fileLoaded(e) {
      this.fileSelectedUrl = e.target.result
      this.$store.commit('modalAdd', { id: 'ModalImageUploadGallery' })
    },
    loadProfilePicture(event) {
      const files = Array.from(event.target.files)

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
    toggleSelect(upload) {
      if (this.selectedItem === upload) {
        this.selectedItem = undefined
        this.$emit('selection', undefined)
      } else {
        this.selectedItem = upload
        this.$emit('selection', this.selectedItem.storageKey)
      }
    },
    getUploadBlobPromise() {
      return new Promise((resolve, reject) => {
        this.$refs.croppy.promisedBlob().then(async (blob) => {
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
              consola.error(reason.toString())
              reject(reason)
            })

          if (!res) {
            return
          }

          this.uppy = Uppy({
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
            onBeforeUpload: (files) => {
              const updatedFiles = {}

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
            name: document.querySelector('#input-profile-picture').files[0]
              .name,
            type: blob.type,
            data: blob,
          })

          this.uppy.upload().then((value) => {
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
}
</script>

<style scoped>
@import '~/node_modules/vue-croppa/dist/vue-croppa.min.css';
</style>

<i18n lang="yml">
de:
  cancel: 'Abbrechen'
  croppaPlaceholder: 'Wähle ein Bild'
  iconAdd: 'hinzufügen'
  iconAddLabel: 'Ein neues Bild hochladen.'
  iconTrash: 'löschen'
  iconTrashLabel: 'Dieses hochgeladene Bild löschen.'
  noPictures: 'Du hast keine hochgeladenen Bilder 😕'
  upload: 'Hochladen'
  uploadAlt: 'Ein hochgeladenes Bild.'
  uploadDeleteFailed: 'Das Löschen des Elements ist fehlgeschlagen!'
  uploadDeleteUnexpectedStatusCode: 'Beim Löschen des Elements trat ein unerwarteter Statuscode auf.'
  uploadError: 'Fehler: Dateien wurden nicht erfolgreich hochgeladen!'
  uploadNew: 'Lade ein neues Bild hoch'
  uploadSize: 'Größe: {size}'
en:
  cancel: 'Cancel'
  croppaPlaceholder: 'Choose an image'
  iconAdd: 'add'
  iconAddLabel: 'Upload a new image.'
  iconTrash: 'trash'
  iconTrashLabel: 'Delete this uploaded image.'
  noPictures: "You don't have any uploaded pictures 😕"
  upload: 'Upload'
  uploadAlt: 'An uploaded image.'
  uploadDeleteFailed: 'Deleting upload failed!'
  uploadDeleteUnexpectedStatusCode: 'Deleting upload returned an unexpected status code.'
  uploadError: 'Error: Some files did not upload successfully!'
  uploadNew: 'Upload a new image'
  uploadSize: 'Size: {size}'
</i18n>
