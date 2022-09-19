<template>
  <ButtonText
    :aria-label="t('new')"
    :is-primary="false"
    :to="localePath('/task/event/create')"
    @click="$emit('click')"
  >
    {{ t('new') }}
    <template slot="prefix">
      <IconPlus />
    </template>
  </ButtonText>
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
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
