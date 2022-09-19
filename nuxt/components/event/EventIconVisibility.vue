<template>
  <IconArchive v-if="isArchived" :title="t('archived')" />
  <IconGlobe v-else-if="visibility === 'PUBLIC'" :title="t('public')" />
  <IconEyeOff v-else-if="visibility === 'PRIVATE'" :title="t('private')" />
  <IconBug v-else :title="t('bug')" />
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: {
    isArchived: {
      default: false,
      type: Boolean,
    },
    visibility: {
      required: true,
      type: String,
    },
  },
  setup() {
    const { t } = useI18n()

    const methods = {
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
