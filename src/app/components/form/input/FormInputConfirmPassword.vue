<template>
  <FormInput
    v-if="formInput"
    :id-label="`input-${id}`"
    :placeholder="
      isVisible ? t('placeholderVisible') : t('placeholderInvisible')
    "
    :title="title || t('confirmPassword')"
    :type="isVisible ? 'text' : 'password'"
    :value="formInput"
    @input="emit('input', $event)"
    @icon="isVisible = !isVisible"
  >
    <template #inputSuffix>
      <slot />
    </template>
    <template #icon>
      <IHeroiconsEye v-if="!isVisible" />
      <IHeroiconsEyeSlash v-else />
    </template>
    <template #stateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </FormInputStateError>
      <FormInputStateError :form-input="formInput" validation-property="match">
        {{ t('passwordsDoNotMatch') }}
      </FormInputStateError>
    </template>
    <template #stateInfo>
      <slot name="stateInfo" />
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  id?: string
  formInput: BaseValidation
  title?: string
}
withDefaults(defineProps<Props>(), {
  id: 'confirmPassword',
  title: undefined,
})

const emit = defineEmits<{
  input: [event: string]
}>()

const { t } = useI18n()

// data
const isVisible = ref(false)
</script>

<i18n lang="yaml">
de:
  confirmPassword: Passwort bestätigen
  placeholderInvisible: '**********'
  placeholderVisible: 'Pa$$w0rt'
  passwordsDoNotMatch: Die Passwörter stimmen nicht überein
en:
  confirmPassword: Confirm password
  placeholderInvisible: '**********'
  placeholderVisible: 'Pa$$w0rd'
  passwordsDoNotMatch: The passwords does not match
</i18n>
