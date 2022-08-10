<template>
  <Form
    :errors="api.errors"
    :form="$v.form"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="$t('accountPasswordReset')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="$v.form.password"
      :title="$t('passwordNew')"
      @input="form.password = $event"
    />
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import Swal from 'sweetalert2'
import { minLength, required } from 'vuelidate/lib/validators'

import { defineComponent, reactive, useNuxtApp, useRoute } from '#app'

import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountPasswordResetMutation } from '~/gql/generated'

const FormAccountPasswordReset = defineComponent({
  props: {
    formClass: {
      default: undefined,
      type: String,
    },
  },
  setup() {
    const { $router, $t, localePath } = useNuxtApp()
    const route = useRoute()
    const passwordResetMutation = useAccountPasswordResetMutation()

    const apiData = reactive({
      api: {
        data: {
          ...passwordResetMutation.data.value,
        },
        ...getApiMeta([passwordResetMutation]),
      },
    })
    const data = reactive({
      form: {
        password: '',
      },
      isFormSent: false,
    })
    const methods = {
      async submit() {
        try {
          await formPreSubmit(this)
        } catch (error) {
          return
        }

        const result = await passwordResetMutation.executeMutation({
          code: route.query.code,
          password: data.form.password,
        })

        if (result.error) {
          apiData.api.errors.push(result.error)
          consola.error(result.error)
        }

        if (!result.data) {
          return
        }

        Swal.fire({
          icon: 'success',
          text: $t('accountPasswordResetSuccess') as string,
          timer: 3000,
          timerProgressBar: true,
          title: $t('reset'),
        })
        $router.push({
          path: localePath(`/account`),
          query: { ...route.query, tab: 'signIn' },
        })
      },
    }

    return {
      ...apiData,
      ...data,
      ...methods,
    }
  },
  validations() {
    return {
      form: {
        password: {
          minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
  },
})

export default FormAccountPasswordReset

export type FormAccountPasswordResetType = InstanceType<
  typeof FormAccountPasswordReset
>
</script>

<i18n lang="yml">
de:
  accountPasswordReset: Passwort zurücksetzen
  accountPasswordResetSuccess: Passwort erfolgreich zurückgesetzt.
  passwordNew: Neues Passwort
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgresP0002: Unbekannter Zurücksetzungscode! Hast du dein Passwort vielleicht schon zurückgesetzt?
  postgres55000: Der Zurücksetzungscode ist abgelaufen!
  reset: Zurückgesetzt!
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
  passwordNew: New Password
  postgres22023: The password is too short! Think about a longer one.
  postgresP0002: Unknown reset code! Have you perhaps already reset your password?
  postgres55000: The reset code has expired!
  reset: Reset!
</i18n>
