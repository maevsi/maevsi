<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('account-create')"
    >
      {{ t('register') }}
      <template #prefix>
        <IHeroiconsArrowRight />
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
      >
      </FormInputPassword>
      <FormInputCaptcha
        :form-input="v$.captcha"
        is-centered
        @input="form.captcha = $event"
      />
      <template
        v-if="
          api.errors.filter(
            (e) =>
              e.graphQLErrors.filter(
                (g) => g.errcode === '55000' || g.errcode === 'P0002',
              ).length,
          ).length
        "
        #assistance
      >
        <ButtonColored
          :aria-label="t('contactSupport')"
          is-external
          to="mailto:contact+sign-in@maev.si"
        >
          {{ t('contactSupport') }}
        </ButtonColored>
      </template>
    </Form>
    <AppLink :to="localePath('account-password-reset-request')">
      {{ t('passwordReset') }}
    </AppLink>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useAuthenticateMutation } from '~~/gql/documents/mutations/account/accountAuthenticate'
import { useAccountRegistrationRefreshMutation } from '~~/gql/documents/mutations/account/accountRegistrationRefresh'

const emit = defineEmits<{
  'signed-in': []
}>()

const fireAlert = useFireAlert()
const { t } = useI18n()
const { jwtStore } = await useJwtStore()
const localePath = useLocalePath()
const store = useStore()

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
  captcha: ref<string>(),
  password: ref<string>(),
  username: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  store.turnstileToken = form.captcha

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

  emit('signed-in')
}

// vuelidate
const rules = {
  captcha: VALIDATION_CAPTCHA(),
  username: VALIDATION_USERNAME({
    isRequired: true,
  }),
  password: VALIDATION_PASSWORD(),
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
  register: Stattdessen registrieren
  signIn: Anmelden
en:
  contactSupport: Contact support
  jwtStoreFail: Failed to store the authentication data!
  passwordReset: Reset password
  postgres55000: Your email address has not been verified yet! Check your email inbox, including the spam folder if necessary, or contact support.
  postgresP0002: Login failed! Have you registered yet? Check your input for spelling mistakes or contact support.
  register: Register instead
  signIn: Sign in
</i18n>
