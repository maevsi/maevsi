<template>
  <Loader
    v-if="($apollo.loading && !allContacts) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div class="overflow-auto">
      <table v-if="allContacts" class="border w-full">
        <thead>
          <tr>
            <th class="border" scope="col">{{ $t('avatar') }}</th>
            <th class="border" scope="col">{{ $t('username') }}</th>
            <th class="border" scope="col">{{ $t('firstName') }}</th>
            <th class="border" scope="col">{{ $t('lastName') }}</th>
            <th class="border" scope="col">{{ $t('emailAddress') }}</th>
            <th class="border" scope="col">{{ $t('address') }}</th>
            <th class="border" scope="col">{{ $t('phoneNumber') }}</th>
            <th class="border" scope="col">{{ $t('url') }}</th>
          </tr>
        </thead>
        <tbody>
          <Contact
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
    <Button
      :aria-label="$t('contactAdd')"
      :icon-id="['fas', 'plus']"
      @click="add()"
    >
      {{ $t('contactAdd') }}
    </Button>
    <Modal id="ModalContact" @close="onClose">
      <h2 slot="header">
        {{ formContactHeading }}
      </h2>
      <FormContact
        :contact="selectedContact"
        @submitSuccess="onSubmitSuccess"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import CONTACT_DELETE_MUTATION from '~/gql/mutation/contact/contactDelete.gql'
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
  data() {
    return {
      formContactHeading: undefined,
      graphqlError: undefined,
      pending: {
        deletions: [],
        edits: [],
      },
      selectedContact: undefined,
    }
  },
  methods: {
    add() {
      this.formContactHeading = this.$t('contactAdd')
      this.selectedContact = undefined
      this.$store.commit('modalAdd', { id: 'ModalContact' })
    },
    delete_(nodeId) {
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
    edit(contact) {
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
}
</script>

<i18n lang="yml">
de:
  address: Adresse
  author: Autor
  avatar: Avatar
  contactAdd: Kontakt hinzufügen
  contactEdit: Kontakt bearbeiten
  emailAddress: E-Mail Adresse
  firstName: Vorname
  lastName: Nachname
  phoneNumber: Telefonnummer
  url: Webseite
  username: Nutzername
en:
  address: Address
  author: Author
  avatar: Avatar
  contactAdd: Add contact
  contactEdit: Kontakt bearbeiten
  emailAddress: Email address
  firstName: First name
  lastName: Last name
  phoneNumber: Phone number
  url: Website
  username: Username
</i18n>
