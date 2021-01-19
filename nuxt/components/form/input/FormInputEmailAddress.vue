<template>
  <FormInput
    :error="formElement.$error"
    :label-for="`input-${id}`"
    :title="$t('emailAddress')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="email"
      :placeholder="$t('globalPlaceholderEmailAddress')"
      :value="formElement.$model"
      @blur="$emit('blur', $event.target.value)"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError :form-input="formElement" validation-property="email">
        {{ $t('globalValidationFormatIncorrect') }}
      </FormInputError>
      <FormInputError :form-input="formElement" validation-property="maxLength">
        {{ $t('globalValidationTooLong') }}
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
    id: {
      default: undefined,
      type: String,
    },
    formElement: {
      default: undefined,
      type: Object,
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
  emailAddress: 'E-Mail-Adresse'
en:
  emailAddress: 'Email address'
</i18n>
