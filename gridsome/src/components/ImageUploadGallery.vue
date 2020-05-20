<template>
  <div>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql :graphql-error-message="graphqlErrorMessage" />
    </div>
    <div
      v-else
      class="m-auto w-full"
    >
      <div class="bg-white rounded">
        <ul class="inline-flex flex-wrap justify-center p-1">
          <li
            v-for="upload in allUploads.nodes"
            :id="storageKeyPrefix + upload.storageKey"
            :key="upload.storageKey"
            class="m-1"
          >
            <div class="relative">
              <img
                class="bg-gray-400 h-32 w-32"
                :src="TUSD_FILES_URL + upload.storageKey + '+'"
              >
              <div>
                <div class="absolute bg-white opacity-75 right-0 top-0">
                  <div class="flex h-full justify-center items-center">
                    <font-awesome
                      :icon="['fas', 'trash']"
                      class="m-2"
                      size="lg"
                      title="trash"
                    />
                  </div>
                </div>
                <button
                  class="absolute right-0 top-0"
                  @click="deleteImageUpload(upload.storageKey)"
                >
                  <div class="flex h-full justify-center items-center">
                    <font-awesome
                      :icon="['fas', 'trash']"
                      class="m-2 text-red-600"
                      size="lg"
                      title="trash"
                    />
                  </div>
                </button>
              </div>
            </div>
          </li>
          <button
            class="bg-gray-600 flex-none h-32 m-1 w-32"
            @click="changeProfilePicture"
          >
            <font-awesome
              :icon="['fas', 'plus']"
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
            >
          </button>
        </ul>
        <div
          v-if="allUploads.pageInfo.hasNextPage"
          class="flex justify-center"
        >
          <Button
            :icon="false"
            :text="'More'"
            @click.native="showMore"
          />
        </div>
      </div>
    </div>
    <modal
      v-if="showModal"
      @close="showModal = false"
    >
      <h2 slot="header">
        Upload a new picture
      </h2>
      <Croppa
        slot="body"
        ref="croppy"
        :initial-image="fileSelectedUrl"
        :placeholder-font-size="17.5"
        :show-remove-button="false"
      />
      <div
        slot="footer"
        class="text-white"
      >
        <Button
          :disabled="uploading"
          :icon-id="['fas', 'window-close']"
          :text="'Cancel'"
          @click.native="showModal = false"
        />
        <Button
          :disabled="uploading"
          :button-class="'btn-green'"
          :icon-id="['fas', 'upload']"
          :text="'Upload'"
          @click.native="generateBlob()"
        />
      </div>
    </modal>
  </div>
</template>

<script>
import { ALL_UPLOADS, UPLOAD_CREATE_MUTATION } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'
import Modal from '~/components/Modal.vue'

import Croppa from 'vue-croppa'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'

export default {
  apollo: {
    allUploads () {
      return {
        query: ALL_UPLOADS,
        variables: {
          cursor: null,
          limit: this.ITEMS_PER_PAGE,
          username: this.username
        },
        update: data => data.allUploads,
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Button,
    Croppa: Croppa.component,
    Modal
  },
  props: {
    username: {
      type: String,
      default: undefined
    }
  },
  data () {
    return {
      allUploads: undefined,
      croppy: {},
      fileSelectedUrl: undefined,
      graphqlErrorMessage: undefined,
      gridsomeStackDomain: process.env.GRIDSOME_STACK_DOMAIN,
      showModal: false,
      storageKeyPrefix: 'sk_',
      uploading: false,
      uppy: undefined
    }
  },
  methods: {
    changeProfilePicture () {
      document.querySelector('#input-profile-picture').click()
    },
    deleteImageUpload (storageKey) {
      const xhr = new XMLHttpRequest()
      const outerThis = this
      const element = document.getElementById(this.storageKeyPrefix + storageKey)

      element.classList.add('disabled')

      xhr.open('DELETE', 'https://tusd.' + process.env.GRIDSOME_STACK_DOMAIN + '/files/' + storageKey + '+', true)
      xhr.setRequestHeader('Tus-Resumable', '1.0.0')
      xhr.onreadystatechange = function () {
        if (this.readyState === 4) {
          element.classList.remove('disabled')

          if (this.status === 204) {
            outerThis.$removeItemFromArray(outerThis.allUploads.nodes, 'storageKey', storageKey)
          }
        }
      }
      xhr.send()
    },
    fileLoaded (e) {
      this.fileSelectedUrl = e.target.result
      this.showModal = true
    },
    loadProfilePicture (event) {
      const files = Array.from(event.target.files)

      if (files.length !== 1) {
        return
      }

      const file = files[0]

      try {
        var fileReader = new FileReader()
        fileReader.onload = e => this.fileLoaded(e)
        fileReader.readAsDataURL(file)
      } catch (err) {
        if (err.isRestriction) {
          console.log('Restriction error:', err)
        } else {
          console.error(err)
        }
      }
    },
    generateBlob () {
      this.uploading = true

      this.$refs.croppy.generateBlob(
        blob => {
          this.$apollo.mutate({
            mutation: UPLOAD_CREATE_MUTATION,
            variables: {
              uploadCreateInput: {
                sizeByte: blob.size
              }
            }
          }).then((data) => {
            if (data.data.uploadCreate.uuid !== null) {
              const outerThis = this

              this.uppy = Uppy({
                id: 'profile-picture',
                debug: process.env.NODE_ENV !== 'production',
                restrictions: {
                  maxFileSize: 1048576,
                  maxNumberOfFiles: 1,
                  minNumberOfFiles: 1,
                  allowedFileTypes: ['image/*']
                },
                meta: {
                  maevsiUploadId: data.data.uploadCreate.uuid
                },
                onBeforeUpload: (files) => {
                  const updatedFiles = {}

                  Object.keys(files).forEach(fileID => {
                    updatedFiles[fileID] = {
                      ...files[fileID],
                      name: '/profile-pictures/' + files[fileID].name
                    }
                  })

                  return updatedFiles
                }
              })

              this.uppy.use(Tus, {
                endpoint: this.TUSD_FILES_URL,
                limit: 1,
                removeFingerprintOnSuccess: true
              })

              this.uppy.addFile({
                source: 'croppy',
                name: document.querySelector('#input-profile-picture').files[0].name,
                type: blob.type,
                data: blob
              })

              this.uppy.upload().then((result) => {
                this.uploading = false

                if (result.failed.length > 0) {
                  alert('Some files did not upload successfully!')
                } else {
                  outerThis.showModal = false
                }
              })
            }
          }).catch((error) => {
            this.graphqlErrorMessage = error.message
            console.error(error)
          })
        }
      )
    },
    showMore () {
      this.$apollo.queries.allUploads.fetchMore({
        variables: {
          cursor: this.allUploads.pageInfo.endCursor
        },
        updateQuery: (previousResult, { fetchMoreResult }) => {
          const newNodes = fetchMoreResult.allUploads.nodes
          const pageInfo = fetchMoreResult.allUploads.pageInfo

          return {
            allUploads: {
              __typename: previousResult.allUploads.__typename,
              nodes: [...previousResult.allUploads.nodes, ...newNodes],
              pageInfo
            }
          }
        }
      })
    }
  }
}
</script>
