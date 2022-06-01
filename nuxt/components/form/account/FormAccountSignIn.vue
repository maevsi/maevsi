<template>
  <Form
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
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
          $util.getQueryString({
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
          graphqlError &&
          graphqlError.graphQLErrors.filter((e) => e.code === '55000').length >
            0
        "
        :aria-label="$t('verificationMailResend')"
        @click="accountRegistrationRefresh"
      >
        {{ $t('verificationMailResend') }}
      </ButtonColored>
    </template>
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

import { defineComponent } from '#app'
import ACCOUNT_REGISTRATION_MUTATION_REFRESH from '~/gql/mutation/account/accountRegistrationRefresh.gql'
import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'

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
      graphqlError: undefined as Error | undefined,
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
          this.$util.getNested(data, 'accountRegistrationRefresh')
        )
        .catch((reason) => {
          this.graphqlError = reason
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
        await this.$util.formPreSubmit(this)
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
        .then(({ data }) => this.$util.getNested(data, 'authenticate'))
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$util
        .jwtStore(this.$apollo.getClient(), this.$store, undefined, res.jwt)
        .catch(
          async () =>
            await this.$swal({
              icon: 'error',
              text: this.$t('jwtStoreFail') as string,
              title: this.$t('globalStatusError'),
            })
        )
    },
  },
  validations() {
    return {
      form: {
        username: {
          formatSlug: this.$util.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$util.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(this.$util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
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
  jwtStoreFail: Fehler beim Speichern der Authentifizierungsdaten!
  passwordFound: Passwort wiedergefunden?
  passwordLost: Passwort verloren?
  postgres22023: Ein Konto mit diesem Benutzernamen existiert nicht! Überprüfe deine Eingaben auf Schreibfehler.
  postgres55000: Die E-Mail-Adresse ist noch nicht verifiziert!
  postgresP0002: Anmeldung fehlgeschlagen! Überprüfe deine Eingaben auf Schreibfehler.
  registrationRefreshSuccess: Eine neue Willkommensmail ist auf dem Weg zu dir.
  sent: Gesendet!
  signIn: Anmelden
  username: Nutzername
  verificationMailResend: Verifizierungsmail erneut senden
en:
  jwtStoreFail: Failed to store the authentication information!
  passwordFound: Password found?
  passwordLost: Password lost?
  postgres22023: An account with this username does not exists! Check your input for spelling mistakes.
  postgres55000: The email address is not yet verified!
  postgresP0002: Login failed! Check your input for spelling mistakes.
  registrationRefreshSuccess: A new welcome email is on its way to you.
  sent: Sent!
  signIn: Sign in
  username: Username
  verificationMailResend: Resend verification mail
</i18n>
