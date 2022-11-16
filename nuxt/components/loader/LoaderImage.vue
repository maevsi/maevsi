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

<script setup lang="ts">
export interface Props {
  alt: string
  rounded?: boolean
  src: string
}
const props = withDefaults(defineProps<Props>(), {
  rounded: undefined,
})

// data
const srcWhenLoaded = ref<string>()

// methods
function updateSource() {
  if (process.server) return

  const img = new Image()

  img.onload = () => {
    srcWhenLoaded.value = img.src
  }

  img.src = props.src
}

// lifecycle
watch(
  () => props.src,
  (_currentValue, _oldValue) => {
    updateSource()
  }
)

// initialization
updateSource()
</script>
