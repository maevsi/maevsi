<template>
  <div>
    <div v-if="$apollo.loading">Loading...</div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql :graphql-error-message="graphqlErrorMessage" />
    </div>
    <div
      v-else-if="
        (allUploads !== undefined && allUploads.nodes.length > 0) ||
        allowAddition
      "
      class="m-auto w-full"
    >
      <div class="bg-white rounded">
        <ul class="inline-flex flex-wrap justify-center p-1">
          <div v-if="allUploads !== undefined">
            <li
              v-for="upload in allUploads.nodes"
              :id="uploadIdPrefix + upload.id"
              :key="upload.id"
              :class="{
                'border-red-600':
                  selectionFunction !== undefined && upload === selectedItem,
              }"
              class="border-4 border-transparent box-border relative"
              @click="toggleSelect(upload)"
            >
              <img
                alt="picture"
                class="bg-gray-400 h-32 w-32"
                :src="$global.TUSD_FILES_URL + upload.storageKey + '+'"
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
                      title="trash"
                    />
                  </div>
                </div>
                <button
                  class="absolute right-0 top-0"
                  @click="deleteImageUpload(upload.id)"
                >
                  <div class="flex h-full justify-center items-center">
                    <FontAwesomeIcon
                      :icon="['fas', 'trash']"
                      class="m-2 text-white"
                      size="lg"
                      title="trash"
                    />
                  </div>
                </button>
              </div>
            </li>
          </div>
          <button
            v-if="allowAddition"
            class="bg-gray-600 flex-none h-32 m-1 w-32"
            @click="changeProfilePicture"
          >
            <FontAwesomeIcon
              :icon="['fas', 'plus']"
              class="text-white"
              title="add"
              size="3x"
            />
            <input
              id="input-profile-picture"
              accept="image/*"
              hidden
              name="input-profile-picture"
              type="file"
              @change="loadProfilePicture"
            />
          </button>
        </ul>
        <div
          v-if="allUploads !== undefined && allUploads.pageInfo.hasNextPage"
          class="flex justify-center"
        >
          <Button :icon="false" @click.native="showMore"> More </Button>
        </div>
      </div>
    </div>
    <p v-else>You don't have any uploaded pictures :/</p>
    <Modal v-if="showModalImageUpload" @close="showModalImageUpload = false">
      <h2 slot="header">Upload a new image</h2>
      <Croppa
        slot="body"
        ref="croppy"
        :initial-image="fileSelectedUrl"
        :placeholder-font-size="17.5"
        :show-remove-button="false"
      />
      <div slot="footer" class="text-white">
        <Button
          :disabled="uploading"
          :icon-id="['fas', 'window-close']"
          @click.native="showModalImageUpload = false"
        >
          Cancel
        </Button>
        <ButtonGreen
          :disabled="uploading"
          :icon-id="['fas', 'upload']"
          @click.native="generateBlob()"
        >
          Upload
        </ButtonGreen>
      </div>
    </Modal>
  </div>
</template>

<script>
import Croppa from 'vue-croppa'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'

import { ALL_UPLOADS, UPLOAD_CREATE_MUTATION } from '~/scripts/apollo'

export default {
  apollo: {
    allUploads() {
      return {
        query: ALL_UPLOADS,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          username: this.username,
        },
        update: (data) => data.allUploads,
        error(error, _vm, _key, _type, _options) {
          this.graphqlErrorMessage = error.message
        },
      }
    },
  },
  components: {
    Croppa: Croppa.component,
  },
  props: {
    allowAddition: {
      type: Boolean,
      default: true,
    },
    allowDeletion: {
      type: Boolean,
      default: true,
    },
    deletionFunction: {
      type: Function,
      default: undefined,
    },
    selectionFunction: {
      type: Function,
      default: undefined,
    },
    username: {
      type: String,
      default: undefined,
    },
  },
  data() {
    return {
      allUploads: undefined,
      croppy: {},
      fileSelectedUrl: undefined,
      graphqlErrorMessage: undefined,
      selectedItem: undefined,
      showModalImageUpload: false,
      uploadIdPrefix: 'upid_',
      uploading: false,
      uppy: undefined,
    }
  },
  methods: {
    changeProfilePicture() {
      document.querySelector('#input-profile-picture').click()
    },
    deleteImageUpload(uploadId) {
      const outerThis = this
      const element = document.getElementById(this.uploadIdPrefix + uploadId)

      element.classList.add('disabled')

      this.$global.jwtDecode((jwt, _jwtDecoded) => {
        const xhr = new XMLHttpRequest()

        xhr.open('DELETE', '/tusd?uploadId=' + uploadId, true)
        xhr.setRequestHeader('Hook-Name', 'maevsi/pre-terminate')
        xhr.setRequestHeader('Authorization', 'Bearer ' + jwt)
        xhr.onreadystatechange = function () {
          if (this.readyState === 4) {
            element.classList.remove('disabled')

            switch (this.status) {
              case 204:
                outerThis.$global.removeItemFromArray(
                  outerThis.allUploads.nodes,
                  'id',
                  uploadId
                )

                if (outerThis.deletionFunction !== undefined) {
                  outerThis.deletionFunction()
                }

                break
              case 500:
                alert('Deleting upload failed!')
                break
              default:
                alert('Deleting upload returned an unexpected status code.')
            }
          }
        }
        xhr.send()
      })
    },
    fileLoaded(e) {
      this.fileSelectedUrl = e.target.result
      this.showModalImageUpload = true
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
          console.log('Restriction error:', err)
        } else {
          console.error(err)
        }
      }
    },
    generateBlob() {
      this.uploading = true

      this.$refs.croppy.generateBlob((blob) => {
        this.$apollo
          .mutate({
            mutation: UPLOAD_CREATE_MUTATION,
            variables: {
              uploadCreateInput: {
                sizeByte: blob.size,
              },
            },
          })
          .then((data) => {
            const outerThis = this

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
                maevsiUploadId: data.data.uploadCreate.uuid,
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

            this.uppy.upload().then((result) => {
              this.uploading = false
              this.$apollo.queries.allUploads.refetch()

              if (result.failed.length > 0) {
                alert('Some files did not upload successfully!')
              } else {
                outerThis.showModalImageUpload = false
              }
            })
          })
          .catch((error) => {
            this.graphqlErrorMessage = error.message
            console.error(error)
          })
      })
    },
    toggleSelect(upload) {
      if (this.selectedItem === upload) {
        this.selectedItem = undefined

        if (this.selectionFunction !== undefined) {
          this.selectionFunction(undefined)
        }
      } else {
        this.selectedItem = upload

        if (this.selectionFunction !== undefined) {
          this.selectionFunction(this.selectedItem.storageKey)
        }
      }
    },
    showMore() {
      this.$apollo.queries.allUploads.fetchMore({
        variables: {
          cursor: this.allUploads.pageInfo.endCursor,
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
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
  },
}
</script>
