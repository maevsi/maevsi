<template>
  <div
    ref="scrollContainer"
    class="max-h-[70vh] overflow-y-auto border maevsi-border-darken rounded-lg"
    @scroll.passive="onScroll"
  >
    <slot />
  </div>
</template>

<script lang="ts">
import { ResizeSensor } from 'css-element-queries'
import debounce from 'lodash-es/debounce'

export default defineComponent({
  props: {
    hasNextPage: {
      required: true,
      type: Boolean,
    },
  },
  setup(props, { emit }) {
    const refs = {
      scrollContainer: ref<HTMLElement>(),
    }
    const data = reactive({
      resizeSensor: undefined as ResizeSensor | undefined,
    })
    const methods = {
      emit() {
        emit('loadMore')
      },
      onScroll(e: Event) {
        const scrollBar = e.target as Element

        if (
          scrollBar &&
          scrollBar.scrollTop + scrollBar.clientHeight >=
            scrollBar.scrollHeight - 500
        ) {
          debounce(methods.emit, 100)()
        }
      },
    }

    onMounted(() => {
      const scrollContainer = refs.scrollContainer.value

      if (!scrollContainer) return

      data.resizeSensor = new ResizeSensor(scrollContainer, () => {
        if (
          scrollContainer.scrollHeight === scrollContainer.clientHeight &&
          props.hasNextPage
        ) {
          methods.emit()
        }
      })
    })

    onBeforeUnmount(() => {
      if (data.resizeSensor) {
        data.resizeSensor.detach()
      }
    })

    return {
      ...refs,
      ...data,
      ...methods,
    }
  },
})
</script>
