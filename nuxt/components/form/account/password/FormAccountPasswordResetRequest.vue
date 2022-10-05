<template>
  <Form
    :errors="api.errors"
    :form="v$.form"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="t('accountPasswordResetRequest')"
    @submit.prevent="submit"
  >
    <FormInputEmailAddress
      :form-input="v$.form.emailAddress"
      is-required
      :title="t('emailAddressYours')"
      @input="form.emailAddress = $event"
    />
  </Form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { email, maxLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'
import { PropType } from 'vue'

import {
  formPreSubmit,
  VALIDATION_EMAIL_ADDRESS_LENGTH_MAXIMUM,
  VALIDATION_FORMAT_UPPERCASE_NONE,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountPasswordResetRequestMutation } from '~/gql/generated'

const FormAccountPasswordResetRequest = defineComponent({
  props: {
    formClass: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
  setup(_props, { emit }) {
    const { locale, t } = useI18n()
    const passwordResetRequestMutation =
      useAccountPasswordResetRequestMutation()

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...passwordResetRequestMutation.data.value,
          },
          ...getApiMeta([passwordResetRequestMutation]),
        }
      }),
    }
    const data = reactive({
      form: {
        emailAddress: '',
      },
      isFormSent: false,
    })
    const rules = {
      form: {
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
      async submit() {
        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        const result = await passwordResetRequestMutation.executeMutation({
          emailAddress: data.form.emailAddress,
          language: locale.value,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
          consola.error(result.error)
        }

        if (!result.data) {
          return
        }

        emit('account-password-reset-request')
        Swal.fire({
          icon: 'success',
          text: t('accountPasswordResetRequestSuccess') as string,
          title: t('requestAccepted'),
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
  emailAddressYours: Your email address
  postgres55000: The email address is not yet verified!
  postgresP0002: There is no account with this email address! Check your input for spelling mistakes.
  requestAccepted: Request accepted!
</i18n>
