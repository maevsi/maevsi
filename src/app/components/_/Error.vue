<template>
  <div class="flex flex-col items-center gap-4">
    <CardStateAlert class="flex flex-col items-center text-3xl">
      <span class="flex items-center gap-1 text-xl font-black">
        {{ t('maevNo') }}
      </span>
      <span>
        {{ statusCode ? `${statusCode} - ` : '' }}{{ statusReason }}
      </span>
    </CardStateAlert>
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
const { ssrContext } = useNuxtApp()

// computations
const statusReason = computed(() => {
  return status(props.statusCode, locale.value) || (t('error') as string)
})

// methods
const init = () => {
  if (ssrContext && props.statusCode) {
    ssrContext.event.node.res.statusCode = props.statusCode
  }
}

// initialization
init()
</script>

<script lang="ts">
export default {
  name: 'AppError',
}
</script>

<i18n lang="yaml">
de:
  error: Fehler
  error403Description: Du bist aktuell nicht berechtigt, auf diese Seite zuzugreifen.
  error403Hint: Hast du dich schon angemeldet oder von diesem Gerät aus einen Einladungscode eingegeben?
  maevNo: maev.no? 🥺
en:
  error: Error
  error403Description: "You don't have permission to access this site."
  error403Hint: Try signing in or enter an invitation code on this device.
  maevNo: maev.no? 🥺
</i18n>
