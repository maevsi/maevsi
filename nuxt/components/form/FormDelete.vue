<template>
  <Form
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error-message="graphqlErrorMessage"
    :icon-id="['fa', 'trash']"
    :submit-name="$t('deletion', { item: itemName })"
    @submit.prevent="submit"
  >
    <FormInputPassword id="password" :v="$v" @input="form.password = $event" />
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

const consola = require('consola')

export default {
  props: {
    id: {
      default: undefined,
      type: String,
    },
    itemName: {
      default: undefined,
      type: String,
    },
    mutation: {
      default: undefined,
      type: Object,
    },
    update: {
      default: undefined,
      type: Function,
    },
    variables: {
      default: undefined,
      type: Object,
    },
  },
  data() {
    return {
      form: {
        password: undefined,
        sent: false,
      },
      graphqlErrorMessage: undefined,
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
          mutation: this.mutation,
          variables: {
            password: this.form.password,
            ...this.variables,
          },
          ...(this.update && { update: this.update }),
        })
        .then((_value) => {
          this.$store.commit('modalAdd', {
            contentBody: this.$global.capitalizeFirstLetter(
              this.$t('success', { item: this.itemName })
            ),
          })
          this.$emit('success')
        })
        .catch((reason) => {
          this.graphqlErrorMessage = reason
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
}
</script>

<i18n lang="yml">
de:
  deletion: '{item} löschen'
  success: '{item} erfolgreich gelöscht.'
en:
  deletion: 'Delete {item}'
  success: '{item} deleted successfully.'
</i18n>
