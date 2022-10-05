<template>
  <ButtonColored
    :aria-label="t('eventAll')"
    :is-primary="false"
    :to="localePath('/event')"
    @click="$emit('click')"
  >
    {{ t('eventAll') }}
    <template #prefix>
      <IconListUl />
    </template>
  </ButtonColored>
</template>

<script lang="ts">
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
  eventAll: Zeige alle Veranstaltungen
en:
  eventAll: Show all events
</i18n>
