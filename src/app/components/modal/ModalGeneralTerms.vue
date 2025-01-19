<template>
  <UModal
    :model-value="modelValue"
    @update:model-value="emit('update:modelValue', $event)"
  >
    <div class="flex h-full flex-col">
      <header class="flex items-center border-b border-gray-200 p-4">
        <h3 class="ml-2 text-lg font-semibold">{{ t('title') }}</h3>
      </header>
      <div class="grow overflow-auto px-8">
        <div class="vio-prose-scheme">
          <p>{{ legalTerms }}</p>
        </div>
      </div>
      <footer
        class="sticky bottom-0 space-y-4 border-t border-gray-200 bg-white p-4"
      >
        <div class="flex space-x-2 rounded-xl border p-4">
          <input
            id="accept-gtc"
            v-model="accepted"
            type="checkbox"
            class="cursor-pointer"
          />
          <label for="accept-gtc" class="cursor-pointer">
            {{ t('acceptTerms') }}
          </label>
        </div>

        <ButtonConfirm
          :aria-label="t('confirmButtonText')"
          :disabled="!accepted"
          :handle-submit="handleAccept"
        >
          {{ t('confirmButtonText') }}
        </ButtonConfirm>
      </footer>
    </div>
  </UModal>
</template>

<script setup lang="ts">
import { useAllLegalTermsQuery } from '~~/gql/documents/queries/legalTerms/allLegalTerms'

const { t } = useI18n()
const { data: legalTermsQuery } = useAllLegalTermsQuery({})

const legalTerms = computed(() => {
  return (
    legalTermsQuery.value?.allLegalTerms?.edges
      .map((edge) => edge.node.term)
      .filter(isNeitherNullNorUndefined)
      .join(' ') || ''
  )
})

defineProps<{
  modelValue: boolean
}>()

const emit = defineEmits(['update:modelValue', 'accepted'])

const accepted = ref(false)

const handleAccept = () => {
  const termId = legalTermsQuery.value?.allLegalTerms?.edges[0]?.node.id

  if (accepted.value && termId) {
    emit('accepted', termId)
    emit('update:modelValue', false)
  }
}
</script>

<i18n lang="yaml">
de:
  title: Impressum
  confirmButtonText: Weiter
  acceptTerms: 'Ich akzeptiere die AGB'
en:
  title: Legal notice
  confirmButtonText: Next
  acceptTerms: 'I accept the GTC'
</i18n>
