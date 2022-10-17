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
async function updateSource() {
  srcWhenLoaded.value = process.server
    ? props.src
    : await new Promise<string>((resolve) => {
        const img = new Image()

        img.onload = () => {
          resolve(img.src)
        }

        img.src = props.src
      })
}

// lifecycle
watch(
  () => props.src,
  async (_currentValue, _oldValue) => {
    await updateSource()
  }
)

// initialization
await updateSource()
</script>
