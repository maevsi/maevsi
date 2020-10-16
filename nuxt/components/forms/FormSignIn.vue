<template>
  <Form
    :form-class="formClass"
    :function-submit="signIn"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
  >
    <FormInput :title="'Username'" :v="$v">
      <input
        id="input-username"
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
        id="input-password"
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
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        type="submit"
      >
        Sign in
      </Button>
      <nuxt-link
        class="disabled inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800 mt-4"
        to="#"
        title="Not yet available."
      >
        Forgot password?
      </nuxt-link>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { helpers, minLength, required } from 'vuelidate/lib/validators'

import { AUTHENTICATE_MUTATION } from '~/scripts/apollo'
import login from '~/scripts/login'

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
    handlerRegister: {
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
        this.handlerRegister(val)
      },
      deep: true,
    },
  },
  methods: {
    touch(prop) {
      this.$v.form[prop].$touch()
    },
    signIn(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: AUTHENTICATE_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then((data) => login(this, data.data.authenticate.jwt))
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          console.error(error)
        })
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
      },
    }
  },
}
</script>
