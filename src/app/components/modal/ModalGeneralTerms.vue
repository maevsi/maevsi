<template>
  <Dialog :open="modelValue" @update:open="emit('update:modelValue', $event)">
    <DialogContent
      class="max-h-[90vh] max-w-4xl border bg-white p-0 shadow-lg dark:bg-gray-800"
    >
      <DialogHeader
        class="border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-700 dark:bg-gray-800"
      >
        <DialogTitle
          class="text-lg font-semibold text-gray-900 dark:text-white"
        >
          {{ t('title') }}
        </DialogTitle>
      </DialogHeader>
      <div class="max-h-[60vh] overflow-auto bg-white p-6 dark:bg-gray-800">
        <div class="vio-prose-scheme dark:text-gray-200">
          <p>{{ legalTerms }}</p>
        </div>
      </div>
      <div
        class="border-t border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800"
      >
        <div
          class="mb-4 flex items-center space-x-2 rounded-md border border-gray-200 bg-gray-50 p-4 dark:border-gray-700 dark:bg-gray-700"
        >
          <input
            id="accept-gtc"
            v-model="accepted"
            type="checkbox"
            class="h-4 w-4 cursor-pointer accent-blue-600"
          />
          <label
            for="accept-gtc"
            class="cursor-pointer text-gray-900 dark:text-gray-200"
          >
            {{ t('acceptTerms') }}
          </label>
        </div>
        <ShadButton
          :disabled="!accepted"
          class="w-full rounded bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700 dark:bg-blue-700 dark:hover:bg-blue-800"
          @click="handleAccept"
        >
          {{ t('confirmButtonText') }}
        </ShadButton>
      </div>
    </DialogContent>
  </Dialog>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/scn/dialog'
import { ShadButton } from '@/components/scn/button'
import { useAllLegalTermsQuery } from '~~/gql/documents/queries/legalTerms/allLegalTerms'

const { t } = useI18n()
const { data: legalTermsQuery } = useAllLegalTermsQuery({})

const legalTerms = computed(() => {
  return (
    legalTermsQuery.value?.allLegalTerms?.nodes
      ?.map((node) => node.term)
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
  const termId = legalTermsQuery.value?.allLegalTerms?.nodes[0]?.id
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
