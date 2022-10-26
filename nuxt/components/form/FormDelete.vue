<template>
  <Form
    :errors="errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      :form-input="v$.form.password"
      :title="t('passwordAccount')"
      @input="form.password = $event"
    />
    <template #submit-icon>
      <IconTrash />
    </template>
  </Form>
</template>

<script setup lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import {
  AnyVariables,
  CombinedError,
  OperationContext,
  OperationResult,
} from '@urql/vue'
import consola from 'consola'
import Swal from 'sweetalert2'

import { capitalizeFirstLetter, getApiDataDefault } from '~/plugins/util/util'
import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { Exact, EventDeleteMutation } from '~/gql/generated'

export interface Props {
  errors?: (CombinedError | { errcode: string; message: string })[]
  itemName: string
  mutation: (
    variables: Exact<any>,
    context?: Partial<OperationContext> | undefined
  ) => Promise<OperationResult<EventDeleteMutation, AnyVariables>>
  variables?: Record<string, any>
}
const props = withDefaults(defineProps<Props>(), {
  errors: undefined,
  variables: undefined,
})

const emit = defineEmits<{
  (e: 'success'): void
  (e: 'error', error: CombinedError): void
}>()

const { t } = useI18n()

// api data
const api = getApiDataDefault().api

// data
const form = reactive({
  password: ref<string>(),
})
const isFormSent = ref(false)

// methods
async function submit() {
  if (!form.password) return

  try {
    await formPreSubmit({ api }, v$, isFormSent)
  } catch (error) {
    consola.debug(error)
    return
  }

  props
    .mutation({
      password: form.password,
      ...props.variables,
    })
    .then((result) => {
      if (result.error) {
        emit('error', result.error)
        consola.error(result.error)
      } else {
        Swal.fire({
          icon: 'success',
          text: capitalizeFirstLetter(
            t('success', {
              item: props.itemName,
            }) as string
          ),
          timer: 3000,
          timerProgressBar: true,
          title: t('deleted'),
        }).then(() => emit('success'))
      }
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
  deleted: Gelöscht!
  deletion: '{item} löschen'
  passwordAccount: Konto-Passwort
  success: '{item} erfolgreich gelöscht.'
en:
  deleted: Deleted!
  deletion: 'Delete {item}'
  passwordAccount: Account password
  success: '{item} deleted successfully.'
</i18n>
