<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('signIn')"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username-sign-in"
      :form-input="$v.form.username"
      @input="form.username = $event"
    />
    <FormInputPassword
      id="password-sign-in"
      :form-input="$v.form.password"
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
    <template slot="assistance">
      <ButtonColored
        v-if="
          graphqlErrorComputed &&
          graphqlErrorComputed.startsWith('Account not verified!')
        "
        :aria-label="$t('verificationMailResend')"
        @click="accountRegistrationRefresh"
      >
        <!-- https://github.com/maevsi/maevsi/issues/209 -->
        {{ $t('verificationMailResend') }}
      </ButtonColored>
    </template>
  </Form>
</template>

<script lang="ts">
import { maxLength, minLength, required } from 'vuelidate/lib/validators'
import { defineComponent } from '@nuxtjs/composition-api'

import ACCOUNT_REGISTRATION_MUTATION_REFRESH from '~/gql/mutation/account/accountRegistrationRefresh.gql'
import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'

const consola = require('consola')

const FormAccountSignIn = defineComponent({
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
      graphqlError: undefined,
    }
  },
  computed: {
    graphqlErrorComputed(): any {
      if (!this.graphqlError) {
        return
      }

      return [
        ...((this.graphqlError as any).graphQLErrors?.map(
          (e: Error) => e.message
        ) ?? []),
      ].join(', ')
    },
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
    async accountRegistrationRefresh() {
      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTRATION_MUTATION_REFRESH,
          variables: {
            language: this.$i18n.locale,
            username: this.$v.form.username?.$model,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountRegistrationRefresh')
        )
        .catch((reason) => {
          this.graphqlErrorInternal = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$swal({
        icon: 'success',
        text: this.$t('registrationRefreshSuccess') as string,
        title: this.$t('sent'),
      })
    },
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
          this.graphqlError = reason
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
})

export default FormAccountSignIn

export type FormAccountSignInType = InstanceType<typeof FormAccountSignIn>
</script>

<i18n lang="yml">
de:
  passwordFound: Passwort wiedergefunden?
  passwordLost: Passwort verloren?
  registrationRefreshSuccess: Eine neue Willkommensmail ist auf dem Weg zu dir.
  sent: Gesendet!
  signIn: Anmelden
  username: Nutzername
  verificationMailResend: Verifizierungsmail erneut senden
en:
  passwordFound: Password found?
  passwordLost: Password lost?
  registrationRefreshSuccess: A new welcome email is on its way to you.
  sent: Sent!
  signIn: Sign in
  username: Username
  verificationMailResend: Resend verification mail
</i18n>
