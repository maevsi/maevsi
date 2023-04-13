<template>
  <!-- <Loader
    :api="api"
    :error-pg-ids="{
      postgresP0002: t('postgresP0002'),
    }"
  > -->
  <tr
    v-if="contact"
    :class="{
      'animate-pulse': pending.deletions.includes(invitation.uuid),
    }"
  >
    <td class="max-w-0">
      <ContactPreview :contact="contact" :feedback="invitation.feedback" />
    </td>
    <td class="max-w-0">
      <div
        class="flex items-center justify-evenly gap-4 text-text-dark dark:text-text-bright"
      >
        <ButtonIcon
          :aria-label="t('invitationSend')"
          class="hidden md:block"
          :is-loading="!pending.sends.includes(invitation.uuid)"
          @click="send(invitation)"
        >
          <IconPaperPlane />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('invitationLink')"
          class="hidden md:block"
          @click="copyLink(invitation)"
        >
          <IconLink />
        </ButtonIcon>
        <Dropdown>
          <DropdownItem
            :aria-label="t('invitationSend')"
            :is-loading="!pending.sends.includes(invitation.uuid)"
            class="block md:hidden"
            @click="send(invitation)"
          >
            <IconPaperPlane />
          </DropdownItem>
          <DropdownItem
            :aria-label="t('invitationLink')"
            class="block md:hidden"
            @click="copyLink(invitation)"
          >
            <IconLink />
          </DropdownItem>
          <DropdownItem
            :aria-label="t('invitationView')"
            @click="
              navigateTo({
                path: localePath(
                  `/event/${event.authorUsername}/${event.slug}`
                ),
                query: { ic: invitation.uuid },
              })
            "
          >
            <IconEye />
          </DropdownItem>
          <DropdownItem
            :aria-label="t('invitationDelete')"
            :disabled="pending.deletions.includes(invitation.uuid)"
            @click="delete_(invitation.id)"
          >
            <IconTrash />
          </DropdownItem>
        </Dropdown>
      </div>
    </td>
  </tr>
  <!-- </Loader> -->
</template>

<script setup lang="ts">
import { useDeleteInvitationByIdMutation } from '~/gql/documents/mutations/invitation/invitationDelete'
import { useInviteMutation } from '~/gql/documents/mutations/invitation/invite'
import { getContactItem } from '~/gql/documents/fragments/contactItem'
import {
  EventItemFragment,
  InvitationItemFragment,
} from '~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'authorUsername' | 'slug'>
  invitation: Pick<
    InvitationItemFragment,
    'contactByContactId' | 'feedback' | 'id' | 'uuid'
  >
}
const props = withDefaults(defineProps<Props>(), {})

const { locale, t } = useI18n()
const localePath = useLocalePath()

// api data
const deleteInvitationByIdMutation = useDeleteInvitationByIdMutation()
const inviteMutation = useInviteMutation()
// const api = getApiData([deleteInvitationByIdMutation, inviteMutation])

// data
const pending = reactive({
  deletions: ref<string[]>([]),
  edits: ref<string[]>([]),
  sends: ref<string[]>([]),
})

// methods
function copyLink(invitation: Pick<InvitationItemFragment, 'uuid'>): void {
  if (!process.client) return

  copyText(
    `${window.location.origin}${localePath(`/task/event/unlock`)}?ic=${
      invitation.uuid
    }`
  ).then(() => {
    showToast({ title: t('copySuccess') })
  })
}
async function delete_(id: string) {
  pending.deletions.push(id)
  await deleteInvitationByIdMutation.executeMutation({ id })
  pending.deletions.splice(pending.deletions.indexOf(id), 1)
}
async function send(invitation: any) {
  if (!contact.value) return

  if (!contact.value.accountUsername && !contact.value.emailAddress) {
    return showToast({
      icon: 'error',
      title: t('disabledReasonEmailAddressNone'),
    })
  }

  pending.sends.push(invitation.uuid)

  const result = await inviteMutation.executeMutation({
    invitationId: invitation.id,
    language: locale.value,
  })

  pending.sends.splice(pending.sends.indexOf(invitation.uuid), 1)

  if (result.error || !result.data) return

  showToast({ title: t('sendSuccess') })
}

// computations
const contact = computed(() =>
  getContactItem(props.invitation.contactByContactId)
)
</script>

<i18n lang="yaml">
de:
  copySuccess: Der Einladungslink wurde in die Zwischenablage kopiert.
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse
  invitationDelete: Einladung löschen
  invitationLink: Einladungslink kopieren
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  sendSuccess: Die Einladung wurde erfolgreich per E-Mail versandt.
  # postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
en:
  copySuccess: The invitation link has been copied to the clipboard.
  disabledReasonEmailAddressNone: This contact does not have an associated email address
  invitationDelete: Delete invitation
  invitationLink: Copy invitation link
  invitationSend: Send invitation
  invitationView: View invitation
  sendSuccess: The invitation was successfully sent by email.
  # postgresP0002: The invitation could not be sent! You may not have access to the necessary data right now. Try reloading the page.
</i18n>
