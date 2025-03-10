<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('session-create')"
    >
      {{ t('signIn') }}
      <template #prefix>
        <IHeroiconsArrowLeft />
      </template>
    </ButtonColored>
    <Form
      :errors="api.errors"
      :errors-pg-ids="{
        postgres22023: t('postgres22023'),
        postgres23505: t('postgres23505'),
      }"
      :form="v$"
      form-class="w-full"
      :is-form-sent="isFormSent"
      :submit-name="t('register')"
      @submit.prevent="submit"
    >
      <FormInputUsername
        :form-input="v$.username"
        is-validatable
        is-validation-inverted
        @input="form.username = $event"
      />
      <FormInputPassword
        :form-input="v$.password"
        @input="form.password = $event"
      />
      <FormInputEmailAddress
        :form-input="v$.emailAddress"
        @input="form.emailAddress = $event"
      />
      <FormInputCaptcha
        :form-input="v$.captcha"
        is-centered
        @input="form.captcha = $event"
      />
      <template #assistance>
        <FormInputStateInfo>
          {{ t('accountDeletionNotice') }}
        </FormInputStateInfo>
      </template>
    </Form>
  </div>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { useAccountRegistrationMutation } from '~~/gql/documents/mutations/account/accountRegistration'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const fireAlert = useFireAlert()
const store = useStore()

// api data
const accountRegistrationMutation = useAccountRegistrationMutation()
const api = getApiData([accountRegistrationMutation])

// data
const form = reactive({
  captcha: ref<string>(),
  emailAddress: ref<string>(),
  password: ref<string>(),
  username: ref<string>(),
})
const isFormSent = ref(false)

// methods
const submit = async () => {
  if (!(await isFormValid({ v$, isFormSent }))) return

  store.turnstileToken = form.captcha

  const result = await accountRegistrationMutation.executeMutation({
    emailAddress: form.emailAddress || '',
    language: locale.value,
    password: form.password || '',
    username: form.username || '',
  })

  if (result.error || !result.data) return

  await fireAlert({
    level: 'success',
    title: t('registrationSuccessTitle'),
    text: t('registrationSuccessBody'),
  })
}

// vuelidate
const rules = {
  captcha: VALIDATION_CAPTCHA(),
  username: VALIDATION_USERNAME({
    isRequired: true,
    validateExistenceNone: true,
  }),
  password: VALIDATION_PASSWORD(),
  emailAddress: VALIDATION_EMAIL_ADDRESS({ isRequired: true }),
}
const v$ = useVuelidate(rules, form)
</script>

<i18n lang="yaml">
de:
  accountDeletionNotice: Du wirst deinen Account jederzeit löschen können.
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgres23505: Es gibt bereits einen Account mit diesem Nutzernamen oder dieser E-Mail-Adresse! Überlege dir einen neuen Namen oder versuche dich anzumelden.
  register: Registrieren
  registrationSuccessBody: Verifiziere deinen Account über den Link in der E-Mail, die du in Kürze erhalten wirst.
  registrationSuccessTitle: Verifizierungs-E-Mail gesendet.
  signIn: Stattdessen anmelden
en:
  accountDeletionNotice: "You'll be able to delete your account at any time."
  postgres22023: Your password is too short! Think of a longer one.
  postgres23505: This username or email address is already in use! Think of a new name or try signing in instead.
  register: Register
  registrationSuccessBody: Verify your account using the verification link sent to you by email.
  registrationSuccessTitle: Verification email sent.
  signIn: Sign in instead
</i18n>
