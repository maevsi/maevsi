<template>
  <div :class="[aspect, classes]">
    <LoaderIndicatorPing v-if="isLoading" />
    <CardStateAlert v-if="isError">
      {{ t('error') }}
    </CardStateAlert>
    <img
      v-if="srcWhenLoaded"
      :alt="alt"
      :class="[aspect, classes]"
      :crossorigin="crossOrigin"
      :height="height"
      :src="srcWhenLoaded"
      :width="width"
    />
    <img
      :alt="alt"
      class="hidden"
      :crossorigin="crossOrigin"
      :height="height"
      :src="src"
      :width="width"
    />
  </div>
</template>

<script setup lang="ts">
import { debounce } from 'lodash-es'

export interface Props {
  alt: string
  aspect: string
  classes?: string
  crossOrigin?: 'anonymous'
  height: string
  src: string
  width: string
}
const props = withDefaults(defineProps<Props>(), {
  classes: undefined,
  crossOrigin: undefined,
})

const { t } = useI18n()

// data
const img = ref<HTMLImageElement>()
const isError = ref(false)
const isLoading = ref(false)
const loadingId = Math.random()
const loadingIds = useState(STATE_LOADING_IDS_NAME, () => [] as number[])
const srcWhenLoaded = ref<string | undefined>(props.src)

// methods
const loadOnClient = () => {
  loadingStartDebounced()

  img.value = new Image()
  img.value.onload = () => {
    loadingStop()
    srcWhenLoaded.value = img.value?.src
  }
  img.value.onerror = () => {
    loadingStop()
    isError.value = true
  }
  img.value.crossOrigin = props.crossOrigin || null
  img.value.src = props.src
}
const loadingStart = () => {
  srcWhenLoaded.value = undefined
  isLoading.value = true
  loadingIds.value.push(loadingId)
}
const loadingStartDebounced = debounce(loadingStart, 100)
const loadingStop = () => {
  loadingStartDebounced.cancel()
  isLoading.value = false
  loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)
}

// lifecycle
onMounted(loadOnClient)
watch(
  () => props.src,
  () => loadOnClient(),
)
</script>

<i18n lang="yaml">
de:
  error: Bild konnte nicht geladen werden!
en:
  error: Image could not be loaded!
</i18n>
