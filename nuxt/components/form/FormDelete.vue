<template>
  <Form
    :errors="errors"
    :form="v$.form"
    :form-sent="isFormSent"
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
import consola from 'consola'
import { DocumentNode } from 'graphql'
import Swal from 'sweetalert2'
import { reactive, ref } from 'vue'

import { defineComponent, PropType, useNuxtApp } from '#app'

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
  setup() {
    const { $util } = useNuxtApp()
    const data = {
      form: reactive({
        password: undefined as string | undefined,
      }),
      isFormSent: ref(false),
    }
    const rules = {
      form: {
        password: {
          minLength: minLength($util.VALIDATION_PASSWORD_LENGTH_MINIMUM),
          required,
        },
      },
    }
    const v$ = useVuelidate(rules, data)
    return {
      ...data,
      v$,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
      } catch (error) {
        consola.debug(error)
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
