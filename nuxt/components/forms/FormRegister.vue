<template>
  <Form
    :form-class="formClass"
    :function-submit="register"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
  >
    <FormInput :title="'Username'" :v="$v">
      <input
        id="input-username-register"
        v-model.trim="$v.form.username.$model"
        class="form-input"
        type="text"
        placeholder="john-doe"
      />
      <div slot="formError">
        <FormError
          :text="'required'"
          :validation-object="$v.form.username"
          :validation-property="'required'"
        />
        <FormError
          :text="'invalid format'"
          :validation-object="$v.form.username"
          :validation-property="'slug'"
        />
      </div>
    </FormInput>
    <FormInput :title="'Password'" :v="$v">
      <input
        id="input-password-register"
        v-model.trim="$v.form.password.$model"
        class="form-input"
        type="password"
        placeholder="**********"
      />
      <div slot="formError">
        <FormError
          :text="'required'"
          :validation-object="$v.form.password"
          :validation-property="'required'"
        />
        <FormError
          :text="'too short'"
          :validation-object="$v.form.password"
          :validation-property="'minLength'"
        />
      </div>
    </FormInput>
    <FormInput :title="'Email address'" :v="$v">
      <input
        id="input-email-address"
        v-model.trim="$v.form['email-address'].$model"
        class="form-input"
        type="email"
        placeholder="email@addre.ss"
      />
      <div slot="formError">
        <FormError
          :text="'required'"
          :validation-object="$v.form['email-address']"
          :validation-property="'required'"
        />
        <FormError
          :text="'invalid format'"
          :validation-object="$v.form['email-address']"
          :validation-property="'email'"
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
        Register
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
import { email, helpers, minLength, required } from 'vuelidate/lib/validators'

import { ACCOUNT_REGISTER_MUTATION } from '~/scripts/apollo'

const slug = helpers.regex('slug', /^[-A-Za-z0-9]+$/)

export default {
  props: {
    form: {
      type: Object,
      default: undefined,
    },
    formClass: {
      type: String,
      default: undefined,
    },
    handlerSignIn: {
      type: Function,
      default: undefined,
    },
  },
  data() {
    return {
      formSent: undefined,
      graphqlErrorMessage: undefined,
    }
  },
  watch: {
    form: {
      handler(val) {
        this.handlerSignIn(val)
      },
      deep: true,
    },
  },
  methods: {
    touch(prop) {
      this.$v.form[prop].$touch()
    },
    async register(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTER_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
            emailAddress: this.form['email-address'],
          },
        })
        .then(({ data }) => this.$global.checkNested(data, 'accountRegister'))
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          console.error(error)
        })

      await this.$apolloHelpers.onLogin(res.jwt)
    },
  },
  validations() {
    return {
      form: {
        username: {
          required,
          slug,
        },
        password: {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
          required,
        },
        'email-address': {
          email,
          required,
        },
      },
    }
  },
}
</script>
