<template>
  <img
    v-if="srcWhenLoaded"
    :alt="alt"
    :class="{ 'rounded-full': rounded }"
    :src="srcWhenLoaded"
  />
  <div v-else>
    <!-- Wrapping div is required as target for class names defined on the linking element. -->
    <LoaderIndicatorPing />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'

export default defineComponent({
  props: {
    alt: {
      required: true,
      type: String,
    },
    rounded: {
      default: undefined,
      type: Boolean as PropType<boolean | undefined>,
    },
    src: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      srcWhenLoaded: undefined as string | undefined,
    }
  },
  async fetch() {
    await this.updateSource()
  },
  watch: {
    async src() {
      await this.updateSource()
    },
  },
  methods: {
    async updateSource() {
      this.srcWhenLoaded = process.server
        ? this.src
        : await new Promise<string>((resolve) => {
            const img = new Image()

            img.onload = () => {
              resolve(img.src)
            }

            img.src = this.src
          })
    },
  },
})
</script>
