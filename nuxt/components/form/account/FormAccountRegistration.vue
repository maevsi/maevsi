<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('register')"
    @submit.prevent="submit"
  >
    <FormInputUsername
      id="username-registration"
      :form-input="$v.form.username"
      @input="form.username = $event"
    />
    <FormInputPassword
      id="password-registration"
      :form-input="$v.form.password"
      @input="form.password = $event"
    />
    <FormInputEmailAddress
      id="email-address-registration"
      :form-input="$v.form.emailAddress"
      required
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script lang="ts">
import { email, maxLength, minLength, required } from 'vuelidate/lib/validators'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ACCOUNT_REGISTRATION_MUTATION from '~/gql/mutation/account/accountRegistration.gql'

const consola = require('consola')

const FormAccountRegistration = defineComponent({
  props: {
    formClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  data() {
    return {
      form: {
        emailAddress: undefined as string | undefined,
        password: undefined as string | undefined,
        sent: false,
        username: undefined as string | undefined,
      },
      graphqlError: undefined as any,
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
        await this.$global.formPreSubmit(this)
      } catch (error) {
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
        .then(({ data }) => this.$global.getNested(data, 'accountRegistration'))
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('registered')
      this.$swal({
        icon: 'success',
        text: this.$t('registrationSuccessBody') as string,
        title: this.$t('registrationSuccessTitle'),
      })
    },
  },
  validations() {
    return {
      form: {
        username: {
          formatSlug: this.$global.VALIDATION_FORMAT_SLUG,
          maxLength: maxLength(this.$global.VALIDATION_USERNAME_LENGTH_MAXIMUM),
          required,
        },
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
        emailAddress: {
          email,
          formatUppercaseNone: this.$global.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength(
            this.$global.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
          required,
        },
      },
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
  emailAddress: E-Mail-Adresse
  register: Registrieren
  registrationSuccessBody: Verifiziere deinen Account über den Link in der E-Mail, die du in Kürze erhalten wirst.
  registrationSuccessTitle: Registrierung erfolgreich.
en:
  emailAddress: Email address
  register: Register
  registrationSuccessBody: "Verify your account using the link in the email you'll receive shortly."
  registrationSuccessTitle: Registration successful.
</i18n>
