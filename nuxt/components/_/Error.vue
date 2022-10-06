<template>
  <div class="flex flex-col gap-4">
    <!-- eslint-disable vue/no-v-html -->
    <i18n-t
      keypath="maevNo"
      class="flex items-center justify-center gap-1 text-xl font-black"
    >
      <template #emojiFacePleading>
        <EmojiFacePleading />
      </template>
    </i18n-t>
    <!--eslint-enable-->
    <h1>{{ statusCode ? `${statusCode} - ` : '' }}{{ statusReason }}</h1>
    <p v-if="statusCode === 403" class="text-center">
      {{ t('403description') }}
      <br />
      {{ t('403hint') }}
    </p>
    <ButtonList>
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

// uses
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

<i18n lang="yml">
de:
  403description: Du bist aktuell nicht berechtigt, auf diese Seite zuzugreifen.
  403hint: Hast du dich schon angemeldet oder von diesem Gerät aus einen Einladungscode eingegeben?
  error: Fehler
  maevNo: maev.no? {emojiFacePleading}
en:
  403description: "You're currently missing permissions to view this site."
  403hint: Did you already sign in or enter an invitation code on this device?
  error: Error
  maevNo: maev.no? {emojiFacePleading}
</i18n>
