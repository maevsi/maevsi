<template>
  <div class="flex flex-col items-center gap-4">
    <ButtonColored
      :is-primary="false"
      :aria-label="$t('register')"
      :to="localePath('/task/account/sign-in')"
    >
      {{ $t('signIn') }}
      <template slot="prefix">
        <IconArrowLeft />
      </template>
    </ButtonColored>
    <Form
      ref="formRef"
      :errors="$util.getGqlErrorMessages(graphqlError, this)"
      :form="v$.form"
      form-class="w-full"
      :form-sent="isFormSent"
      :submit-name="$t('register')"
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
          {{ $t('accountDeletionNotice') }}
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
import { reactive, ref } from 'vue'

import { defineComponent, useNuxtApp } from '#app'

import { FormType } from '../Form.vue'
import ACCOUNT_REGISTRATION_MUTATION from '~/gql/mutation/account/accountRegistration.gql'

const FormAccountRegistration = defineComponent({
  setup() {
    const { $apollo, $util } = useNuxtApp()
    const data = {
      form: reactive({
        emailAddress: undefined as string | undefined,
        password: undefined as string | undefined,
        username: undefined as string | undefined,
      }),
      isFormSent: ref(false),
      graphqlError: ref<Error>(),
    }
    const rules = {
      form: {
        username: {
          existenceNone: helpers.withAsync(
            $util.validateUsername($apollo, true)
          ),
          formatSlug: $util.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength($util.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength($util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        emailAddress: {
          email,
          formatUppercaseNone: $util.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength($util.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM),
          required,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    const refs = {
      formRef: ref<FormType>(),
    }
    const methods = {
      resetForm: () => {
        refs.formRef.value?.reset()
      },
    }
    return {
      ...data,
      ...refs,
      ...methods,
      v$,
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
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        consola.debug(error)
        return
      }

      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_REGISTRATION_MUTATION,
          variables: {
            emailAddress: this.form.emailAddress,
            language: this.$i18n.locale,
            password: this.form.password,
            username: this.form.username,
          },
        })
        .then(({ data }) => this.$util.getNested(data, 'accountRegistration'))
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('registered')
      Swal.fire({
        icon: 'success',
        text: this.$t('registrationSuccessBody') as string,
        title: this.$t('registrationSuccessTitle'),
      })
      this.resetForm()
    },
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
