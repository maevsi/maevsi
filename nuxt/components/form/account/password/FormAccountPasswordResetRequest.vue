<template>
  <Form
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :submit-name="$t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      id="email-address-password-reset-request"
      :form-input="$v.form.emailAddress"
      is-required
      :title="$t('emailAddressYours')"
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { email, maxLength, required } from 'vuelidate/lib/validators'

import { defineComponent, PropType } from '#app'
import ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION from '~/gql/mutation/account/accountPasswordResetRequest.gql'

const FormAccountPasswordResetRequest = defineComponent({
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
        sent: false,
      },
      graphqlError: undefined as Error | undefined,
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
        return
      }

      const res = await this.$apollo
        .mutate({
          mutation: ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION,
          variables: {
            emailAddress: this.form.emailAddress,
            language: this.$i18n.locale,
          },
        })
        .then(({ data }) => data.accountPasswordResetRequest)
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('account-password-reset-request')
      Swal.fire({
        icon: 'success',
        text: this.$t('accountPasswordResetRequestSuccess') as string,
        title: this.$t('requestAccepted'),
      })
    },
  },
  validations() {
    return {
      form: {
        emailAddress: {
          email,
          formatUppercaseNone: this.$util.VALIDATION_FORMAT_UPPERCASE_NONE,
          maxLength: maxLength(
            this.$util.VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM
          ),
          required,
        },
      },
    }
  },
})

export default FormAccountPasswordResetRequest

export type FormAccountPasswordResetRequestType = InstanceType<
  typeof FormAccountPasswordResetRequest
>
</script>

<i18n lang="yml">
de:
  accountPasswordResetRequest: E-Mail senden
  accountPasswordResetRequestSuccess: Vergib ein neues Password über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.
  emailAddressYours: Deine E-Mail-Adresse
  postgres55000: Die E-Mail-Adresse ist noch nicht verifiziert!
  postgresP0002: Es gibt keinen Account mit dieser E-Mail-Adresse! Überprüfe deine Eingaben auf Schreibfehler.
  requestAccepted: Anfrage angenommen!
en:
  accountPasswordResetRequest: Send email
  accountPasswordResetRequestSuccess: "Set a new password using the link that you can find in the email that you'll receive shortly."
  emailAddressYours: Yeine email address
  postgres55000: The email address is not yet verified!
  postgresP0002: There is no account with this email address! Check your input for spelling mistakes.
  requestAccepted: Request accepted!
</i18n>
