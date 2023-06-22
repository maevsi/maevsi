<template>
  <Loader :api="api" indicator="ping">
    <tr
      v-if="contact"
      :key="contact.nodeId"
      :class="{
        'animate-pulse': isDeleting,
      }"
    >
      <td>
        <ContactPreview :contact="contact" />
      </td>
      <td class="hidden xl:table-cell">
        {{ contact.emailAddress || '–' }}
      </td>
      <td class="hidden xl:table-cell">
        {{ (contact.address || '').replace(/\n/g, ', ') || '–' }}
      </td>
      <td class="hidden xl:table-cell">
        {{ contact.phoneNumber || '–' }}
      </td>
      <td class="hidden xl:table-cell">
        {{ contact.url || '–' }}
      </td>
      <td>
        <div class="flex items-center justify-evenly gap-2">
          <ButtonIcon
            :aria-label="
              contact.authorAccountId !== signedInAccountId
                ? t('disabledReasonCreatorNot', {
                    authorAccountUsername: contactAuthorAccountUsername,
                  })
                : t('contactEdit')
            "
            :disabled="
              contact.authorAccountId !== signedInAccountId || isEditing
            "
            @click="emit('edit')"
          >
            <IconPencil />
          </ButtonIcon>
          <ButtonIcon
            :aria-label="t('contactDelete')"
            :disabled="isDeleting || contact.accountId === signedInAccountId"
            @click="emit('delete')"
          >
            <IconTrash />
          </ButtonIcon>
        </div>
      </td>
    </tr>
  </Loader>
</template>

<script setup lang="ts">
import { useMaevsiStore } from '~/store'
import { ContactItemFragment } from '~/gql/generated/graphql'
import { useAccountByIdQuery } from '~/gql/documents/queries/account/accountById'
import { getAccountItem } from '~/gql/documents/fragments/accountItem'

export interface Props {
  contact: Pick<
    ContactItemFragment,
    | 'nodeId'
    | 'authorAccountId'
    | 'accountId'
    | 'emailAddress'
    | 'emailAddressHash'
    | 'firstName'
    | 'lastName'
    | 'address'
    | 'phoneNumber'
    | 'url'
  >
  isDeleting?: boolean
  isEditing?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  isDeleting: false,
  isEditing: false,
})

const emit = defineEmits<{
  edit: []
  delete: []
}>()

const store = useMaevsiStore()
const { t } = useI18n()

// api data
const contactAuthorAccountByIdQuery = useAccountByIdQuery({
  id: props.contact.accountId,
})
const contactAuthorAccountUsername = computed(
  () =>
    getAccountItem(contactAuthorAccountByIdQuery.data.value?.accountById)
      ?.username
)
const api = getApiData([contactAuthorAccountByIdQuery])

// computations
const signedInAccountId = computed(() => store.signedInAccountId)
</script>

<i18n lang="yaml">
de:
  contactEdit: Kontakt bearbeiten
  contactDelete: Kontakt löschen
  disabledReasonCreatorNot: 'Dieser Kontakt wird von {authorAccountUsername} verwaltet.'
en:
  contactEdit: Edit contact
  contactDelete: Delete contact
  disabledReasonCreatorNot: This contact is managed by {authorAccountUsername}.
</i18n>
