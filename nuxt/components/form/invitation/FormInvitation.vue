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
      <div class="flex">
        <input
          id="input-contact-id"
          v-model.trim="searchString"
          class="form-input rounded-r-none"
          :placeholder="$t('placeholderContact')"
          type="text"
        />
        <span
          class="
            cursor-default
            inline-flex
            items-center
            pointer-events-none
            px-3
            rounded-r
            border border-l-0 border-gray-300
            bg-gray-100
            text-gray-500
          "
        >
          <FontAwesomeIcon
            :icon="['fas', 'search']"
            :title="$t('iconSearch')"
          />
        </span>
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
    <div v-if="allContacts" class="divide-transparent divide-y-4">
      <div v-for="contact in contactsFiltered" :key="contact.id">
        <button
          class="border cursor-pointer rounded w-full"
          :class="{
            'border-2 border-indigo-600': form.contactId === contact.id,
          }"
          type="button"
          @click="selectToggle(contact)"
        >
          <ContactPreview class="px-4 py-2" :contact="contact" />
        </button>
      </div>
    </div>
  </Form>
</template>

<script lang="ts">
import { minLength, minValue, required } from 'vuelidate/lib/validators'
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitation/invitationCreate.gql'
import CONTACTS_ALL_QUERY from '~/gql/query/contact/contactsAll.gql'
import { Event } from '~/types/event'
import { Contact } from '~/types/contact'

const consola = require('consola')

export default defineComponent({
  apollo: {
    allContacts(): any {
      return {
        query: CONTACTS_ALL_QUERY,
        variables: {
          cursor: null,
          limit: this.$global.ITEMS_PER_PAGE,
          authorAccountUsername: this.$store.state.signedInUsername,
        },
        update: (data: any) => data.allContacts,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  props: {
    event: {
      required: true,
      type: Object as PropType<Event>,
    },
  },
  data() {
    return {
      form: {
        sent: false,
        contactId: undefined as string | undefined,
      },
      graphqlError: undefined as any,
      searchString: undefined as string | undefined,
    }
  },
  computed: {
    contactsFiltered(): Contact[] | undefined {
      if (!this.allContacts) {
        return undefined
      }

      if (!this.searchString || this.searchString === '') {
        return (this.allContacts as any).nodes.slice(0, 3)
      }

      const searchStringParts = this.searchString.split(' ')
      const allContactsFiltered = (this.allContacts as any).nodes.filter(
        (contact: Contact) => {
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
        }
      )

      return allContactsFiltered.slice(0, 3)
    },
  },
  methods: {
    selectToggle(contact: Contact) {
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
        .then(async () => await (this.$listeners.submitSuccess as Function)())
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
})
</script>

<i18n lang="yml">
de:
  contact: Kontakt
  iconSearch: Suche
  placeholderContact: Max Mustermann
  select: Auswählen
en:
  contact: Contact
  iconSearch: Search
  placeholderContact: John Doe
  select: Select
</i18n>
