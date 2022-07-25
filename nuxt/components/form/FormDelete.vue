<template>
  <Form
    :errors="errors"
    :form="$v.form"
    :form-sent="form.sent"
    :submit-name="$t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="$v.form.password"
      :title="$t('passwordAccount')"
      @input="form.password = $event"
    />
    <template slot="submit-icon">
      <IconTrash />
    </template>
  </Form>
</template>

<script lang="ts">
import { useMutation } from '@urql/vue'
import consola from 'consola'
import { DocumentNode } from 'graphql'
import Swal from 'sweetalert2'
import { ref } from 'vue'
import { minLength, required } from 'vuelidate/lib/validators'

import { useNuxtApp, defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    itemName: {
      required: true,
      type: String as PropType<string>,
    },
    mutation: {
      required: true,
      type: Object as PropType<DocumentNode>,
    },
    variables: {
      default: {} as PropType<Record<string, any>>,
      type: Object as PropType<Record<string, any>>,
    },
  },
  setup(props, { emit }) {
    const nuxtApp = useNuxtApp()

    const data = {
      form: ref({
        password: ref<string>(),
        sent: ref<boolean>(),
      }),
    }

    const { executeMutation } = useMutation(props.mutation)

    const methods = {
      submit() {
        executeMutation({
          password: data.form.value.password,
          ...props.variables,
        }).then((result) => {
          if (result.error) {
            emit('error', result.error)
            consola.error(result.error)
          } else {
            Swal.fire({
              icon: 'success',
              text: nuxtApp.nuxt2Context.$util.capitalizeFirstLetter(
                nuxtApp.nuxt2Context.$t('success', {
                  item: props.itemName,
                }) as string
              ),
              timer: 3000,
              timerProgressBar: true,
              title: nuxtApp.nuxt2Context.$t('deleted'),
            }).then(() => emit('success'))
          }
        })
      },
    }

    return {
      ...data,
      ...methods,
    }
  },
  validations() {
    return {
      form: {
        password: {
          minLength: minLength(this.$util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
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
