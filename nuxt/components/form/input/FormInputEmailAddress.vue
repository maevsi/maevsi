<template>
  <FormInput
    :error="v.form[formKeyComputed].$error"
    :label-for="`input-${id}`"
    :title="$t('emailAddress')"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="email"
      :placeholder="$t('emailAddressPlaceholder')"
      :value="v.form[formKeyComputed].$model"
      @blur="$emit('blur', $event.target.value)"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormError
        :validation-object="v.form[formKeyComputed]"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormError>
      <FormError
        :validation-object="v.form[formKeyComputed]"
        validation-property="email"
      >
        {{ $t('globalValidationFormatIncorrect') }}
      </FormError>
    </template>
  </FormInput>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    formKey: {
      type: String,
      default: undefined,
    },
    v: {
      type: Object,
      default: undefined,
    },
  },
  computed: {
    formKeyComputed() {
      return this.formKey ? this.formKey : this.id
    },
  },
}
</script>

<i18n lang="yml">
de:
  emailAddress: 'E-Mail-Adresse'
  emailAddressPlaceholder: 'email@adres.se'
en:
  emailAddress: 'Email address'
  emailAddressPlaceholder: 'email@addre.ss'
</i18n>
