<template>
  <Form
    :errors="errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="$t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="v$.form.password"
      :title="$t('passwordAccount')"
      @input="form.password = $event"
    />
    <template slot="submit-icon">
      <IconTrash />
    </template>
  </Form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minLength, required } from '@vuelidate/validators'
import { CombinedError, UseMutationResponse } from '@urql/vue'
import consola from 'consola'
import Swal from 'sweetalert2'
import { toRef } from 'vue'
import { useI18n } from 'vue-i18n-composable'

import { defineComponent, PropType, reactive } from '#app'

import { capitalizeFirstLetter, getApiDataDefault } from '~/plugins/util/util'
import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'

export default defineComponent({
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<CombinedError[] | undefined>,
    },
    itemName: {
      required: true,
      type: String as PropType<string>,
    },
    mutation: {
      required: true,
      type: Object as PropType<UseMutationResponse<any, any>>,
    },
    variables: {
      default: {} as PropType<Record<string, any>>,
      type: Object as PropType<Record<string, any>>,
    },
  },
  setup(props, { emit }) {
    const { t } = useI18n()

    const apiData = getApiDataDefault()
    const data = reactive({
      form: {
        password: undefined as string | undefined,
      },
      isFormSent: false,
    })
    const rules = {
      form: {
        password: {
          minLength: minLength(VALIDATION_PASSWORD_LENGTH_MINIMUM),
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

        props.mutation
          .executeMutation({
            password: data.form.password,
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
      },
    }

    return {
      ...data,
      ...methods,
      v$,
    }
  },
})
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
