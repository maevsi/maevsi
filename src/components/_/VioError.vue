<template>
  <h1>{{ `${statusCode} - ${statusReason}` }}</h1>
  <div>
    {{ description }}
  </div>
  <pre
    v-if="stack && !runtimeConfig.public.vio.isInProduction"
    v-html="stack"
  />
</template>

<script setup lang="ts">
import { status } from '@http-util/status-i18n'

export interface Props {
  statusCode: number
  statusMessage?: string
  description: string
  stack?: string
}
const props = withDefaults(defineProps<Props>(), {
  statusMessage: undefined,
  stack: undefined,
})

const runtimeConfig = useRuntimeConfig()
const { locale, t } = useI18n()

// computations
const statusReason = computed(() => {
  return status(props.statusCode, locale.value) || t('error')
})
</script>

<i18n lang="yaml">
de:
  error: Fehler
en:
  error: Error
</i18n>
