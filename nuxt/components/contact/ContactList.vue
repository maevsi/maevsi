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
          <template slot="prefix">
            <IconPlus />
          </template>
        </ButtonColored>
      </div>
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
  </Loader>
</template>

<script lang="ts">
import consola from 'consola'
import debounce from 'lodash-es/debounce'
import { computed, defineComponent, reactive, ref, watch } from 'vue'

import { ITEMS_PER_PAGE_LARGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'
import { useAllContactsQuery, useDeleteContactMutation } from '~/gql/generated'
import { Contact } from '~/types/contact'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  setup() {
    const { t } = useI18n()
    const store = useMaevsiStore()
    const { executeMutation: executeMutationContactDelete } =
      useDeleteContactMutation()

    const refs = {
      apiContactsAfter: ref<string>(),
    }
    const contactsQuery = useAllContactsQuery({
      variables: {
        after: refs.apiContactsAfter,
        authorAccountUsername: store.signedInUsername,
        first: ITEMS_PER_PAGE_LARGE,
      },
    })

    const apiData = {
      api: computed(() => {
        return {
          data: {
            ...contactsQuery.data.value,
          },
          ...getApiMeta([contactsQuery]),
        }
      }),
      contacts: computed(() => contactsQuery.data.value?.allContacts?.nodes),
    }
    const data = reactive({
      formContactHeading: undefined as string | undefined,
      pending: {
        deletions: [] as string[],
        edits: [] as string[],
      },
      selectedContact: undefined as Contact | undefined,
    })
    const methods = {
      add() {
        data.formContactHeading = t('contactAdd')
        data.selectedContact = undefined
        store.modalAdd({ id: 'ModalContact' })
      },
      async delete_(nodeId: string) {
        data.pending.deletions.push(nodeId)
        apiData.api.value.errors = []
        const result = await executeMutationContactDelete({
          nodeId,
        })

        if (result.error) {
          apiData.api.value.errors.push(result.error)
          consola.error(result.error)
        }

        data.pending.deletions.slice(data.pending.deletions.indexOf(nodeId), 1)

        // if (!result.data) {
        //   return
        // }
        // TODO: cache update (allContacts)
      },
      edit(contact: Contact) {
        data.pending.edits.push(contact.nodeId)
        data.formContactHeading = t('contactEdit')
        data.selectedContact = contact
        store.modalAdd({ id: 'ModalContact' })
      },
      loadMore() {
        refs.apiContactsAfter.value =
          apiData.api.value.data.allContacts?.pageInfo.endCursor
      },
      onClose() {
        if (!data.selectedContact) return

        data.pending.edits.splice(
          data.pending.edits.indexOf(data.selectedContact.nodeId),
          1
        )
      },
      onScroll(e: Event) {
        const scrollBar = e.target as Element

        if (
          scrollBar &&
          scrollBar.scrollTop + scrollBar.clientHeight >= scrollBar.scrollHeight
        ) {
          debounce(methods.loadMore, 100)()
        }
      },
      onSubmitSuccess() {
        store.modalRemove('ModalContact')
        // TODO: cache update (allContacts)
      },
      t,
    }

    watch(contactsQuery.error, (currentValue, _oldValue) => {
      if (currentValue) consola.error(currentValue)
    })

    return {
      ...apiData,
      ...data,
      ...methods,
    }
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
