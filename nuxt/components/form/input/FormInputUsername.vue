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
    <template #icon>
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

<script lang="ts">
import type { BaseValidation } from '@vuelidate/core'
import { PropType } from 'vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<BaseValidation | undefined>,
    },
    id: {
      default: 'username',
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    isValidatable: {
      default: false,
      type: Boolean,
    },
    isValidationInverted: {
      default: false,
      type: Boolean,
    },
  },
  setup() {
    const { t } = useI18n()

    const methods = {
      t,
    }

    return {
      ...methods,
    }
  },
})
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
  validationExistenceHint: Did you use upper and lower case letters correctly?
  validationFormat: May only contain letter, digits and dashes.
</i18n>
