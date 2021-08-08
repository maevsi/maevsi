<template>
  <Form
    :form="$v.form"
    :form-class="formClass"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      id="email-address-password-reset-request"
      :form-input="$v.form.emailAddress"
      required
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script lang="ts">
import { email, maxLength, required } from 'vuelidate/lib/validators'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION from '~/gql/mutation/account/accountPasswordResetRequest.gql'

const consola = require('consola')

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
          mutation: ACCOUNT_PASSWORD_RESET_REQUEST_MUTATION,
          variables: {
            emailAddress: this.form.emailAddress,
            language: this.$i18n.locale,
          },
        })
        .then(({ data }) =>
          this.$global.getNested(data, 'accountPasswordResetRequest')
        )
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })

      if (!res) {
        return
      }

      this.$emit('account-password-reset-request')
      this.$store.commit('modalAdd', {
        contentBody: this.$t('accountPasswordResetRequestSuccess'),
      })
    },
  },
  validations() {
    return {
      form: {
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

export default FormAccountPasswordResetRequest

export type FormAccountPasswordResetRequestType = InstanceType<
  typeof FormAccountPasswordResetRequest
>
</script>

<i18n lang="yml">
de:
  accountPasswordResetRequest: Passwort zurücksetzen
  accountPasswordResetRequestSuccess: Anfrage zum Zurücksetzen des Passworts erfolgreich. Vergib ein neues Password über den Link, den du in der E-Mail findest, die du in Kürze erhalten wirst.
en:
  accountPasswordResetRequest: Reset password
  accountPasswordResetRequestSuccess: "Request to reset the password successful. Set a new password using the link that you can find in the email that you'll receive shortly."
</i18n>
