<template>
  <Form
    v-if="event"
    ref="form"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="$v.form"
    :form-sent="form.sent"
    :submit-name="$t('select')"
    @submit.prevent="submit"
  >
    <div class="flex flex-col items-center gap-4">
      <span>
        {{ $t('formHint') }}
      </span>
      <ButtonColored
        :aria-label="$t('contactsAdd')"
        :to="localePath('/contact')"
      >
        {{ $t('contactsAdd') }}
        <template slot="suffix">
          <IconArrowRight />
        </template>
      </ButtonColored>
    </div>
    <FormInput
      id-label="input-contact-id"
      is-required
      :placeholder="$t('placeholderContact')"
      :title="$t('contact')"
      type="text"
      :value="$v.form.searchString"
      @input="form.searchString = $event"
    >
      <template slot="icon">
        <IconSearch />
      </template>
      <template slot="stateError">
        <FormInputStateError
          :form-input="$v.form.contactId"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.contactId"
          validation-property="minLength"
        >
          {{ $t('globalValidationMinLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="$v.form.contactId"
          validation-property="minValue"
        >
          {{ $t('globalValidationMinValue') }}
        </FormInputStateError>
      </template>
    </FormInput>
    <div v-if="allContacts" class="flex flex-col gap-2">
      <div v-for="contact in contactsFiltered" :key="contact.id">
        <Button
          :aria-label="$t('buttonContact')"
          class="w-full rounded border border-neutral-300 text-left dark:border-neutral-600"
          :class="{
            'border-2 border-blue-600 dark:border-blue-600':
              form.contactId === contact.id,
          }"
          type="button"
          @click="selectToggle(contact)"
        >
          <ContactPreview class="px-4 py-2" :contact="contact" />
        </Button>
      </div>
    </div>
    <template slot="assistance">
      <FormInputStateInfo>
        {{ $t('selectAssistance') }}
      </FormInputStateInfo>
    </template>
  </Form>
</template>

<script lang="ts">
import consola from 'consola'
import { minLength, minValue, required } from 'vuelidate/lib/validators'
import { ApolloQueryResult } from 'apollo-client'
import { mapGetters } from 'vuex'

import { defineComponent, PropType } from '#app'
import INVITATION_CREATE_MUTATION from '~/gql/mutation/invitation/invitationCreate.gql'
import CONTACTS_ALL_QUERY from '~/gql/query/contact/contactsAll.gql'
import { Event } from '~/types/event'
import { Contact } from '~/types/contact'

export default defineComponent({
  apollo: {
    allContacts(): any {
      return {
        query: CONTACTS_ALL_QUERY,
        variables: {
          authorAccountUsername: this.signedInUsername,
          first: this.$util.ITEMS_PER_PAGE_LARGE,
          offset: null,
        },
        result(result: ApolloQueryResult<any>, key: string) {
          if (
            !this.$apollo.queries.allContacts.loading &&
            result.data &&
            result.data[key].pageInfo.hasNextPage
          ) {
            this.loadMore()
          }
        },
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
      allContacts: undefined as any,
      form: {
        sent: false,
        contactId: undefined as string | undefined,
        searchString: undefined as string | undefined,
      },
      graphqlError: undefined as Error | undefined,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
    contactsFiltered(): Contact[] | undefined {
      if (!this.allContacts) {
        return undefined
      }

      if (!this.form.searchString || this.form.searchString === '') {
        return this.allContacts.nodes
      }

      const searchStringParts = this.form.searchString.split(' ')
      const allContactsFiltered = this.allContacts.nodes.filter(
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

      return allContactsFiltered
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
    loadMore() {
      this.$util.loadMore(this.$apollo, 'allContacts', this.allContacts)
    },
    async submit() {
      try {
        await this.$util.formPreSubmit(this)
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
        searchString: {},
      },
    }
  },
})
</script>

<i18n lang="yml">
de:
  buttonContact: Ein Kontakt
  contact: Kontakt
  contactsAdd: Zu meinem Kontaktbuch
  formHint: Hier kannst du nach Kontakten suchen, die du einladen möchtest. Fehlt ein Kontakt, musst du ihn zuerst deinem Kontaktbuch hinzufügen.
  placeholderContact: Max Mustermann
  select: Einladung anlegen
  selectAssistance: Die Einladung wird noch nicht versandt!
en:
  buttonContact: A contact
  contact: Contact
  contactsAdd: To my contact book
  formHint: Here you can search for contacts you want to invite. If a contact is missing, you must first add it to your contact book.
  placeholderContact: John Doe
  select: Add invitation
  selectAssistance: The invitation is not yet sent!
</i18n>
