<template>
  <FormInput
    :error="formElement.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('emailAddress')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      :placeholder="$t('globalPlaceholderEmailAddress')"
      type="email"
      :value="formElement.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formElement" validation-property="email">
        {{ $t('globalValidationFormat') }}
      </FormInputError>
      <FormInputError
        :form-input="formElement"
        validation-property="formatUppercaseNone"
      >
        {{ $t('globalValidationFormatUppercaseNone') }}
      </FormInputError>
      <FormInputError :form-input="formElement" validation-property="maxLength">
        {{ $t('globalValidationLength') }}
      </FormInputError>
      <FormInputError
        v-if="required"
        :form-input="formElement"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormInputError>
    </template>
  </FormInput>
</template>

<script>
export default {
  props: {
    formElement: {
      required: true,
      type: Object,
    },
    id: {
      default: undefined,
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
    required: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  emailAddress: E-Mail-Adresse
en:
  emailAddress: Email address
</i18n>
