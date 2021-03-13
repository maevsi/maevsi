<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error-message="graphqlErrorMessage"
    :submit-name="$t('signIn')"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username-sign-in"
      form-key="username"
      :v="$v"
      @input="form.username = $event"
    />
    <FormInputPassword
      id="password-sign-in"
      form-key="password"
      :v="$v"
      @input="form.password = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <AppLink
        :to="
          $global.getQueryString({
            ...$route.query,
            pw: $route.query.pw === 'lost' ? 'found' : 'lost',
          })
        "
        @click="$emit('password-lost')"
      >
        {{
          $route.query.pw === 'lost' ? $t('passwordFound') : $t('passwordLost')
        }}
      </AppLink>
    </div>
  </Form>
</template>

<script>
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate'

const consola = require('consola')

export default {
  props: {
    formClass: {
      default: undefined,
      type: String,
    },
  },
  data() {
    return {
      form: {
        password: undefined,
        sent: false,
        username: undefined,
      },
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
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
      } catch (error) {
        return
      }

      const res = await this.$apollo
        .mutate({
          mutation: AUTHENTICATE_MUTATION,
          variables: {
            username: this.form.username,
            password: this.form.password,
          },
        })
        .then(({ data }) => this.$global.getNested(data, 'authenticate'))
        .catch((reason) => {
          this.graphqlErrorMessage = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$global.jwtStore(
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
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
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
en:
  passwordFound: 'Password found?'
  passwordLost: 'Password lost?'
  username: 'Username'
  signIn: 'Sign in'
</i18n>
