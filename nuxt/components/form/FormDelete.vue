<template>
  <Form
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :icon-id="['fa', 'trash']"
    :submit-name="$t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :form-input="$v.form.password"
      @input="form.password = $event"
    />
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import { minLength, required } from 'vuelidate/lib/validators'
import { DocumentNode } from 'graphql'

import { defineComponent, PropType } from '#app'

export default defineComponent({
  props: {
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
      graphqlError: undefined as any,
    }
  },
  methods: {
    async submit() {
      try {
        await this.$global.formPreSubmit(this)
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
          this.$swal({
            icon: 'success',
            text: this.$global.capitalizeFirstLetter(
              this.$t('success', { item: this.itemName }) as string
            ),
            title: this.$t('deleted'),
          }).then(() => this.$emit('success'))
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
  validations() {
    return {
      form: {
        password: {
          minLength: minLength(this.$global.VALIDATION_PASSWORD_LENGTH_MINIMUM),
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
  success: '{item} erfolgreich gelöscht.'
en:
  deleted: Deleted!
  deletion: 'Delete {item}'
  success: '{item} deleted successfully.'
</i18n>
