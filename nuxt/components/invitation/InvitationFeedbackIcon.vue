<template>
  <FontAwesomeIcon
    v-if="feedback === 'ACCEPTED'"
    class="text-green-600"
    :icon="['fas', 'check-circle']"
    size="lg"
    :title="$t('feedbackAccepted')"
  />
  <FontAwesomeIcon
    v-else-if="feedback === 'CANCELED'"
    class="text-red-600"
    :icon="['fas', 'times-circle']"
    size="lg"
    :title="$t('feedbackCanceled')"
  />
  <FontAwesomeIcon
    v-else-if="feedback === null"
    class="text-gray-600"
    :icon="['fas', 'question-circle']"
    size="lg"
    :title="$t('feedbackNone')"
  />
  <FontAwesomeIcon v-else :icon="['fas', 'bug']" :title="$t('bug')" />
</template>

<script>
export default {
  props: {
    feedback: {
      required: true,
      type: String,
    },
  },
}
</script>

<i18n lang="yml">
de:
  bug: Bug
  feedbackAccepted: Zugesagt
  feedbackCanceled: Abgelehnt
  feedbackNone: Noch keine Rückmeldung
en:
  bug: Bug
  feedbackAccepted: Accepted
  feedbackCanceled: Canceled
  feedbackNone: No feedback yet
</i18n>
