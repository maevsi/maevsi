<template>
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
            contact.authorAccountId !== store.signedInAccountId
              ? t('disabledReasonCreatorNot', {
                  authorAccountUsername:
                    props.contact.accountByAuthorAccountId?.username,
                })
              : t('contactEdit')
          "
          :disabled="
            contact.authorAccountId !== store.signedInAccountId || isEditing
          "
          @click="emit('edit')"
        >
          <IHeroiconsPencil />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('contactDelete')"
          :disabled="
            isDeleting || contact.accountId === store.signedInAccountId
          "
          @click="emit('delete')"
        >
          <IHeroiconsTrash />
        </ButtonIcon>
      </div>
    </td>
  </tr>
</template>

<script setup lang="ts">
import type { ContactItemFragment } from '~/gql/generated/graphql'

export interface Props {
  contact: Pick<
    ContactItemFragment,
    | 'nodeId'
    | 'accountId'
    | 'accountByAccountId'
    | 'accountByAuthorAccountId'
    | 'authorAccountId'
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
