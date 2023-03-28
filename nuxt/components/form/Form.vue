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
            <Turnstile v-model="state.turnstileKey" />
          </div>
          <FormInputStateError v-if="turnstileKeyError" class="mt-2">
            {{ t('turnstileError') }}
          </FormInputStateError>
          <FormInputStateInfo v-if="turnstileKeyInfo" class="mt-2">
            {{ t('turnstileInfo') }}
          </FormInputStateInfo>
          <ButtonColored
            :aria-label="submitName || t('submit')"
            :class="{
              'animate-shake': form.$error,
            }"
            type="submit"
            @click="storeTurnstileKey()"
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
import type { BaseValidation } from '@vuelidate/core'

import { useVuelidate } from '@vuelidate/core'
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
const state = reactive({
  turnstileKey: '',
})

// vuelidate
const rules = {
  turnstileKey: {
    required,
  },
}

const v$ = useVuelidate(rules, state)

// methods
const emit = defineEmits<{
  (e: 'click'): void
  (e: 'submit', event: Event): void
}>()

const store = useMaevsiStore()
const { t } = useI18n()

// methods
const storeTurnstileKey = () => {
  store.turnstileKey = state.turnstileKey
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
    console.log('The turnstile error value is set to true')
    turnstileKeyError.value = true
  }
  if (!v$.turnstileKey.$error && turnstileKeyError.value) {
    console.log('The Turnstile Info value is set to true')
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
  turnstileError: Das Captcha wurde nicht bestätigt. Warte kurz oder lade die Seite neu
  turnstileInfo: Das Captcha wurde bestätigt. Du kannst jetzt fortfahren.
en:
  submit: Submit
  turnstileError: The Captcha was not confirmed. Wait a bit or reload the page
  turnstileInfo: The captcha was confirmed. You can proceed now
</i18n>
