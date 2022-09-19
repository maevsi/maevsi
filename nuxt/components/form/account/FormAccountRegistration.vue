<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="t('register')"
      :to="localePath('/task/account/sign-in')"
    >
      {{ t('signIn') }}
      <template slot="prefix">
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
        id="username-registration"
        :form-input="v$.form.username"
        is-validatable
        is-validation-inverted
        @input="form.username = $event"
      />
      <FormInputPassword
        id="password-registration"
        :form-input="v$.form.password"
        @input="form.password = $event"
      />
      <FormInputEmailAddress
        id="email-address-registration"
        :form-input="v$.form.emailAddress"
        is-required
        @input="form.emailAddress = $event"
      />
      <template slot="assistance">
        <FormInputStateInfo>
          {{ t('accountDeletionNotice') }}
        </FormInputStateInfo>
      </template>
    </Form>
  </div>
</template>

<script lang="ts">
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
import { computed, defineComponent, reactive, toRef } from 'vue'
import { useI18n } from 'vue-i18n'

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

const FormAccountRegistration = defineComponent({
  setup(_props, { emit }) {
    const { locale, t } = useI18n()
    const localePath = useLocalePath()
    const { executeMutation: executeMutationAccountRegistration } =
      useAccountRegistrationMutation()

    const apiData = {
      api: computed(() => {
        return {
          data: {},
          ...getApiMeta([]),
        }
      }),
    }
    const data = reactive({
      form: {
        emailAddress: '',
        password: '',
        username: '',
      },
      isFormSent: false,
    })
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
    const v$ = useVuelidate(rules, data)
    const methods = {
      localePath,
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        const result = await executeMutationAccountRegistration({
          emailAddress: data.form.emailAddress,
          language: locale.value,
          password: data.form.password,
          username: data.form.username,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
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

export default FormAccountRegistration

export type FormAccountRegistrationType = InstanceType<
  typeof FormAccountRegistration
>
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
  postgres22023: The password is too short! Think about a longer one.
  postgres23505: There is already an account with this username or email address! Think of a new name or try signing in.
  register: Register
  registrationSuccessBody: "Verify your account using the link in the email you'll receive shortly."
  registrationSuccessTitle: Verification email sent.
  signIn: Or sign in instead
</i18n>
