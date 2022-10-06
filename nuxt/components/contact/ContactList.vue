<template>
  <Loader :api="api">
    <div class="flex flex-col gap-4">
      <ScrollContainer
        v-if="contacts"
        :has-next-page="!!api.data.allContacts?.pageInfo.hasNextPage"
        @loadMore="loadMore"
      >
        <table>
          <thead>
            <tr>
              <th scope="col">
                {{ t('contact') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('emailAddress') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('address') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('phoneNumber') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('url') }}
              </th>
              <th scope="col" />
            </tr>
          </thead>
          <tbody>
            <ContactListItem
              v-for="contact in contacts"
              :id="contact.nodeId"
              :key="contact.nodeId"
              :contact="contact"
              :is-deleting="pending.deletions.includes(contact.nodeId)"
              :is-editing="pending.edits.includes(contact.nodeId)"
              @delete="delete_(contact.nodeId)"
              @edit="edit(contact)"
            />
          </tbody>
        </table>
      </ScrollContainer>
      <div class="flex justify-center">
        <ButtonColored :aria-label="t('contactAdd')" @click="add()">
          {{ t('contactAdd') }}
          <template #prefix>
            <IconPlus />
          </template>
        </ButtonColored>
      </div>
      <Modal id="ModalContact" @close="onClose">
        <FormContact
          :contact="selectedContact"
          @submitSuccess="onSubmitSuccess"
        />
        <template #header>
          {{ formContactHeading }}
        </template>
        <template #footer />
      </Modal>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import consola from 'consola'

import { ITEMS_PER_PAGE_LARGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'
import { useAllContactsQuery, useDeleteContactMutation } from '~/gql/generated'
import { Contact } from '~/types/contact'
import { useMaevsiStore } from '~/store'

const { t } = useI18n()
const store = useMaevsiStore()
const { executeMutation: executeMutationContactDelete } =
  useDeleteContactMutation()

// refs
const after = ref<string>()

const contactsQuery = useAllContactsQuery({
  variables: {
    after,
    authorAccountUsername: store.signedInUsername,
    first: ITEMS_PER_PAGE_LARGE,
  },
})

// api data
const api = computed(() => {
  return {
    data: {
      ...contactsQuery.data.value,
    },
    ...getApiMeta([contactsQuery]),
  }
})
const contacts = computed(() => contactsQuery.data.value?.allContacts?.nodes)

// data
const formContactHeading = ref<string>()
const pending = reactive({
  deletions: ref<string[]>([]),
  edits: ref<string[]>([]),
})
const selectedContact = ref<Contact>()

// methods
function add() {
  formContactHeading.value = t('contactAdd')
  selectedContact.value = undefined
  store.modalAdd({ id: 'ModalContact' })
}
async function delete_(nodeId: string) {
  pending.deletions.push(nodeId)
  api.value.errors = []
  const result = await executeMutationContactDelete({
    nodeId,
  })

  if (result.error) {
    api.value.errors.push(result.error)
    consola.error(result.error)
  }

  pending.deletions.slice(pending.deletions.indexOf(nodeId), 1)

  // if (!result.data) {
  //   return
  // }
  // TODO: cache update (allContacts)
}
function edit(contact: Contact) {
  pending.edits.push(contact.nodeId)
  formContactHeading.value = t('contactEdit')
  selectedContact.value = contact
  store.modalAdd({ id: 'ModalContact' })
}
function loadMore() {
  after.value = api.value.data.allContacts?.pageInfo.endCursor
}
function onClose() {
  if (!selectedContact.value) return

  pending.edits.splice(pending.edits.indexOf(selectedContact.value.nodeId), 1)
}
function onSubmitSuccess() {
  store.modalRemove('ModalContact')
  // TODO: cache update (allContacts)
}

// lifecycle
watch(contactsQuery.error, (currentValue, _oldValue) => {
  if (currentValue) consola.error(currentValue)
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
