<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="$t('register')"
      :to="localePath('/task/account/register')"
    >
      {{ $t('register') }}
      <template slot="prefix">
        <IconArrowRight />
      </template>
    </ButtonColored>
    <Form
      :errors="$util.getGqlErrorMessages(graphqlError, this)"
      :form="$v.form"
      form-class="w-full"
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
      <div class="flex justify-center">
        <AppLink :to="localePath('/task/account/password/reset/request')">
          {{ $t('passwordReset') }}
        </AppLink>
      </div>
      <template slot="assistance">
        <ButtonColored
          v-if="
            graphqlError &&
            graphqlError.graphQLErrors.filter((e) => e.errcode === '55000')
              .length > 0
          "
          :aria-label="$t('verificationMailResend')"
          @click="accountRegistrationRefresh"
        >
          {{ $t('verificationMailResend') }}
        </ButtonColored>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { maxLength, minLength, required } from 'vuelidate/lib/validators'

import { defineComponent } from '#app'

import ACCOUNT_REGISTRATION_MUTATION_REFRESH from '~/gql/mutation/account/accountRegistrationRefresh.gql'
import AUTHENTICATE_MUTATION from '~/gql/mutation/account/accountAuthenticate.gql'

const FormAccountSignIn = defineComponent({
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
        .then(({ data }) => data.accountRegistrationRefresh)
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      Swal.fire({
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
        .then(({ data }) => data.authenticate)
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
            await Swal.fire({
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
  passwordReset: Passwort zurücksetzen
  postgres22023: Ein Konto mit diesem Benutzernamen existiert nicht! Überprüfe deine Eingaben auf Schreibfehler.
  postgres55000: Die E-Mail-Adresse ist noch nicht verifiziert!
  postgresP0002: Anmeldung fehlgeschlagen! Hast du dich schon registriert? Überprüfe deine Eingaben auf Schreibfehler.
  register: Oder stattdessen registrieren
  registrationRefreshSuccess: Eine neue Willkommensmail ist auf dem Weg zu dir.
  sent: Gesendet!
  signIn: Anmelden
  username: Nutzername
  verificationMailResend: Verifizierungsmail erneut senden
en:
  jwtStoreFail: Failed to store the authentication information!
  passwordReset: Reset password
  postgres22023: An account with this username does not exists! Check your input for spelling mistakes.
  postgres55000: The email address is not yet verified!
  postgresP0002: Login failed! Have you registered yet? Check your input for spelling mistakes.
  register: Or register instead
  registrationRefreshSuccess: A new welcome email is on its way to you.
  sent: Sent!
  signIn: Sign in
  username: Username
  verificationMailResend: Resend verification email
</i18n>
