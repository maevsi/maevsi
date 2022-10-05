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
import { PropType } from 'vue'

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
  setup(props) {
    const data = reactive({
      srcWhenLoaded: undefined as string | undefined,
    })
    const methods = {
      async updateSource() {
        data.srcWhenLoaded = process.server
          ? props.src
          : await new Promise<string>((resolve) => {
              const img = new Image()

              img.onload = () => {
                resolve(img.src)
              }

              img.src = props.src
            })
      },
    }

    watch(
      () => props.src,
      async (_currentValue, _oldValue) => {
        await methods.updateSource()
      }
    )

    methods.updateSource()

    return {
      ...data,
      ...methods,
    }
  },
})
</script>
