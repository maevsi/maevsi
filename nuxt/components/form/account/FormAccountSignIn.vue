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
                (g) => g.errcode === '55000' || g.errcode === 'P0002'
              ).length
          ).length
        "
        #assistance
      >
        <ButtonColored
          :aria-label="t('contactSupport')"
          to="mailto:mail+support@maev.si"
        >
          {{ t('contactSupport') }}
        </ButtonColored>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { maxLength, minLength, required } from '@vuelidate/validators'
import { useAuthenticateMutation } from '~/gql/documents/mutations/account/accountAuthenticate'
import { useAccountRegistrationRefreshMutation } from '~/gql/documents/mutations/account/accountRegistrationRefresh'

const { jwtStore } = useJwtStore()
const { t } = useI18n()
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
async function submit() {
  if (!(await isFormValid({ v$, isFormSent }))) return

  const result = await authenticateMutation.executeMutation({
    username: form.username || '',
    password: form.password || '',
  })

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
  contactSupport: Support kontaktieren
  jwtStoreFail: Fehler beim Speichern der Authentifizierungsdaten!
  passwordReset: Passwort zurücksetzen
  postgres55000: Deine E-Mail-Adresse ist noch nicht verifiziert! Schau in dein E-Mail-Postfach, ggf. auch in den Spam-Ordner, oder kontaktiere den Support.
  postgresP0002: Anmeldung fehlgeschlagen! Hast du dich schon registriert? Überprüfe deine Eingaben auf Schreibfehler oder kontaktiere den Support.
  register: Oder stattdessen registrieren
  signIn: Anmelden
en:
  contactSupport: Contact support
  jwtStoreFail: Failed to store the authentication data!
  passwordReset: Reset password
  postgres55000: Your email address has not been verified yet! Check your email inbox, including the spam folder if necessary, or contact support.
  postgresP0002: Login failed! Have you registered yet? Check your input for spelling mistakes or contact support.
  register: Or register instead
  signIn: Sign in
</i18n>
