<template>
  <div>
    <LoaderIndicatorPing v-if="isLoading" :class="aspect" />
    <CardStateAlert v-if="isError">
      {{ t('error') }}
    </CardStateAlert>
    <img
      v-if="srcWhenLoaded"
      :alt="alt"
      :class="[aspect, { 'rounded-full': rounded }]"
      :height="height"
      :src="srcWhenLoaded"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
export interface Props {
  alt: string
  aspect: string
  height: string
  rounded?: boolean
  src: string
  width: string
}
const props = withDefaults(defineProps<Props>(), {
  rounded: undefined,
})

const { t } = useI18n()

// data
const img = ref<HTMLImageElement>()
const isError = ref(false)
const isLoading = ref(true)
const loadingId = Math.random()
const loadingIds = useState('loadingIds', () => [loadingId])
const srcWhenLoaded = ref<string>()

// methods
function loadingStop() {
  isLoading.value = false
  loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)
}
function updateSource() {
  if (process.server) return

  img.value = new Image()
  img.value.onload = () => {
    loadingStop()
    srcWhenLoaded.value = img.value?.src
  }
  img.value.onerror = () => {
    loadingStop()
    isError.value = true
  }
  img.value.src = props.src
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

<i18n lang="yaml">
de:
  error: Bild konnte nicht geladen werden!
en:
  error: Image could not be loaded!
</i18n>
