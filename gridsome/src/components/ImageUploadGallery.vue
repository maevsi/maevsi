<template>
  <div>
    <div v-if="$apollo.loading">
      Loading...
    </div>
    <div v-else-if="graphqlErrorMessage !== undefined">
      <AlertGraphql :graphql-error-message="graphqlErrorMessage" />
    </div>
    <div
      v-else-if="allUploads !== undefined && allUploads.nodes.length > 0"
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
                class="bg-gray-400"
                :src="'https://tusd.' + gridsomeStackDomain + '/files/' + upload.storageKey + '+'"
                :height="'200px'"
                :width="'200px'"
              >
              <div>
                <div
                  class="absolute bg-white opacity-75 right-0 top-0"
                >
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
    <div v-else>
      There are currently no uploads :/
    </div>
  </div>
</template>

<script>
import { ALL_UPLOADS } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'

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
    Button
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
      graphqlErrorMessage: undefined,
      gridsomeStackDomain: process.env.GRIDSOME_STACK_DOMAIN,
      storageKeyPrefix: 'sk_'
    }
  },
  methods: {
    deleteImageUpload (storageKey) {
      const xhr = new XMLHttpRequest()
      const outerThis = this

      xhr.open('DELETE', 'https://tusd.' + process.env.GRIDSOME_STACK_DOMAIN + '/files/' + storageKey + '+', true)
      xhr.setRequestHeader('Tus-Resumable', '1.0.0')
      xhr.onreadystatechange = function () {
        if (this.readyState === 4 && this.status === 204) {
          outerThis.$removeItemFromArray(outerThis.allUploads.nodes, 'storageKey', storageKey)
        }
      }
      xhr.send()
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
