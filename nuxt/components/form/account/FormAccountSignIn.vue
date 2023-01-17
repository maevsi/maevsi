<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('/task/account/register')"
    >
      {{ t('register') }}
      <template #prefix>
        <IconArrowRight />
      </template>
    </ButtonColored>
    <Form
      :errors="api.errors"
      :errors-pg-ids="{
        postgres22023: t('postgres22023'),
        postgres55000: t('postgres55000'),
        postgresP0002: t('postgresP0002'),
      }"
      :form="v$"
      form-class="w-full"
      :is-form-sent="isFormSent"
      :submit-name="t('signIn')"
      @submit.prevent="submit"
    >
      <FormInputUsername
        :form-input="v$.username"
        @input="form.username = $event"
      />
      <FormInputPassword
        :form-input="v$.password"
        @input="form.password = $event"
      />
      <div class="flex justify-center">
        <AppLink :to="localePath('/task/account/password/reset/request')">
          {{ t('passwordReset') }}
        </AppLink>
      </div>
      <template
        v-if="
          api.errors.filter(
            (e) =>
              e.graphQLErrors.filter(
                (g) => g.originalError?.errcode === '55000'
              ).length
          ).length
        "
        #assistance
      >
        <ButtonColored
          :aria-label="t('verificationMailResend')"
          @click="accountRegistrationRefresh"
        >
          {{ t('verificationMailResend') }}
        </ButtonColored>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'

import {
  useAccountRegistrationRefreshMutation,
  useAuthenticateMutation,
} from '~/gql/generated'

const { jwtStore } = useJwtStore()
const { locale, t } = useI18n()
const localePath = useLocalePath()
const fireAlert = useFireAlert()

// api data
const accountRegistrationRefreshMutation =
  useAccountRegistrationRefreshMutation()
const authenticateMutation = useAuthenticateMutation()
const api = getApiData([
  accountRegistrationRefreshMutation,
  authenticateMutation,
])

// data
const form = reactive({
  password: ref<string>(),
  username: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function accountRegistrationRefresh() {
  if (!(await isFormValid({ v$, isFormSent }))) return

  accountRegistrationRefreshMutation
    .executeMutation({
      language: locale.value,
      username: form.username || '',
    })
    .then(async (result) => {
      if (result.error) return

      await fireAlert({
        level: 'success',
        text: t('registrationRefreshSuccess'),
      })
    })
}
async function submit() {
  if (!(await isFormValid({ v$, isFormSent }))) return

  authenticateMutation
    .executeMutation({
      username: form.username || '',
      password: form.password || '',
    })
    .then(async (result) => {
      if (result.error) return

      try {
        await jwtStore(result.data?.authenticate?.jwt)
      } catch (error) {
        await fireAlert({
          error,
          level: 'error',
          text: t('jwtStoreFail'),
          title: t('globalStatusError'),
        })
        return
      }

      navigateTo(localePath(`/dashboard`))
    })
}

// vuelidate
const rules = {
  username: {
    formatSlug: VALIDATION_FORMAT_SLUG,
    maxLength: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
    required,
  },
  password: {
    minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
    required,
  },
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  jwtStoreFail: Fehler beim Speichern der Authentifizierungsdaten!
  passwordReset: Passwort zurücksetzen
  postgres22023: Ein Konto mit diesem Benutzernamen existiert nicht! Überprüfe deine Eingaben auf Schreibfehler.
  postgres55000: Die E-Mail-Adresse ist noch nicht verifiziert!
  postgresP0002: Anmeldung fehlgeschlagen! Hast du dich schon registriert? Überprüfe deine Eingaben auf Schreibfehler.
  register: Oder stattdessen registrieren
  registrationRefreshSuccess: Eine neue Willkommensmail ist auf dem Weg zu dir.
  signIn: Anmelden
  verificationMailResend: Verifizierungsmail erneut senden
en:
  jwtStoreFail: Failed to store the authentication data!
  passwordReset: Reset password
  postgres22023: This username does not belong to any account! Check your input for spelling mistakes.
  postgres55000: This email address has not been verified yet!
  postgresP0002: Login failed! Have you registered yet? Check your input for spelling mistakes.
  register: Or register instead
  registrationRefreshSuccess: A new welcome email is on its way to you.
  signIn: Sign in
  verificationMailResend: Resend verification email
</i18n>
