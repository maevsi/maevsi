<template>
  <Form
    :errors="errors"
    :form="v$.form"
    :is-form-sent="isFormSent"
    :submit-name="t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="v$.form.password"
      :title="t('passwordAccount')"
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
import {
  AnyVariables,
  CombinedError,
  OperationContext,
  OperationResult,
} from '@urql/vue'
import consola from 'consola'
import Swal from 'sweetalert2'
import { toRef, defineComponent, PropType, reactive } from 'vue'

import { capitalizeFirstLetter, getApiDataDefault } from '~/plugins/util/util'
import {
  formPreSubmit,
  VALIDATION_PASSWORD_LENGTH_MINIMUM,
} from '~/plugins/util/validation'
import { Exact, EventDeleteMutation } from '~~/gql/generated'

export default defineComponent({
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<
        (CombinedError | { errcode: string; message: string })[] | undefined
      >,
    },
    itemName: {
      required: true,
      type: String as PropType<string>,
    },
    mutation: {
      required: true,
      type: Function as PropType<
        (
          variables: Exact<any>,
          context?: Partial<OperationContext> | undefined
        ) => Promise<OperationResult<EventDeleteMutation, AnyVariables>>
      >,
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
        if (!data.form.password) return

        try {
          await formPreSubmit(apiData, v$, toRef(data, 'isFormSent'))
        } catch (error) {
          consola.debug(error)
          return
        }

        props
          .mutation({
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
      t,
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
