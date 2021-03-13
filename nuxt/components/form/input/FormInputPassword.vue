<template>
  <FormInput
    :error="v.form[formKeyComputed].$error"
    :label-for="`input-${id}`"
    :title="$t(id.replace(/(-registration|-sign-in)$/, ''))"
  >
    <input
      :id="`input-${id}`"
      class="form-input"
      type="password"
      placeholder="**********"
      :value="v.form[formKeyComputed].$model"
      @input="$emit('input', $event.target.value)"
    />
    <template slot="inputError">
      <FormInputError
        :form-input="v.form[formKeyComputed]"
        validation-property="minLength"
      >
        {{ $t('globalValidationShortness') }}
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
  password: 'Passwort'
  passwordCurrent: 'Aktuelles Passwort'
  passwordNew: 'Neues Passwort'
en:
  password: 'Password'
  passwordCurrent: 'Current Password'
  passwordNew: 'New Password'
</i18n>
