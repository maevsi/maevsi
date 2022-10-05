<template>
  <ButtonColored
    :aria-label="t('home')"
    :to="localePath('/')"
    @click="$emit('click')"
  >
    {{ t('home') }}
    <template #prefix>
      <IconHome />
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
  home: Nach Hause
en:
  home: Head home
</i18n>
