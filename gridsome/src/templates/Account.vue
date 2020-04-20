<template>
  <Layout>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql
        :graphql-error-message="graphqlErrorMessage"
        :validation-object="undefined"
      />
    </div>
    <div v-else>
      <div v-if="allEvents === null">
        <Error404 />
      </div>
      <div v-else>
        <div class="flex flex-col sm:flex-row items-center justify-center min-w-0 py-4">
          <button
            class="flex-none mr-0 sm:mr-4"
            @click="changeProfilePicture"
          >
            <img
              alt="blank profile picture"
              :src="profilePictureUrl"
              width="100"
            >
            <input
              id="input-profile-picture"
              accept="image/*"
              hidden
              name="input-profile-picture"
              type="file"
              @change="loadProfilePicture"
            >
          </button>
          <modal
            v-if="showModal"
            @close="showModal = false"
          >
            <h2 slot="header">
              Upload a new profile picture
            </h2>
            <croppa
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
                :icon-id="['fas', 'window-close']"
                :text="'Cancel'"
                @click.native="showModal = false"
              />
              <Button
                :button-class="'btn-green'"
                :icon-id="['fas', 'upload']"
                :text="'Upload'"
                @click.native="generateBlob()"
              />
            </div>
          </modal>
          <h1 class="mb-0 truncate w-full sm:w-auto">
            {{ $route.params.username }}
          </h1>
        </div>
        <h2 class="text-left truncate">
          Their Events
        </h2>
        <EventList
          :apollo="$apollo"
          :all-events="allEvents"
        />
      </div>
    </div>
  </Layout>
</template>

<script>
import { ALL_EVENTS_QUERY } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/Button.vue'
import Error404 from '~/components/Error404.vue'
import EventList from '~/components/EventList.vue'
import Modal from '~/components/Modal.vue'

import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import Croppa from 'vue-croppa'

require('@uppy/core/dist/style.css')

export default {
  apollo: {
    allEvents () {
      return {
        query: ALL_EVENTS_QUERY,
        variables: {
          cursor: null,
          limit: this.ITEMS_PER_PAGE,
          username: this.$route.params.username
        },
        error (error, vm, key, type, options) {
          this.graphqlErrorMessage = error.message
        }
      }
    }
  },
  components: {
    AlertGraphql,
    Button,
    croppa: Croppa.component,
    Error404,
    EventList,
    Modal
  },
  data () {
    return {
      fileSelectedUrl: undefined,
      graphqlErrorMessage: undefined,
      croppy: {},
      profilePictureUrl: '/assets/static/src/assets/blank-profile-picture.svg',
      showModal: false,
      uppy: undefined
    }
  },
  metaInfo () {
    return { title: this.$route.params.username }
  },
  mounted () {
    this.uppy = Uppy({
      id: 'profile-picture',
      allowMultipleUploads: false,
      debug: process.env.NODE_ENV !== 'production',
      restrictions: {
        maxFileSize: 1048576,
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes: ['image/*']
      },
      meta: {
        jwt: localStorage.getItem('jwt')
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
      endpoint: 'https://tusd.' + process.env.GRIDSOME_STACK_DOMAIN + '/files/'
    })
  },
  methods: {
    changeProfilePicture () {
      document.querySelector('#input-profile-picture').click()
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
      this.$refs.croppy.generateBlob(
        blob => this.uploadCroppedImage(blob)
      )
    },
    uploadCroppedImage (blob) {
      this.uppy.addFile({
        source: 'croppy',
        name: document.querySelector('#input-profile-picture').files[0].name,
        type: blob.type,
        data: blob
      })
      this.uppy.upload().then((result) => {
        console.log(result.successful[0].uploadURL)
        this.profilePictureUrl = result.successful[0].uploadURL

        if (result.failed.length > 0) {
          console.error('Errors:')
          result.failed.forEach((file) => {
            console.error(file.error)
          })
        }
      })
    }
  }
}
</script>
