<template>
  <div class="flex flex-col gap-4">
    <i18n-t
      keypath="maevNo"
      class="flex items-center justify-center gap-1 text-xl font-black"
      tag="span"
    >
      <template #emojiFacePleading>
        <EmojiFacePleading />
      </template>
    </i18n-t>
    <h1>{{ statusCode ? `${statusCode} - ` : '' }}{{ statusReason }}</h1>
    <p v-if="statusCode === 403" class="text-center">
      {{ t('error403Description') }}
      <br />
      {{ t('error403Hint') }}
    </p>
    <ButtonList class="justify-center">
      <ButtonSignIn v-if="statusCode === 403" />
      <ButtonHome />
    </ButtonList>
  </div>
</template>

<script setup lang="ts">
import { status } from '@http-util/status-i18n'

export interface Props {
  statusCode?: number
}
const props = withDefaults(defineProps<Props>(), {
  statusCode: undefined,
})

const { locale, t } = useI18n()

// computations
const statusReason = computed(() => {
  return status(props.statusCode, locale.value) || (t('error') as string)
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiError',
}
</script>

<i18n lang="yaml">
de:
  error: Fehler
  error403Description: Du bist aktuell nicht berechtigt, auf diese Seite zuzugreifen.
  error403Hint: Hast du dich schon angemeldet oder von diesem Gerät aus einen Einladungscode eingegeben?
  maevNo: maev.no? {emojiFacePleading}
en:
  error: Error
  error403Description: "You don't have permission to access this site."
  error403Hint: Try signing in or enter an invitation code on this device.
  maevNo: maev.no? {emojiFacePleading}
</i18n>
