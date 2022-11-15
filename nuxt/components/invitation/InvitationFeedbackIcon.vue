<template>
  <IconCheckCircle
    v-if="feedback === 'ACCEPTED'"
    class="text-green-600"
    :title="t('feedbackAccepted')"
  />
  <IconXCircle
    v-else-if="feedback === 'CANCELED'"
    class="text-red-600"
    :title="t('feedbackCanceled')"
  />
  <IconQuestionCircle
    v-else-if="feedback === null"
    class="text-gray-600"
    :title="t('feedbackNone')"
  />
  <IconBug v-else :title="t('bug')" />
</template>

<script setup lang="ts">
export interface Props {
  feedback: string
}
withDefaults(defineProps<Props>(), {})

const { t } = useI18n()
</script>

<i18n lang="yaml">
de:
  bug: Bug
  feedbackAccepted: Zugesagt
  feedbackCanceled: Abgelehnt
  feedbackNone: Noch keine Rückmeldung
en:
  bug: Bug
  feedbackAccepted: Accepted
  feedbackCanceled: Declined
  feedbackNone: No feedback yet
</i18n>
