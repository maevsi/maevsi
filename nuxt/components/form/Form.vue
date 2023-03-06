<template>
  <form
    v-if="form"
    :class="[
      { 'animate-shake rounded-lg border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="(e) => emit('submit', e)"
  >
    <Card class="flex flex-col" is-high>
      <div class="flex flex-col min-h-0 overflow-y-auto gap-6">
        <slot />
        <div class="flex flex-col gap-4 items-center justify-between">
          <div class="flex justify-center">
            <Turnstile v-model="turnstileKey" />
          </div>
          <ButtonColored
            :aria-label="submitName || t('submit')"
            :class="{
              'animate-shake': form.$error,
            }"
            :disabled="isDisabledSubmitButton || false"
            type="submit"
            @click="setTurnstileKeyAndEmit()"
          >
            {{ submitName || t('submit') }}
            <template #prefix>
              <slot name="submit-icon" />
            </template>
          </ButtonColored>
          <FormInputStateError v-if="form.$error" class="mt-2">
            {{ t('globalValidationFailed') }}
          </FormInputStateError>
        </div>
        <CardStateAlert v-if="errorMessages?.length" class="my-4">
          <SpanList :span="errorMessages" />
        </CardStateAlert>
        <div v-if="$slots.assistance" class="flex justify-center">
          <slot name="assistance" />
        </div>
      </div>
    </Card>
  </form>
</template>

<script setup lang="ts">
import consola from 'consola'
import type { BaseValidation } from '@vuelidate/core'

import { BackendError } from '~/types/types'
import { useMaevsiStore } from '~/store/index'

export interface Props {
  errors?: BackendError[]
  errorsPgIds?: Record<string, string>
  form: BaseValidation
  formClass?: string
  isFormSent?: boolean
  submitName?: string
}
const props = withDefaults(defineProps<Props>(), {
  errors: undefined,
  errorsPgIds: undefined,
  formClass: undefined,
  isFormSent: false,
  submitName: undefined,
})

const store = useMaevsiStore()
const turnstileKey = ref('')
const isDisabledSubmitButton = ref(true)

watch(turnstileKey, (newKey) => {
  if (newKey !== undefined || newKey !== '') {
    isDisabledSubmitButton.value = false
  }
})

function setTurnstileKeyAndEmit() {
  setTurnstileKeyToStore()
  emit('click')
}

function setTurnstileKeyToStore() {
  consola.info('Got turnstile key: ' + turnstileKey.value)
  store.turnstileKey = turnstileKey.value
}

const emit = defineEmits<{
  (e: 'click'): void
  (e: 'submit', event: Event): void
}>()

const { t } = useI18n()

// computations
const errorMessages = computed(() =>
  props.errors
    ? getCombinedErrorMessages(props.errors, props.errorsPgIds)
    : undefined
)
</script>

<script lang="ts">
export default {
  name: 'MaevsiForm',
}
</script>

<i18n lang="yaml">
de:
  submit: Absenden
en:
  submit: Submit
</i18n>
