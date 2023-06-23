<template>
  <form
    v-if="form"
    :class="[
      { 'animate-shake rounded-lg border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="emit('submit', $event)"
  >
    <Card class="flex flex-col" is-high>
      <div class="flex flex-col min-h-0 gap-6">
        <slot />
        <div class="flex flex-col items-center justify-between">
          <ButtonColored
            :aria-label="submitName || t('submit')"
            :class="{
              'animate-shake': $error,
            }"
            type="submit"
            @click="emit('click')"
          >
            {{ submitName || t('submit') }}
            <template #prefix>
              <slot name="submit-icon" />
            </template>
          </ButtonColored>
          <FormInputStateError v-if="$error" class="mt-2">
            {{ t('globalValidationFailed') }}
          </FormInputStateError>
        </div>
        <div v-if="errorMessages?.length" class="flex flex-col gap-4">
          <CardStateAlert>
            <SpanList :span="errorMessages" />
          </CardStateAlert>
          <div v-if="$slots.assistance" class="flex justify-center">
            <slot name="assistance" />
          </div>
        </div>
      </div>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { type BaseValidation } from '@vuelidate/core'

import { BackendError } from '~/types/types'

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

const emit = defineEmits<{
  click: []
  submit: [event: Event]
}>()

const { t } = useI18n()

// computations
const $error = computed(
  // this is not equivalent to Vuelidate's `$error` as docs claim (https://github.com/vuelidate/vuelidate/pull/1188)
  () => props.form.$dirty && props.form.$invalid && !props.form.$pending
)
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