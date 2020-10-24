<template>
  <Form
    :function-submit="passwordChange"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
  >
    <FormInput :title="'Current Password'" :v="$v">
      <input
        id="input-current-password"
        v-model.trim="$v.form['current-password'].$model"
        class="form-input"
        type="password"
        placeholder="**********"
      />
      <div slot="formError">
        <FormError
          :text="'required'"
          :validation-object="$v.form['current-password']"
          :validation-property="'required'"
        />
        <FormError
          :text="'too short'"
          :validation-object="$v.form['current-password']"
          :validation-property="'minLength'"
        />
      </div>
    </FormInput>
    <FormInput :title="'New Password'" :v="$v">
      <input
        id="input-new-password"
        v-model.trim="$v.form['new-password'].$model"
        class="form-input"
        type="password"
        placeholder="**********"
      />
      <div slot="formError">
        <FormError
          :text="'required'"
          :validation-object="$v.form['new-password']"
          :validation-property="'required'"
        />
        <FormError
          :text="'too short'"
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
        type="submit"
      >
        Change password
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
          alert('Success: Password changed successfully.')
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
