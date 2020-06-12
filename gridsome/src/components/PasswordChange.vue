<template>
  <form
    class="form rounded-t-none"
    :class="{
      'error shake':
        graphqlErrorMessage !== undefined && !$v.form.$dirty
    }"
    @submit="passwordChange"
  >
    <div>
      <div
        :class="{ 'form-error shake': $v.form.passwordCurrent.$error }"
        class="md:flex md:items-center"
      >
        <div class="md:w-1/3">
          <label
            class="form-label md:text-right mb-1 md:mb-0"
            for="input-password-current"
          >
            Current Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="input-password-current"
            v-model.trim="$v.form.passwordCurrent.$model"
            class="form-input"
            type="password"
            placeholder="**********"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <FormError
            :text="'required'"
            :trigger="
              $v.form.passwordCurrent.$error &&
                !$v.form.passwordCurrent.required
            "
          />
          <FormError
            :text="'too short'"
            :trigger="
              $v.form.passwordCurrent.$error &&
                !$v.form.passwordCurrent.minLength
            "
          />
        </div>
      </div>
    </div>
    <div>
      <div
        :class="{ 'form-error shake': $v.form.passwordNew.$error }"
        class="md:flex md:items-center"
      >
        <div class="md:w-1/3">
          <label
            class="form-label md:text-right mb-1 md:mb-0"
            for="input-password-new"
          >
            New Password
          </label>
        </div>
        <div class="md:w-2/3">
          <input
            id="input-password-new"
            v-model.trim="$v.form.passwordNew.$model"
            class="form-input"
            type="password"
            placeholder="**********"
          >
        </div>
      </div>
      <div class="md:flex md:items-center mb-6">
        <div class="md:w-1/3" />
        <div class="md:w-2/3">
          <FormError
            :text="'required'"
            :trigger="
              $v.form.passwordNew.$error &&
                !$v.form.passwordNew.required
            "
          />
          <FormError
            :text="'too short'"
            :trigger="
              $v.form.passwordNew.$error &&
                !$v.form.passwordNew.minLength
            "
          />
        </div>
      </div>
    </div>
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          !(
            (form.sent
              ? $v.form.$anyDirty
              : $v.form.$dirty) && !$v.form.$error
          )
        "
        :icon="false"
        :text="'Change Password'"
        type="submit"
      />
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </form>
</template>

<script>
import { ACCOUNT_PASSWORD_CHANGE } from '~/apollo/documents'
import AlertGraphql from '~/components/AlertGraphql.vue'
import Button from '~/components/buttons/Button.vue'
import FormError from '~/components/FormError.vue'

import { minLength, required } from 'vuelidate/lib/validators'

export default {
  components: {
    AlertGraphql,
    Button,
    FormError
  },
  data () {
    return {
      form: {
        passwordCurrent: undefined,
        passwordNew: undefined,
        sent: undefined
      },
      graphqlErrorMessage: undefined
    }
  },
  methods: {
    passwordChange (e) {
      e.preventDefault()

      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo.mutate({
        mutation: ACCOUNT_PASSWORD_CHANGE,
        variables: {
          passwordCurrent: this.form.passwordCurrent,
          passwordNew: this.form.passwordNew
        }
      }).then((data) => {
        alert('Success: Password changed successfully.')
      }).catch((error) => {
        this.graphqlErrorMessage = error.message
        console.error(error)
      })
    }
  },
  validations () {
    return {
      form: {
        passwordCurrent: {
          minLength: minLength(this.PASSWORD_LENGTH_MINIMUM),
          required
        },
        passwordNew: {
          minLength: minLength(this.PASSWORD_LENGTH_MINIMUM),
          required
        }
      }
    }
  }
}
</script>
