<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('/task/account/register')"
    >
      {{ t('register') }}
      <template slot="prefix">
        <IconArrowRight />
      </template>
    </ButtonColored>
    <Form
      :errors="api.errors"
      :form="v$.form"
      form-class="w-full"
      :is-form-sent="isFormSent"
      :submit-name="t('signIn')"
      @submit.prevent="submit"
    >
      <FormInputUsername
        id="username-sign-in"
        :form-input="v$.form.username"
        @input="form.username = $event"
      />
      <FormInputPassword
        id="password-sign-in"
        :form-input="v$.form.password"
        @input="form.password = $event"
      />
      <div class="flex justify-center">
        <AppLink :to="localePath('/task/account/password/reset/request')">
          {{ t('passwordReset') }}
        </AppLink>
      </div>
      <template slot="assistance">
        <ButtonColored
          v-if="
            api.errors.filter((e) =>
              'errcode' in e ? e.errcode === '55000' : false
            ).length
          "
          :aria-label="t('verificationMailResend')"
          @click="accountRegistrationRefresh"
        >
          {{ t('verificationMailResend') }}
        </ButtonColored>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'
import { reactive, toRef, defineComponent } from 'vue'

import { navigateTo } from '#app'

import {
  formPreSubmit,
  VALIDATION_FORMAT_SLUG,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
  VALIDATION_USERNAME_LENGTH_MAXIMUM,
} from '~/plugins/util/validation'
import { useJwtStore } from '~/plugins/util/auth'
import { getApiDataDefault } from '~/plugins/util/util'
import {
  useAccountRegistrationRefreshMutation,
  useAuthenticateMutation,
} from '~/gql/generated'

const FormAccountSignIn = defineComponent({
  setup() {
    const { jwtStore } = useJwtStore()
    const { locale, t } = useI18n()
    const localePath = useLocalePath()
    const { executeMutation: executeMutationAccountRegistrationRefresh } =
      useAccountRegistrationRefreshMutation()
    const { executeMutation: executeMutationAuthentication } =
      useAuthenticateMutation()

    const apiData = getApiDataDefault()
    const data = reactive({
      form: {
        password: '',
        username: '',
      },
      isFormSent: false,
    })
    const rules = {
      form: {
        username: {
          formatSlug: VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    const methods = {
      accountRegistrationRefresh() {
        executeMutationAccountRegistrationRefresh({
          language: locale.value,
          username: data.form.username,
        }).then((result) => {
          if (result.error) {
            apiData.api.value.errors.push(result.error)
            consola.error(result.error)
          } else {
            Swal.fire({
              icon: 'success',
              text: t('registrationRefreshSuccess') as string,
              title: t('sent'),
            })
          }
        })
      },
      localePath,
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        executeMutationAuthentication({
          username: data.form.username,
          password: data.form.password,
        }).then(async (result) => {
          if (result.error) {
            apiData.api.value.errors.push(result.error)
            consola.error(result.error)
          } else {
            await jwtStore(result.data?.authenticate?.jwt, () => {})
              .then(() => {
                navigateTo(localePath(`/dashboard`))
              })
              .catch(async (error) => {
                consola.debug(error)
                await Swal.fire({
                  icon: 'error',
                  text: t('jwtStoreFail') as string,
                  title: t('globalStatusError'),
                })
              })
          }
        })
      },
      t,
    }

    return {
      ...apiData,
      ...data,
      ...methods,
      v$,
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
