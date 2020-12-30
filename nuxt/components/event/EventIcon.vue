<template>
  <div class="flex flex-col items-center">
    <template v-if="event !== undefined">
      <template v-if="event.archived">
        <FontAwesomeIcon :icon="['fas', 'archive']" :title="$t('archived')" />
        <span v-if="withText" class="block">{{ $t('archived') }}</span>
      </template>
      <template v-else-if="event.visibility === 'PUBLIC'">
        <FontAwesomeIcon
          :icon="['fas', 'globe-africa']"
          :title="$t('public')"
        />
        <span v-if="withText" class="block">{{ $t('public') }}</span>
      </template>
      <template v-else-if="event.visibility === 'PRIVATE'">
        <FontAwesomeIcon :icon="['fas', 'key']" :title="$t('private')" />
        <span v-if="withText" class="block">{{ $t('private') }}</span>
      </template>
      <template v-else>
        <FontAwesomeIcon :icon="['fas', 'bug']" :title="$t('bug')" />
        <span v-if="withText" class="block">{{ $t('bug') }}</span>
      </template>
    </template>
    <template v-else>
      <FontAwesomeIcon :icon="['fas', 'bug']" :title="$t('bug')" />
      <span v-if="withText" class="block">{{ $t('bug') }}</span>
    </template>
  </div>
</template>

<script>
export default {
  props: {
    event: {
      type: Object,
      default: undefined,
    },
    withText: {
      type: Boolean,
      default: false,
    },
  },
}
</script>

<i18n lang="yml">
de:
  archived: 'archiviert'
  bug: 'Bug'
  private: 'privat'
  public: 'öffentlich'
en:
  archived: 'archived'
  bug: 'bug'
  private: 'private'
  public: 'public'
</i18n>
