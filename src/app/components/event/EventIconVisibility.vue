<template>
  <IHeroiconsArchiveBox v-if="isArchived" :title="t('archived')" />
  <IHeroiconsEye
    v-else-if="visibility === EventVisibility.Public"
    :title="t('public')"
  />
  <IHeroiconsEyeSlash
    v-else-if="visibility === EventVisibility.Unlisted"
    :title="t('unlisted')"
  />
  <IHeroiconsLockClosed
    v-else-if="visibility === EventVisibility.Private"
    :title="t('private')"
  />
  <IHeroiconsBugAnt v-else :title="t('bug')" />
</template>

<script setup lang="ts">
import { EventVisibility } from '~~/gql/generated/graphql'

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
  unlisted: ungelistet
en:
  archived: archived
  bug: bug
  private: private
  public: public
  unlisted: unlisted
</i18n>
