<template>
  <Form
    v-if="event"
    :errors="$util.getGqlErrorMessages(graphqlError, this)"
    :form="v$.form"
    :form-sent="isFormSent"
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
      :value="v$.form.searchString"
      @input="form.searchString = $event"
    >
      <template slot="icon">
        <IconSearch />
      </template>
      <template slot="stateError">
        <FormInputStateError
          :form-input="v$.form.contactId"
          validation-property="required"
        >
          {{ $t('globalValidationRequired') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.contactId"
          validation-property="minLength"
        >
          {{ $t('globalValidationMinLength') }}
        </FormInputStateError>
        <FormInputStateError
          :form-input="v$.form.contactId"
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
  </Form>
</template>

<script lang="ts">
import { useVuelidate } from '@vuelidate/core'
import { minValue, required } from '@vuelidate/validators'
import consola from 'consola'
import { ApolloQueryResult } from 'apollo-client'
import { computed, reactive, ref } from 'vue'
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
  setup() {
    const data = {
      allContacts: ref<{ nodes: Array<Contact> }>(),
      form: reactive({
        contactId: undefined as string | undefined,
        searchString: undefined as string | undefined,
      }),
      isFormSent: ref(false),
      graphqlError: ref<Error>(),
    }
    const rules = {
      form: {
        contactId: {
          // $each: {
          minValue: minValue(1),
          required,
          // },
          // minLength: minLength(1),
          // required,
        },
        searchString: {},
      },
    }
    const v$ = useVuelidate(rules, data)
    const computations = {
      contactsFiltered: computed((): Contact[] | undefined => {
        if (!data.allContacts.value) {
          return undefined
        }

        if (!data.form.searchString || data.form.searchString === '') {
          return data.allContacts.value.nodes
        }

        const searchStringParts = data.form.searchString?.split(' ')
        const allContactsFiltered = data.allContacts.value.nodes.filter(
          (contact: Contact) => {
            for (const contactProperty of [
              ...(contact.accountUsername
                ? [contact.accountUsername.toLowerCase()]
                : []),
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
      }),
    }
    return {
      ...computations,
      ...data,
      v$,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
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
        consola.debug(error)
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
})
</script>

<i18n lang="yml">
de:
  buttonContact: Ein Kontakt
  contact: Kontakt
  contactsAdd: Zu meinem Kontaktbuch
  formHint: Suche nach Kontakten aus deinem Kontaktbuch.
  placeholderContact: Max Mustermann
  select: Einladung ohne Versand anlegen
en:
  buttonContact: A contact
  contact: Contact
  contactsAdd: To my contact book
  formHint: Here you can search for contacts you want to invite. If a contact is missing, you must first add it to your contact book.
  placeholderContact: John Doe
  select: Add invitation without sending
</i18n>
