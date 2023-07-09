<template>
  <FormInput
    :class="{
      hidden: !isVisible && !formInput.$error,
    }"
    :title="t('captcha')"
    :value="formInput"
  >
    <NuxtTurnstile
      ref="turnstileRef"
      :class="{ 'h-[65px]': isVisible }"
      :options="{
        'error-callback': () => (isLoading = false),
        'expired-callback': () => emit('input', undefined),
      }"
      @update:model-value="update"
    />
    <FormInputStateError
      v-if="!isVisible"
      :form-input="formInput"
      validation-property="required"
    >
      {{ t('globalValidationRequired') }}
    </FormInputStateError>
    <template v-if="isVisible" #stateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
    <template v-if="!isVisible && isLoading" #stateInfo>
      <FormInputStateInfo>
        {{ t('globalLoading') }}
      </FormInputStateInfo>
    </template>
    <template v-if="formInput.$error" #assistance>
      <ButtonColored :aria-label="t('reset')" @click="reset">
        {{ t('reset') }}
        <template #prefix>
          <IconArrowPath />
        </template>
      </ButtonColored>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

import { useMaevsiStore } from '~/store'

export interface Props {
  formInput: BaseValidation
}
withDefaults(defineProps<Props>(), {})

const emit = defineEmits<{
  (e: 'input', event?: string): void
}>()

const { t } = useI18n()
const store = useMaevsiStore()
const runtimeConfig = useRuntimeConfig()

// refs
const turnstileRef = ref()

// data
const isLoading = ref(true)

// computations
const isVisible = computed(
  () => !runtimeConfig.public.isTesting,
  // TODO: implement invisible widget type with fallback in case of required user interaction (https://github.com/maevsi/maevsi/issues/1239)
  // !['1x00000000000000000000BB', '2x00000000000000000000BB'].includes(
  //   config.public.turnstile.siteKey
  // )
)

// methods
const reset = () => {
  isLoading.value = true
  turnstileRef.value.reset()
}
const update = (e: string) => {
  isLoading.value = false
  store.turnstileToken = e
  emit('input', e)
}
</script>

<i18n lang="yaml">
de:
  captcha: Captcha
  reset: Captcha neu laden
en:
  captcha: Captcha
  reset: Reload captcha
</i18n>
