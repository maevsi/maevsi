<template>
  <FormInput
    v-if="formInput"
    :is-optional="isOptional"
    :id-label="`input-${id}`"
    :placeholder="$t('globalPlaceholderEmailAddress')"
    :title="title || $t('emailAddress')"
    type="email"
    :value="formInput"
    @input="$emit('input', $event)"
  >
    <template slot="stateError">
      <FormInputStateError :form-input="formInput" validation-property="email">
        {{ $t('globalValidationFormat') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="formatUppercaseNone"
      >
        {{ $t('globalValidationFormatUppercaseNone') }}
      </FormInputStateError>
      <FormInputStateError
        :form-input="formInput"
        validation-property="maxLength"
      >
        {{ $t('globalValidationLength') }}
      </FormInputStateError>
      <FormInputStateError
        v-if="isRequired"
        :form-input="formInput"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputStateError>
    </template>
  </FormInput>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { FormInputType } from '~/components/form/input/FormInput.vue'

export default defineComponent({
  props: {
    formInput: {
      required: true,
      type: Object as PropType<FormInputType>,
    },
    id: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    isRequired: {
      default: false,
      type: Boolean,
    },
    title: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>

<i18n lang="yml">
de:
  emailAddress: E-Mail-Adresse
en:
  emailAddress: Email address
</i18n>
