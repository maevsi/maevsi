<template>
  <ButtonColored
    :aria-label="t('eventUnlock')"
    :to="localePath('/task/event/unlock')"
    @click="$emit('click')"
  >
    {{ t('eventUnlock') }}
    <template #prefix>
      <IconKey />
    </template>
  </ButtonColored>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  setup() {
    const localePath = useLocalePath()
    const { t } = useI18n()

    const methods = {
      localePath,
      t,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  eventUnlock: Einladungscode eingeben
en:
  eventUnlock: Enter invitation code
</i18n>
