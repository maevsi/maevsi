<template>
  <form
    v-if="form"
    ref="formRef"
    :class="[
      { 'animate-shake rounded-lg border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="emit('submit', $event)"
  >
    <div class="flex flex-col">
      <div class="flex min-h-0 flex-col gap-6">
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
    </div>
  </form>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

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

// refs
const formRef = ref<HTMLFormElement>()

// methods
const resetForm = () => {
  formRef.value?.reset()
}

// computations
const $error = computed(
  // this is not equivalent to Vuelidate's `$error` as docs claim (https://github.com/vuelidate/vuelidate/pull/1188)
  () => props.form.$dirty && props.form.$invalid && !props.form.$pending,
)
const errorMessages = computed(() =>
  props.errors
    ? getCombinedErrorMessages(props.errors, props.errorsPgIds)
    : undefined,
)

defineExpose({
  resetForm,
})
</script>

<script lang="ts">
export default {
  name: 'AppForm',
}
</script>

<i18n lang="yaml">
de:
  submit: Absenden
en:
  submit: Submit
</i18n>
