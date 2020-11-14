<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit="deletion"
  >
    <FormInputPassword id="password" :v="$v" />
    <div class="flex flex-col items-center justify-between">
      <Button
        :disabled="
          $v.form.$invalid ||
          (form.sent && !$v.form.$anyDirty && !graphqlErrorMessage)
        "
        :icon-id="['fa', 'trash']"
        type="submit"
      >
        {{ $t('deletion', { item: itemName }) }}
      </Button>
    </div>
    <AlertGraphql
      :graphql-error-message="graphqlErrorMessage"
      :validation-object="$v.form"
      class="mt-4"
    />
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

const consola = require('consola')

export default {
  props: {
    id: {
      type: String,
      default: undefined,
    },
    itemName: {
      type: String,
      default: undefined,
    },
    mutation: {
      type: Object,
      default: undefined,
    },
    update: {
      type: Function,
      default: undefined,
    },
    variables: {
      type: Object,
      default: undefined,
    },
  },
  data() {
    return {
      form: {
        password: undefined,
        sent: undefined,
      },
      graphqlErrorMessage: undefined,
    }
  },
  methods: {
    deletion(e) {
      e.preventDefault()

      this.form.sent = true
      this.graphqlErrorMessage = undefined

      this.$v.form.$reset()
      this.$apollo
        .mutate({
          mutation: this.mutation,
          variables: {
            password: this.form.password,
            ...this.variables,
          },
          ...(this.update && { update: this.update }),
        })
        .then((_data) => {
          alert(
            this.$global.capitalizeFirstLetter(
              this.$t('success', { item: this.itemName })
            )
          )
          this.$emit('success')
        })
        .catch((error) => {
          this.graphqlErrorMessage = error.message
          consola.error(error)
        })
    },
  },
  validations() {
    return {
      form: {
        password: {
          minLength: minLength(this.$global.PASSWORD_LENGTH_MINIMUM),
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
