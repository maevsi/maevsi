<template>
  <FormInput
    :error="formElement.$error"
    :is-optional="isOptional"
    :label-for="`input-${id}`"
    :title="$t('phoneNumber')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      :placeholder="$t('globalPlaceholderPhoneNumber')"
      type="url"
      :value="formElement.$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError
        :form-input="formElement"
        validation-property="formatPhoneNumber"
      >
        {{ $t('globalValidationFormat') }}
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
      default: 'phone-number',
      type: String,
    },
    isOptional: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  phoneNumber: Telefonnummer
en:
  phoneNumber: Phone number
</i18n>
