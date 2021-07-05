<template>
  <Form
    ref="form"
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('save')"
    @submit.prevent="submit"
  >
    <FormInput
      :error="$v.form.id.$error"
      label-for="input-id"
      required
      :title="$t('id')"
    >
      <input
        id="input-id"
        v-model.trim="$v.form.id.$model"
        class="form-input"
        type="number"
        placeholder="id"
      />
      <template slot="inputError">
        <FormInputError :form-input="$v.form.id" validation-property="required">
          {{ $t('globalValidationRequired') }}
        </FormInputError>
        <FormInputError :form-input="$v.form.id" validation-property="minValue">
          {{ $t('globalValidationMinValue') }}
        </FormInputError>
      </template>
    </FormInput>
  </Form>
</template>

<script>
import { minValue, required } from 'vuelidate/lib/validators'

import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitation/invitationCreate.gql'

const consola = require('consola')

export default {
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      form: {
        sent: false,
        id: undefined,
      },
      graphqlError: undefined,
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
          mutation: INVITATION_CREATE_MUTATION,
          variables: {
            invitationInput: {
              contactId:
                this.form.id && this.form.id !== '' ? +this.form.id : null,
              eventId: +this.event.id,
            },
          },
        })
        .then(async () => await this.$listeners.submitSuccess())
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
    },
  },
  validations() {
    return {
      form: {
        id: {
          minValue: minValue(1),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  id: Kontakt-ID
  save: Speichern
en:
  id: Contact id
  save: Save
</i18n>
