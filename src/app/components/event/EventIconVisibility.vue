<template>
  <IHeroiconsArchiveBox v-if="isArchived" :title="t('archived')" />
  <IHeroiconsEye v-else-if="visibility === 'PUBLIC'" :title="t('public')" />
  <IHeroiconsEyeSlash
    v-else-if="visibility === 'PRIVATE'"
    :title="t('private')"
  />
  <IHeroiconsBugAnt v-else :title="t('bug')" />
</template>

<script setup lang="ts">
export interface Props {
  isArchived?: boolean
  visibility: string
}
withDefaults(defineProps<Props>(), {
  isArchived: false,
})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  archived: archiviert
  bug: Bug
  private: privat
  public: öffentlich
en:
  archived: archived
  bug: bug
  private: private
  public: public
</i18n>
