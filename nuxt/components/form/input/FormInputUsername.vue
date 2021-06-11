<template>
  <FormInput
    :error="v.form[formKeyComputed].$error"
    :label-for="`input-${id}`"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="text"
      :placeholder="$t('globalPlaceholderUsername')"
      :value="v.form[formKeyComputed].$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="existence"
      >
        {{ $t('globalValidationExistence') }}
      </FormInputError>
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="formatSlug"
      >
        {{ $t('globalValidationFormat') }}
      </FormInputError>
      <FormInputError
        :form-input="v.form[formKeyComputed]"
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
    formKey: {
      default: undefined,
      type: String,
    },
    v: {
      default: undefined,
      type: Object,
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
  username: Nutzername
en:
  username: Username
</i18n>
