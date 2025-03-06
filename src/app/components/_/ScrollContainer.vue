<template>
  <div
    ref="scrollContainerRef"
    class="border-background-brighten dark:border-background-darken overflow-y-auto rounded-lg border"
    @scroll.passive="onScroll"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { ResizeSensor } from 'css-element-queries'
import { debounce } from 'lodash-es'

export interface Props {
  hasNextPage: boolean
}
const props = withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  loadMore: []
}>()

// refs
const scrollContainerRef = ref<HTMLElement>()

// data
const resizeSensor = ref<ResizeSensor>()

// methods
const emitLoadMore = debounce(() => {
  emit('loadMore')
}, 300)
const onScroll = (e: Event) => {
  const scrollBar = e.target as Element

  if (
    scrollBar &&
    scrollBar.scrollTop + scrollBar.clientHeight >=
      scrollBar.scrollHeight - 500 &&
    props.hasNextPage
  ) {
    emitLoadMore()
  }
}

// lifecycle
onMounted(() => {
  const scrollContainerLocal = scrollContainerRef.value

  if (!scrollContainerLocal) return

  resizeSensor.value = new ResizeSensor(scrollContainerLocal, () => {
    if (
      scrollContainerLocal.scrollHeight === scrollContainerLocal.clientHeight &&
      props.hasNextPage
    ) {
      emitLoadMore()
    }
  })
})
onBeforeUnmount(() => {
  if (resizeSensor.value) {
    resizeSensor.value.detach()
  }
})
</script>
