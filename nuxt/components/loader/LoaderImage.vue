<template>
  <img
    v-if="srcWhenLoaded"
    :alt="alt"
    :class="{ 'rounded-full': rounded }"
    :src="srcWhenLoaded"
  />
  <LoaderIndicatorPing v-else />
</template>

<script>
export default {
  props: {
    alt: {
      default: undefined,
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
}
</script>
