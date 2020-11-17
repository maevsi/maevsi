<template>
  <FormInput
    :error="v.form[formKeyComputed].$error"
    :label-for="`input-${id}`"
    :title="$t(id.replace(/(-register|-sign-in)$/, ''))"
  >
    <input
      :id="`input-${id}`"
      v-model.trim="v.form[formKeyComputed].$model"
      class="form-input"
      type="password"
      placeholder="**********"
    />
    <template slot="formError">
      <FormError
        :validation-object="v.form[formKeyComputed]"
        validation-property="required"
      >
        {{ $t('globalValidationRequired') }}
      </FormError>
      <FormError
        :validation-object="v.form[formKeyComputed]"
        validation-property="minLength"
      >
        {{ $t('globalValidationTooShort') }}
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
  password: 'Passwort'
  passwordCurrent: 'Aktuelles Passwort'
  passwordNew: 'Neues Passwort'
en:
  password: 'Password'
  passwordCurrent: 'Current Password'
  passwordNew: 'New Password'
</i18n>
