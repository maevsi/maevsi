<template>
  <FormInput :error="v.form[id].$error" :title="$t(id)">
    <input
      :id="`input-${id}`"
      v-model.trim="v.form[id].$model"
      class="form-input"
      type="password"
      placeholder="**********"
    />
    <div slot="formError">
      <FormError
        :text="$t('globalValidationRequired')"
        :validation-object="v.form[id]"
        :validation-property="'required'"
      />
      <FormError
        :text="$t('globalValidationTooShort')"
        :validation-object="v.form[id]"
        :validation-property="'minLength'"
      />
    </div>
  </FormInput>
</template>

<script>
export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    v: {
      type: Object,
      default: undefined,
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
