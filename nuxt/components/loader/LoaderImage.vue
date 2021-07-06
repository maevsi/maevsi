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

<script>
export default {
  props: {
    alt: {
      required: true,
      type: String,
    },
    rounded: {
      default: undefined,
      type: Boolean,
    },
    src: {
      required: true,
      type: String,
    },
  },
  data() {
    return {
      srcWhenLoaded: undefined,
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
        : await new Promise((resolve) => {
            const img = new Image()

            img.onload = () => {
              resolve(img.src)
            }

            img.src = this.src
          })
    },
  },
}
</script>
