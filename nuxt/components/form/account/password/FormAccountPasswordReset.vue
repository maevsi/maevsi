<template>
  <Form
    :errors="api.errors"
    :form="v$.form"
    :form-class="formClass"
    :is-form-sent="isFormSent"
    :submit-name="t('accountPasswordReset')"
    @submit.prevent="submit"
  >
    <FormInputPassword
      :form-input="v$.form.password"
      :title="t('passwordNew')"
      @input="form.password = $event"
    />
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import consola from 'consola'
import Swal from 'sweetalert2'

import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { getApiMeta } from '~/plugins/util/util'
import { useAccountPasswordResetMutation } from '~/gql/generated'

export interface Props {
  formClass: string
}
withDefaults(defineProps<Props>(), {
  formClass: undefined,
})

const { t } = useI18n()
const route = useRoute()
const localePath = useLocalePath()
const passwordResetMutation = useAccountPasswordResetMutation()

// api data
const api = computed(() => {
  return {
    data: {
      ...passwordResetMutation.data.value,
    },
    ...getApiMeta([passwordResetMutation]),
  }
})
// data
const form = reactive({
  password: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  if (!form.password) throw new Error('Password is not set!')

  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  const result = await passwordResetMutation.executeMutation({
    code: route.query.code,
    password: form.password,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  if (!result.data) {
    return
  }

  Swal.fire({
    icon: 'success',
    text: t('accountPasswordResetSuccess') as string,
    timer: 3000,
    timerProgressBar: true,
    title: t('reset'),
  })
  navigateTo({
    path: localePath(`/account`),
    query: { ...route.query, tab: 'signIn' },
  })
}

// vuelidate
const rules = {
  form: {
    password: {
      minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
      required,
    },
  },
}
const v$ = useVuelidate(rules, { form })
</script>

<i18n lang="yml">
de:
  accountPasswordReset: Passwort zurücksetzen
  accountPasswordResetSuccess: Passwort erfolgreich zurückgesetzt.
  passwordNew: Neues Passwort
  postgres22023: Das Passwort ist zu kurz! Überlege dir ein längeres.
  postgresP0002: Unbekannter Zurücksetzungslink! Hast du dein Passwort vielleicht schon zurückgesetzt?
  postgres55000: Der Zurücksetzungslink ist abgelaufen!
  reset: Zurückgesetzt!
en:
  accountPasswordReset: Reset password
  accountPasswordResetSuccess: Password reset successfully.
  passwordNew: New Password
  postgres22023: This password is too short! Think of a longer one.
  postgresP0002: Invalid reset link! Have you perhaps already reset your password?
  postgres55000: Your reset link has expired!
  reset: Reset!
</i18n>
