<template>
  <form
    v-if="form"
    ref="formRef"
    :class="[
      { 'animate-shake rounded border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="(e) => $emit('submit', e)"
  >
    <Card>
      <slot />
      <div class="mb-4 mt-6 flex flex-col items-center justify-between">
        <ButtonColored
          ref="buttonSubmitRef"
          :aria-label="submitName || t('submit')"
          :class="{
            'animate-shake': form.$error,
          }"
          type="submit"
          @click="$emit('click')"
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
      <div class="flex justify-center">
        <slot name="assistance" />
      </div>
    </Card>
  </form>
</template>

<script setup lang="ts">
import { CombinedError } from '@urql/core'
import type { BaseValidation } from '@vuelidate/core'

import Button from '~/components/button/Button.vue'
import { useGetCombinedErrorMessages } from '~/plugins/util/util'

export interface Props {
  errors?: (CombinedError | { errcode: string; message: string })[]
  form: BaseValidation
  formClass?: string
  isFormSent?: boolean
  submitName?: string
}
const props = withDefaults(defineProps<Props>(), {
  errors: undefined,
  formClass: undefined,
  isFormSent: false,
  submitName: undefined,
})

const { getCombinedErrorMessages } = useGetCombinedErrorMessages()
const { t } = useI18n()

// refs
const buttonSubmitRef = ref<InstanceType<typeof Button>>()
const formRef = ref<HTMLFormElement>()

// // methods
// function reset() {
//   formRef.value?.reset()
// }
// function submit() {
//   buttonSubmitRef.value?.click()
// }

// computations
const errorMessages = computed(() =>
  props.errors ? getCombinedErrorMessages(props.errors) : undefined
)
</script>

<script lang="ts">
export default {
  name: 'MaevsiForm',
}
</script>

<i18n lang="yml">
de:
  submit: Absenden
en:
  submit: Submit
</i18n>
