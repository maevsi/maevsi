<template>
  <Form
    ref="form"
    :form="$v.form"
    :form-sent="form.sent"
    :graphql-error="graphqlError"
    :submit-name="$t('select')"
    @submit.prevent="submit"
  >
    <FormInput
      :error="$v.form.contactIds.$error"
      label-for="input-contact-ids"
      required
      :title="$t('contacts')"
    >
      <input
        id="input-contact-ids"
        v-model.trim="searchString"
        class="form-input"
        :placeholder="$t('placeholderContact')"
      />
      <div v-if="allContacts">
        <div
          v-for="contact in contactsFiltered"
          :key="contact.nodeId"
          class="border cursor-pointer"
          :class="{
            'border-red-600': form.contactIds.includes(contact.nodeId),
          }"
          @click="selectToggle(contact)"
        >
          <ContactPreview class="px-4 py-2" :contact="contact" />
        </div>
      </div>
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.contactIds"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.contactIds"
          validation-property="minLength"
        >
          {{ $t('globalValidationMinLength') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.contactIds"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormInputError>
      </template>
    </FormInput>
  </Form>
</template>

<script>
import { minLength, required } from 'vuelidate/lib/validators'

import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitation/invitationCreate.gql'
import CONTACTS_ALL_QUERY from '~/gql/query/contact/contactsAll.gql'

const consola = require('consola')

export default {
  apollo: {
    allContacts() {
      return {
        query: CONTACTS_ALL_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          authorAccountUsername: this.$store.state.signedInUsername,
        },
        update: (data) => data.allContacts,
        error(error, _vm, _key, _type, _options) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
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
        contactIds: [],
      },
      graphqlError: undefined,
      searchString: undefined,
    }
  },
  computed: {
    contactsFiltered() {
      if (!this.allContacts) return

      if (!this.searchString || this.searchString === '') {
        return this.allContacts.nodes.slice(0, 3)
      }

      const searchStringParts = this.searchString.split(' ')
      const allContactsFiltered = this.allContacts.nodes.filter((contact) => {
        for (const contactProperty of [
          ...(contact.accountUsername ? [contact.accountUsername] : []),
          ...(contact.firstName ? [contact.firstName.toLowerCase()] : []),
          ...(contact.lastName ? [contact.lastName.toLowerCase()] : []),
        ]) {
          for (const searchStringPart of searchStringParts) {
            if (contactProperty.includes(searchStringPart.toLowerCase())) {
              return true
            }
          }
        }

        return false
      })

      return allContactsFiltered.slice(0, 3)
    },
  },
  methods: {
    selectToggle(contact) {
      const index = this.form.contactIds.indexOf(contact.nodeId)
      if (index === -1) {
        this.form.contactIds.push(contact.nodeId)
      } else {
        this.form.contactIds.splice(index, 1)
      }
    },
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
                this.form.contactIds && this.form.contactIds !== ''
                  ? +this.form.contactIds
                  : null,
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
        contactIds: {
          $each: {
            // minValue: minValue(1),
            required,
          },
          minLength: minLength(2),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  contacts: Kontakte
  placeholderContact: Max Mustermann
  select: Auswählen
en:
  contacts: Contacts
  placeholderContact: John Doe
  select: Select
</i18n>
