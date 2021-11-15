<template>
  <Loader
    v-if="($apollo.loading && !allContacts) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div class="shadow overflow-auto border-b border-gray-200 sm:rounded-lg">
      <table v-if="allContacts" class="divide-y divide-gray-200">
        <thead>
          <tr>
            <th scope="col">
              {{ $t('contact') }}
            </th>
            <th scope="col">
              {{ $t('emailAddress') }}
            </th>
            <th scope="col">
              {{ $t('address') }}
            </th>
            <th scope="col">
              {{ $t('phoneNumber') }}
            </th>
            <th scope="col">
              {{ $t('url') }}
            </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody class="divide-y divide-gray-200">
          <ContactListItem
            v-for="contact in allContacts.nodes"
            :key="contact.nodeId"
            :contact="contact"
            :is-deleting="pending.deletions.includes(contact.nodeId)"
            :is-editing="pending.edits.includes(contact.nodeId)"
            @delete="delete_(contact.nodeId)"
            @edit="edit(contact)"
          />
        </tbody>
      </table>
    </div>
    <br />
    <ButtonColored
      :aria-label="$t('contactAdd')"
      :icon-id="['fas', 'plus']"
      @click="add()"
    >
      {{ $t('contactAdd') }}
    </ButtonColored>
    <Modal id="ModalContact" @close="onClose">
      <FormContact
        :contact="selectedContact"
        @submitSuccess="onSubmitSuccess"
      />
      <template slot="header">
        {{ formContactHeading }}
      </template>
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script lang="ts">
import { defineComponent } from '@nuxtjs/composition-api'
import VueI18n from 'vue-i18n'
import { mapGetters } from 'vuex'

import CONTACT_DELETE_MUTATION from '~/gql/mutation/contact/contactDelete.gql'
import CONTACTS_ALL_QUERY from '~/gql/query/contact/contactsAll.gql'
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
          authorAccountUsername: this.signedInUsername,
        },
        update: (data: any) => data.allContacts,
        error(error: any, _vm: any, _key: any, _type: any, _options: any) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  data() {
    return {
      formContactHeading: undefined as VueI18n.TranslateResult | undefined,
      graphqlError: undefined as any,
      pending: {
        deletions: [] as string[],
        edits: [] as string[],
      },
      selectedContact: undefined as Contact | undefined,
    }
  },
  computed: {
    ...mapGetters(['signedInUsername']),
  },
  methods: {
    add() {
      this.formContactHeading = this.$t('contactAdd')
      this.selectedContact = undefined
      this.$store.commit('modalAdd', { id: 'ModalContact' })
    },
    delete_(nodeId: string) {
      this.pending.deletions.push(nodeId)
      this.graphqlError = undefined
      this.$apollo
        .mutate({
          mutation: CONTACT_DELETE_MUTATION,
          variables: {
            nodeId,
          },
        })
        .then((_value) => {
          this.$apollo.queries.allContacts &&
            this.$apollo.queries.allContacts.refetch()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.pending.deletions.slice(
            this.pending.deletions.indexOf(nodeId),
            1
          )
        })
    },
    edit(contact: Contact) {
      this.pending.edits.push(contact.nodeId)
      this.formContactHeading = this.$t('contactEdit')
      this.selectedContact = contact
      this.$store.commit('modalAdd', { id: 'ModalContact' })
    },
    onClose() {
      if (!this.selectedContact) return

      this.pending.edits.splice(
        this.pending.edits.indexOf(this.selectedContact.nodeId),
        1
      )
    },
    onSubmitSuccess() {
      this.$store.commit('modalRemove', 'ModalContact')
      this.$apollo.queries.allContacts.refetch()
    },
  },
})
</script>

<i18n lang="yml">
de:
  address: Adresse
  author: Autor
  contact: Kontakt
  contactAdd: Kontakt hinzufügen
  contactEdit: Kontakt bearbeiten
  emailAddress: E-Mail Adresse
  phoneNumber: Telefonnummer
  url: Webseite
en:
  address: Address
  author: author
  contact: Contact
  contactAdd: Add contact
  contactEdit: Kontakt bearbeiten
  emailAddress: Email address
  phoneNumber: Phone number
  url: Website
</i18n>
