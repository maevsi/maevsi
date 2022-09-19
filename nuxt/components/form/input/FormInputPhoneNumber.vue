<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="t('globalPlaceholderPhoneNumber')"
    :title="t('phoneNumber')"
    type="tel"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template slot="stateInfo">
      <FormInputStateInfo
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ t('validationFormat') }}
      </FormInputStateInfo>
    </template>
    <template slot="stateError">
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatPhoneNumber"
      >
        {{ t('globalValidationFormat') }}
      </FormInputStateError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { BaseValidation } from '@vuelidate/core'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<BaseValidation>,
    },
    id: {
      default: 'phone-number',
      type: String,
    },
    isOptional: {
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
  phoneNumber: Telefonnummer
  validationFormat: Muss mit einem Plus beginnen und darf ansonsten nur Ziffern enthalten (z.B. +1234567890)
en:
  phoneNumber: Phone number
  validationFormat: Must start with a plus and may otherwise only contain digits (e.g. +1234567890)
</i18n>
