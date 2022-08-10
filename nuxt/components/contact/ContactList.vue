<template>
  <Loader :api="api">
    <ScrollContainer
      v-if="contacts"
      :has-next-page="api.data.allContacts?.pageInfo.hasNextPage"
      @loadMore="loadMore"
    >
      <table class="border border-neutral-300 dark:border-neutral-600">
        <thead
          class="sticky top-0 z-10 bg-background-bright dark:bg-background-dark"
        >
          <tr>
            <th scope="col">
              {{ $t('contact') }}
            </th>
            <th class="hidden xl:table-cell" scope="col">
              {{ $t('emailAddress') }}
            </th>
            <th class="hidden xl:table-cell" scope="col">
              {{ $t('address') }}
            </th>
            <th class="hidden xl:table-cell" scope="col">
              {{ $t('phoneNumber') }}
            </th>
            <th class="hidden xl:table-cell" scope="col">
              {{ $t('url') }}
            </th>
            <th scope="col" />
          </tr>
        </thead>
        <tbody class="divide-y divide-neutral-300 dark:divide-neutral-600">
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
    <br />
    <ButtonColored :aria-label="$t('contactAdd')" @click="add()">
      {{ $t('contactAdd') }}
      <template slot="prefix">
        <IconPlus />
      </template>
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
  </Loader>
</template>

<script lang="ts">
import consola from 'consola'
import debounce from 'lodash-es/debounce'
import VueI18n from 'vue-i18n'

import { defineComponent, reactive, ref, useNuxtApp, watch } from '#app'

import { ITEMS_PER_PAGE_LARGE } from '~/plugins/util/constants'
import { getApiMeta } from '~/plugins/util/util'
import { useAllContactsQuery, useDeleteContactMutation } from '~/gql/generated'
import { Contact } from '~/types/contact'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  setup() {
    const { $t } = useNuxtApp()
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

    const apiData = reactive({
      api: {
        data: {
          ...contactsQuery.data.value,
        },
        ...getApiMeta([contactsQuery]),
      },
      contacts: contactsQuery.data.value?.allContacts?.nodes,
    })
    const data = reactive({
      formContactHeading: undefined as VueI18n.TranslateResult | undefined,
      pending: {
        deletions: [] as string[],
        edits: [] as string[],
      },
      selectedContact: undefined as Contact | undefined,
    })
    const methods = {
      add() {
        data.formContactHeading = $t('contactAdd')
        data.selectedContact = undefined
        store.modalAdd({ id: 'ModalContact' })
      },
      async delete_(nodeId: string) {
        data.pending.deletions.push(nodeId)
        apiData.api.errors = []
        const result = await executeMutationContactDelete({
          nodeId,
        })

        if (result.error) {
          apiData.api.errors.push(result.error)
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
        data.formContactHeading = $t('contactEdit')
        data.selectedContact = contact
        store.modalAdd({ id: 'ModalContact' })
      },
      loadMore() {
        refs.apiContactsAfter.value =
          apiData.api.data.allContacts?.pageInfo.endCursor
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
