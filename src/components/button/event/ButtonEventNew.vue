<template>
  <ButtonText
    v-if="variant === 'text'"
    :aria-label="t('new')"
    :to="localePath('/event/create')"
    @click="emit('click')"
  >
    {{ t('new') }}
    <template #prefix>
      <IHeroiconsPlus />
    </template>
  </ButtonText>
  <ButtonColored
    v-else
    :aria-label="t('new')"
    :is-primary="variant === 'primary'"
    :to="localePath('/event/create')"
    @click="emit('click')"
  >
    {{ t('new') }}
    <template #prefix>
      <IHeroiconsPlus />
    </template>
  </ButtonColored>
</template>

<script setup lang="ts">
const localePath = useLocalePath()
const { t } = useI18n()

export interface Props {
  variant?: 'text' | 'primary' | 'secondary'
}
withDefaults(defineProps<Props>(), {
  variant: 'primary',
})

const emit = defineEmits<{
  click: []
}>()
</script>

<i18n lang="yaml">
de:
  new: Veranstaltung erstellen
en:
  new: Create event
</i18n>
