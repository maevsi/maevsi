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
      :error="$v.form.contactId.$error"
      label-for="input-contact-id"
      required
      :title="$t('contact')"
    >
      <input
        id="input-contact-id"
        v-model.trim="searchString"
        class="form-input"
        :placeholder="$t('placeholderContact')"
      />
      <div v-if="allContacts">
        <div
          v-for="contact in contactsFiltered"
          :key="contact.id"
          class="border cursor-pointer"
          :class="{
            'border-red-600': form.contactId === contact.id,
          }"
          @click="selectToggle(contact)"
        >
          <ContactPreview class="px-4 py-2" :contact="contact" />
        </div>
      </div>
      <template slot="inputError">
        <FormInputError
          :form-input="$v.form.contactId"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.contactId"
          validation-property="minLength"
        >
          {{ $t('globalValidationMinLength') }}
        </FormInputError>
        <FormInputError
          :form-input="$v.form.contactId"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormInputError>
      </template>
    </FormInput>
  </Form>
</template>

<script>
import { minLength, minValue, required } from 'vuelidate/lib/validators'

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
        contactId: undefined,
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
      this.form.contactId = contact.id

      // For multiple contact selections:
      //
      // const index = this.form.contactIds.indexOf(contact.nodeId)
      // if (index === -1) {
      //   this.form.contactIds.push(contact.nodeId)
      // } else {
      //   this.form.contactIds.splice(index, 1)
      // }
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
                this.form.contactId && this.form.contactId !== ''
                  ? +this.form.contactId
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
        contactId: {
          $each: {
            minValue: minValue(1),
            required,
          },
          minLength: minLength(1),
          required,
        },
      },
    }
  },
}
</script>

<i18n lang="yml">
de:
  contact: Kontakt
  placeholderContact: Max Mustermann
  select: Auswählen
en:
  contact: Contact
  placeholderContact: John Doe
  select: Select
</i18n>
