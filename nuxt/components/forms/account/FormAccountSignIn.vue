<template>
  <Form
    :form-class="formClass"
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="signIn"
  >
    <FormInput
      :error="$v.form['username'].$error"
      label-for="input-username-sign-in"
      :title="$t('username')"
    >
      <input
        id="input-username-sign-in"
        v-model.trim="$v.form.username.$model"
        class="form-input"
        type="text"
        :placeholder="$t('usernamePlaceholder')"
      />
      <template slot="inputError">
        <FormError
          :validation-object="$v.form.username"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormError>
        <FormError
          :validation-object="$v.form.username"
          validation-property="formatSlug"
        >
          {{ $t('globalValidationFormatIncorrect') }}
        </FormError>
      </template>
    </FormInput>
    <FormInputPassword
      id="password-sign-in"
      form-key="password"
      :v="$v"
      @input="$v.form['password'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon="false"
        type="submit"
      >
        {{ $t('signIn') }}
      </Button>
      <AppLink
        :to="
          $global.getQueryString({
            ...$route.query,
            pw: $route.query.pw === 'lost' ? 'found' : 'lost',
          })
        "
        @click.native="$emit('password-lost')"
      >
        {{
          this.$route.query.pw === 'lost'
            ? $t('passwordFound')
            : $t('passwordLost')
        }}
      </AppLink>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

import AUTHENTICATE_MUTATION from '~/gql/mutation/authenticate'

const consola = require('consola')

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
        if (JSON.stringify(val) !== '{}') {
          this.$emit('form', val)
        }
      },
      deep: true,
    },
  },
  methods: {
    async signIn(e) {
      e.preventDefault()

      this.formSent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      const res = await this.$apollo
        .mutate({
          mutation: AUTHENTICATE_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then(({ data }) => this.$global.checkNested(data, 'authenticate'))
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })

      if (!res) {
        return
      }

      this.$global.storeJwt(
        this.$apollo.getClient(),
        this.$store,
        undefined,
        res.jwt
      )
    },
  },
  validations() {
    return {
      form: {
        username: {
          required,
          formatSlug: this.$global.VERIFICATION_FORMAT_SLUG,
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

<i18n lang="yml">
de:
  passwordFound: 'Passwort wiedergefunden?'
  passwordLost: 'Passwort verloren?'
  signIn: 'Anmelden'
  username: 'Nutzername'
  usernamePlaceholder: 'nutzer-name'
en:
  passwordFound: 'Password found?'
  passwordLost: 'Password lost?'
  username: 'Username'
  signIn: 'Sign in'
  usernamePlaceholder: 'user-name'
</i18n>
