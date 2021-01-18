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
      <FormError :validation-object="formElement" validation-property="email">
        {{ $t('globalValidationFormatIncorrect') }}
      </FormError>
      <FormError
        :validation-object="formElement"
        validation-property="maxLength"
      >
        {{ $t('globalValidationTooLong') }}
      </FormError>
      <FormError
        v-if="required"
        :validation-object="formElement"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormError>
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
