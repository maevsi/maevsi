<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :is-validatable="isValidatable"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderUsername')"
    :success="isValidatable && !formInput.$invalid"
    :title="t(id)"
    type="text"
    :validation-property="formInput"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template v-if="$slots.icon" #icon>
      <slot name="icon" />
    </template>
    <template #stateError>
      <FormInputStateError
        :form-input="formInput"
        :is-validation-live="!isValidationInverted"
        validation-property="existence"
      >
        {{ t('globalValidationExistence') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        :is-validation-live="isValidationInverted"
        validation-property="existenceNone"
      >
        {{ t('globalValidationExistenceNone') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatSlug"
      >
        {{ t('validationFormat') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="required"
      >
        {{ t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
    <template #stateInfo>
      <FormInputStateInfo
        :form-input="formInput"
        :is-validation-live="!isValidationInverted"
        validation-property="existence"
      >
        {{ t('validationExistenceHint') }}
      </FormInputStateInfo>
    </template>
    <template v-if="isValidatable" #stateSuccess>
      <FormInputStateSuccess
        :form-input="formInput"
        validation-property="existence"
      >
        {{
          isValidationInverted
            ? t('globalVerificationExistenceNone')
            : t('globalVerificationExistence')
        }}
      </FormInputStateSuccess>
    </template>
  </FormInput>
</template>

<script setup lang="ts">
import type { BaseValidation } from '@vuelidate/core'

export interface Props {
  formInput: BaseValidation | undefined
  id?: string
  isOptional?: boolean
  isValidatable?: boolean
  isValidationInverted?: boolean
}
withDefaults(defineProps<Props>(), {
  id: 'username',
  isOptional: false,
  isValidatable: false,
  isValidationInverted: false,
})

const { t } = useI18n()
</script>

<i18n lang="yml">
de:
  iconCheck: Verifiziert
  username: Nutzername
  validationExistenceHint: Hast du Groß- und Kleinbuchstaben richtig verwendet?
  validationFormat: Darf nur Buchstaben, Ziffern und Bindestriche enthalten.
en:
  iconCheck: Verified
  username: Username
  validationExistenceHint: Have you used upper and lower case letters correctly?
  validationFormat: May only contain letter, digits and dashes.
</i18n>
