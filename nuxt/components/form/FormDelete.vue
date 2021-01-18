<template>
  <Form
    :graphql-error-message="graphqlErrorMessage"
    :validation-object="$v.form"
    @submit.prevent="submit"
  >
    <FormInputPassword
      id="password"
      :v="$v"
      @input="$v.form['password'].$model = $event"
    />
    <div class="flex flex-col items-center justify-between">
      <ButtonSubmit
        :error="!!graphqlErrorMessage"
        :form="$v.form"
        :form-sent="form.sent"
        :icon-id="['fa', 'trash']"
      >
        {{ $t('deletion', { item: itemName }) }}
      </ButtonSubmit>
    </div>
    <CardAlert
      class="mt-4"
      :error-message="graphqlErrorMessage"
      :validation-object="$v.form"
    />
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
    submit() {
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
        .then((_value) => {
          alert(
            this.$global.capitalizeFirstLetter(
              this.$t('success', { item: this.itemName })
            )
          )
          this.$emit('success')
        })
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason)
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
