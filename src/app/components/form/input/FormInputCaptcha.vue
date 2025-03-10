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
      :key="themeColor"
      :class="{ 'flex justify-center': isCentered, 'h-[65px]': isVisible }"
      :options="{
        'error-callback': () => (isLoading = false),
        'expired-callback': () => emit('input', undefined),
        theme: themeColor,
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
          <IHeroiconsArrowPath />
        </template>
      </ButtonColored>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput: BaseValidation
  isCentered?: boolean
}
withDefaults(defineProps<Props>(), {
  isCentered: false,
})

const emit = defineEmits<{
  input: [event?: string]
}>()

const { t } = useI18n()
const colorMode = useColorMode()
const runtimeConfig = useRuntimeConfig()

// refs
const turnstileRef = ref()

// data
const isLoading = ref(true)
const themeColor = ref<'auto' | 'light' | 'dark'>()

// computations
const isVisible = computed(
  () => !runtimeConfig.public.vio.isTesting,
  // TODO: implement invisible widget type with fallback in case of required user interaction (https://github.com/maevsi/vibetype/issues/1239)
  // !['1x00000000000000000000BB', '2x00000000000000000000BB'].includes(
  //   config.public.turnstile.siteKey
  // )
)

// methods
const getThemeColor = (colorModePreferenceOverride?: string) => {
  const colorModePreference =
    colorModePreferenceOverride || colorMode.preference

  switch (colorModePreference) {
    case 'system':
      return 'auto'
    case 'light':
    case 'dark':
      return colorModePreference
    default:
      throw new Error(`Unexpected color mode "${colorModePreference}"`)
  }
}
const initialize = () => {
  themeColor.value = getThemeColor()
}
const reset = () => {
  isLoading.value = true
  turnstileRef.value.reset()
}
const update = (e: string) => {
  isLoading.value = false
  emit('input', e)
}

// lifecycle
watch(
  () => colorMode.value,
  (currentValue, _oldValue) => (themeColor.value = getThemeColor(currentValue)),
)

// initialization
initialize()
</script>

<i18n lang="yaml">
de:
  captcha: Captcha
  reset: Captcha neu laden
en:
  captcha: Captcha
  reset: Reload captcha
</i18n>
