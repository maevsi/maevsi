<template>
  <Loader :api="api">
    <div class="flex flex-col gap-4">
      <ScrollContainer
        v-if="contacts"
        class="max-h-[70vh]"
        :has-next-page="!!api.data.allContacts?.pageInfo.hasNextPage"
        @load-more="after = api.data.allContacts?.pageInfo.endCursor"
      >
        <table>
          <LayoutThead>
            <tr>
              <th scope="col">
                {{ t('contact') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('emailAddress') }}
              </th>
              <!-- <th class="hidden xl:table-cell" scope="col">
                {{ t('address') }}
              </th> -->
              <th class="hidden xl:table-cell" scope="col">
                {{ t('phoneNumber') }}
              </th>
              <th class="hidden xl:table-cell" scope="col">
                {{ t('url') }}
              </th>
              <th scope="col" />
            </tr>
          </LayoutThead>
          <LayoutTbody>
            <ContactListItem
              v-for="contact in contacts"
              :id="contact.nodeId"
              :key="contact.nodeId"
              :contact="contact"
              :is-deleting="pending.deletions.includes(contact.nodeId)"
              :is-editing="pending.edits.includes(contact.nodeId)"
              @delete="delete_(contact.nodeId, contact.id)"
              @edit="edit(contact)"
            />
          </LayoutTbody>
        </table>
      </ScrollContainer>
      <div class="flex justify-center">
        <ButtonColored :aria-label="t('contactAdd')" @click="add()">
          {{ t('contactAdd') }}
          <template #prefix>
            <IHeroiconsPlus />
          </template>
        </ButtonColored>
      </div>
      <Modal id="ModalContact" is-footer-hidden @close="onModalContactClose">
        <FormContact
          :contact="selectedContact"
          @submit-success="onContactSubmitSuccess"
        />
        <template #header>
          {{ formContactHeading }}
        </template>
      </Modal>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import { useDeleteContactByIdMutation } from '~~/gql/documents/mutations/contact/contactDeleteById'
import { useAllContactsQuery } from '~~/gql/documents/queries/contact/contactsAll'
import type { ContactItemFragment } from '~~/gql/generated/graphql'
import { getContactItem } from '~~/gql/documents/fragments/contactItem'

const { t } = useI18n()
const store = useStore()

// refs
const after = ref<string>()

// api data
const contactsQuery = await useAllContactsQuery({
  after,
  createdBy: store.signedInAccountId,
  first: ITEMS_PER_PAGE_LARGE,
})
const deleteContactByIdMutation = useDeleteContactByIdMutation()
const api = getApiData([contactsQuery, deleteContactByIdMutation])
const contacts = computed(
  () =>
    contactsQuery.data.value?.allContacts?.nodes
      .map((x) => getContactItem(x))
      .filter(isNeitherNullNorUndefined) || [],
)

// data
const formContactHeading = ref<string>()
const pending = reactive({
  deletions: ref<string[]>([]),
  edits: ref<string[]>([]),
})
const selectedContact = ref<
  Pick<
    ContactItemFragment,
    | 'accountByAccountId'
    // | 'addressByAddressId'
    | 'emailAddress'
    | 'firstName'
    | 'id'
    | 'lastName'
    | 'nodeId'
    | 'phoneNumber'
    | 'url'
  >
>()

// methods
const add = () => {
  contactsQuery.pause()
  formContactHeading.value = t('contactAdd')
  selectedContact.value = undefined
  store.modals.push({ id: 'ModalContact' })
}
const delete_ = async (nodeId: string, id: string) => {
  pending.deletions.push(nodeId)
  await deleteContactByIdMutation.executeMutation({ id })
  pending.deletions.splice(pending.deletions.indexOf(nodeId), 1)
  // TODO: update cache, especially pagination, or reset query (https://github.com/maevsi/vibetype/issues/720)
}
const edit = (
  contact: Pick<
    ContactItemFragment,
    | 'accountByAccountId'
    // | 'addressByAddressId'
    | 'emailAddress'
    | 'firstName'
    | 'id'
    | 'lastName'
    | 'nodeId'
    | 'phoneNumber'
    | 'url'
  >,
) => {
  pending.edits.push(contact.nodeId)
  formContactHeading.value = t('contactEdit')
  selectedContact.value = contact
  store.modals.push({ id: 'ModalContact' })
}
const onContactSubmitSuccess = () => {
  store.modalRemove('ModalContact')
  after.value = undefined
  contactsQuery.resume()
}
const onModalContactClose = () => {
  if (!selectedContact.value) return

  pending.edits.splice(pending.edits.indexOf(selectedContact.value.nodeId), 1)
}
</script>

<i18n lang="yaml">
de:
  # address: Adresse
  contact: Kontakt
  contactAdd: Kontakt hinzufügen
  contactEdit: Kontakt bearbeiten
  emailAddress: E-Mail Adresse
  phoneNumber: Telefonnummer
  url: Webseite
en:
  # address: Address
  contact: Contact
  contactAdd: Add contact
  contactEdit: Kontakt bearbeiten
  emailAddress: Email address
  phoneNumber: Phone number
  url: Website
</i18n>
