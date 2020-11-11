<template>
  <Form
    :function-submit="passwordChange"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
  >
    <FormInput
      :error="$v.form['current-password'].$error"
      :title="$t('passwordCurrent')"
    >
      <input
        id="input-current-password"
        v-model.trim="$v.form['current-password'].$model"
        class="form-input"
        type="password"
        placeholder="**********"
      />
      <div slot="formError">
        <FormError
          :text="$t('globalValidationRequired')"
          :validation-object="$v.form['current-password']"
          :validation-property="'required'"
        />
        <FormError
          :text="$t('globalValidationTooShort')"
          :validation-object="$v.form['current-password']"
          :validation-property="'minLength'"
        />
      </div>
    </FormInput>
    <FormInput
      :error="$v.form['new-password'].$error"
      :title="$t('passwordNew')"
    >
      <input
        id="input-new-password"
        v-model.trim="$v.form['new-password'].$model"
        class="form-input"
        type="password"
        placeholder="**********"
      />
      <div slot="formError">
        <FormError
          :text="$t('globalValidationRequired')"
          :validation-object="$v.form['new-password']"
          :validation-property="'required'"
        />
        <FormError
          :text="$t('globalValidationTooShort')"
          :validation-object="$v.form['new-password']"
          :validation-property="'minLength'"
        />
      </div>
    </FormInput>
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        :type="'submit'"
      >
        {{ $t('passwordChange') }}
      </Button>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

import ACCOUNT_PASSWORD_CHANGE_MUTATION from '~/gql/mutation/accountPasswordChange'

const consola = require('consola')

export default {
  data() {
    return {
      form: {
        'current-password': undefined,
        'new-password': undefined,
        sent: undefined,
      },
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    passwordChange(e) {
      e.preventDefault()

      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_CHANGE_MUTATION,
          variables: {
            passwordCurrent: this.form['current-password'],
            passwordNew: this.form['new-password'],
          },
        })
        .then((_data) => {
          alert(this.$t('passwordChangeSuccess'))
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })
    },
  },
  validations() {
    return {
      form: {
        'current-password': {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
          required,
        },
        'new-password': {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  passwordChange: 'Passwort ändern'
  passwordChangeSuccess: 'Passwort erfolgreich geändert.'
  passwordCurrent: 'Aktuelles Passwort'
  passwordNew: 'Neues Passwort'
en:
  passwordChange: 'Change password'
  passwordChangeSuccess: 'Password changed successfully.'
  passwordCurrent: 'Current Password'
  passwordNew: 'New Password'
</i18n>
