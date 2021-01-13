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
      type: String,
      default: undefined,
    },
    rounded: {
      type: Boolean,
      default: undefined,
    },
    src: {
      type: String,
      required: true,
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
