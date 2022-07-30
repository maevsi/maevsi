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
import consola from 'consola'
import Swal from 'sweetalert2'
import { minLength, required } from 'vuelidate/lib/validators'
import { DocumentNode } from 'graphql'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
    errors: {
      default: undefined,
      type: Array as PropType<string[] | undefined>,
    },
    itemName: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
    mutation: {
      default: undefined,
      type: Object as PropType<DocumentNode | undefined>,
    },
    update: {
      default: undefined,
      type: Function,
    },
    variables: {
      default: undefined,
      type: Object as PropType<Record<any, any> | undefined>,
    },
  },
  data() {
    return {
      form: {
        password: undefined as string | undefined,
        sent: false,
      },
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        return
      }

      this.$apollo
        .mutate({
          mutation: this.mutation!!,
          variables: {
            password: this.form.password,
            ...(this.variables ?? {}),
          },
          ...(this.update !== undefined ? { update: this.update } : {}),
        })
        .then((_value) => {
          Swal.fire({
            icon: 'success',
            text: this.$util.capitalizeFirstLetter(
              this.$t('success', { item: this.itemName }) as string
            ),
            timer: 3000,
            timerProgressBar: true,
            title: this.$t('deleted'),
          }).then(() => this.$emit('success'))
        })
        .catch((graphqlError) => {
          this.$emit('error', graphqlError)
          consola.error(graphqlError)
        })
    },
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
