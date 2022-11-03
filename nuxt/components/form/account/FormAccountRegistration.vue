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
      :form="v$.form"
      form-class="w-full"
      :is-form-sent="isFormSent"
      :submit-name="t('register')"
      @submit.prevent="submit"
    >
      <FormInputUsername
        :form-input="v$.form.username"
        is-validatable
        is-validation-inverted
        @input="form.username = $event"
      />
      <FormInputPassword
        :form-input="v$.form.password"
        @input="form.password = $event"
      />
      <FormInputEmailAddress
        :form-input="v$.form.emailAddress"
        is-required
        @input="form.emailAddress = $event"
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
import {
  email,
  helpers,
  maxLength,
  minLength,
  required,
} from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'

import {
  formPreSubmit,
  validateUsername,
  VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_SLUG,
  VALIDATION_FORMAT_UPPERCASE_NONE,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
  VALIDATION_USERNAME_LENGTH_MAXIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountRegistrationMutation } from '~/gql/generated'

const emit = defineEmits<{
  (e: 'registered'): void
}>()

const { locale, t } = useI18n()
const localePath = useLocalePath()
const { executeMutation: executeMutationAccountRegistration } =
  useAccountRegistrationMutation()

// api data
const api = computed(() => ({
  data: {},
  ...getApiMeta([]),
}))

// data
const form = reactive({
  emailAddress: ref<string>(),
  password: ref<string>(),
  username: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  if (!form.emailAddress) throw new Error('Email address is not set!')
  if (!form.password) throw new Error('Password is not set!')
  if (!form.username) throw new Error('Username is not set!')

  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  const result = await executeMutationAccountRegistration({
    emailAddress: form.emailAddress,
    language: locale.value,
    password: form.password,
    username: form.username,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data) {
    return
  }

  emit('registered')
  Swal.fire({
    icon: 'success',
    text: t('registrationSuccessBody') as string,
    title: t('registrationSuccessTitle'),
  })
}

// vuelidate
const rules = {
  form: {
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
  },
}
const v$ = useVuelidate(rules, { form })
</script>

<i18n lang="yml">
de:
  accountDeletionNotice: Du wirst deinen Account jederzeit löschen können.
  emailAddress: E-Mail-Adresse
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgres23505: Es gibt bereits einen Account mit diesem Nutzernamen oder dieser E-Mail-Adresse! Überlege dir einen neuen Namen oder versuche dich anzumelden.
  register: Registrieren
  registrationSuccessBody: Verifiziere deinen Account über den Link in der E-Mail, die du in Kürze erhalten wirst.
  registrationSuccessTitle: Verifizierungs-E-Mail gesendet.
  signIn: Oder stattdessen anmelden
en:
  accountDeletionNotice: "You'll be able to delete your account at any time."
  emailAddress: Email address
  postgres22023: Your password is too short! Think of a longer one.
  postgres23505: This username or email address is already in use! Think of a new name or try signing in instead.
  register: Register
  registrationSuccessBody: Verify your account using the verification link sent to you by email.
  registrationSuccessTitle: Verification email sent.
  signIn: Or sign in instead
</i18n>
