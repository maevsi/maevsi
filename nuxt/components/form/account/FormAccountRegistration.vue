<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('/task/account/sign-in')"
    >
      {{ t('signIn') }}
      <template #prefix>
        <IconArrowLeft />
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
        is-required
        @input="form.emailAddress = $event"
      />
      <div class="flex justify-center">
        <Turnstile v-model="store.turnstileKey" />
      </div>
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
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators'

import { useAccountRegistrationMutation } from '~/gql/generated'
import { useMaevsiStore } from '~~/store'

const { locale, t } = useI18n()
const localePath = useLocalePath()
const fireAlert = useFireAlert()
const store = useMaevsiStore()

// api data
const accountRegistrationMutation = useAccountRegistrationMutation()
const api = getApiData([accountRegistrationMutation])

// data
const form = reactive({
  emailAddress: ref<string>(),
  password: ref<string>(),
  username: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  if (!(await isFormValid({ v$, isFormSent }))) return

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
  username: {
    existenceNone: helpers.withAsync(validateUsername(true)),
    formatSlug: VALIDATION_FORMAT_SLUG,
    maxLength: maxLength(VALIDATION_USERNAME_LENGTH_MAXIMUM),
    required,
  },
  password: {
    minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
    required,
  },
  emailAddress: {
    email,
    formatUppercaseNone: VALIDATION_FORMAT_UPPERCASE_NONE,
    maxLength: maxLength(VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM),
    required,
  },
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
  signIn: Oder stattdessen anmelden
en:
  accountDeletionNotice: "You'll be able to delete your account at any time."
  postgres22023: Your password is too short! Think of a longer one.
  postgres23505: This username or email address is already in use! Think of a new name or try signing in instead.
  register: Register
  registrationSuccessBody: Verify your account using the verification link sent to you by email.
  registrationSuccessTitle: Verification email sent.
  signIn: Or sign in instead
</i18n>
