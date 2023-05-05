<template>
  <form
    v-if="form"
    :class="[
      { 'animate-shake rounded-lg border border-red-500': errors?.length },
      formClass,
    ]"
    novalidate
    @submit="onSubmit"
  >
    <Card class="flex flex-col" is-high>
      <div class="flex flex-col min-h-0 overflow-y-auto gap-6">
        <slot />
        <div class="flex flex-col items-center justify-between gap-2">
          <div class="flex justify-center">
            <NuxtTurnstile v-model="form.turnstileKey" />
          </div>
          <FormInputStateError v-if="turnstileKeyError">
            {{ t('turnstileError') }}
          </FormInputStateError>
          <FormInputStateInfo v-if="turnstileKeyInfo">
            {{ t('turnstileInfo') }}
          </FormInputStateInfo>
          <ButtonColored
            :aria-label="submitName || t('submit')"
            :class="{
              'animate-shake': form.$error,
            }"
            type="submit"
            @click="emit('click')"
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
import { type BaseValidation, useVuelidate } from '@vuelidate/core'
import { required } from '@vuelidate/validators'

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

// data
const form = reactive({
  turnstileKey: '',
})

// vuelidate
const rules = {
  turnstileKey: {
    required,
  },
}
const v$ = useVuelidate(rules, form)

// methods
const emit = defineEmits<{
  (e: 'click'): void
  (e: 'submit', event: Event): void
}>()

const store = useMaevsiStore()
const { t } = useI18n()

// methods
const onSubmit = (e: Event) => {
  storeTurnstileKey()
  emit('submit', e)
}

const storeTurnstileKey = () => {
  store.turnstileKey = form.turnstileKey
}

// computations
const errorMessages = computed(() =>
  props.errors
    ? getCombinedErrorMessages(props.errors, props.errorsPgIds)
    : undefined
)

// lifecycle
const turnstileKeyError = ref(false)
const turnstileKeyInfo = ref(false)
watch(v$, (v$) => {
  if (v$.turnstileKey.$error) {
    turnstileKeyError.value = true
  }
  if (!v$.turnstileKey.$error && turnstileKeyError.value) {
    turnstileKeyInfo.value = true
    turnstileKeyError.value = false
  }
})
</script>

<script lang="ts">
export default {
  name: 'MaevsiForm',
}
</script>

<i18n lang="yaml">
de:
  submit: Absenden
  turnstileError: Das Captcha wurde nicht bestätigt. Warte kurz oder lade die Seite neu.
  turnstileInfo: Das Captcha wurde bestätigt. Du kannst jetzt fortfahren.
en:
  submit: Submit
  turnstileError: The Captcha was not confirmed. Wait a bit or reload the page.
  turnstileInfo: The captcha was confirmed. You can proceed now.
</i18n>
