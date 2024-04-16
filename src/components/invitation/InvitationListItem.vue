<template>
  <!-- <Loader :api="api" indicator="ping"> -->
  <tr
    v-if="contact"
    :class="{
      'animate-pulse': pending.deletions.includes(invitation.id),
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
          :aria-label="
            contact.accountId || contact.emailAddress
              ? t('invitationSend')
              : t('disabledReasonEmailAddressNone')
          "
          class="hidden md:block"
          :disabled="
            (!contact.accountId && !contact.emailAddress) ||
            pending.sends.includes(invitation.id)
          "
          @click="send(invitation)"
        >
          <IHeroiconsPaperAirplane />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('invitationLink')"
          class="hidden md:block"
          @click="copyLink(invitation)"
        >
          <IHeroiconsLink />
        </ButtonIcon>
        <DropDown>
          <ButtonIcon :aria-label="t('globalShowMore')">
            <IHeroiconsEllipsisVertical />
          </ButtonIcon>
          <template #content>
            <Button
              :aria-label="
                contact.accountId || contact.emailAddress
                  ? t('invitationSend')
                  : t('disabledReasonEmailAddressNone')
              "
              class="block md:hidden"
              :disabled="
                (!contact.accountId && !contact.emailAddress) ||
                pending.sends.includes(invitation.id)
              "
              @click="send(invitation)"
            >
              {{
                contact.accountId || contact.emailAddress
                  ? t('invitationSend')
                  : t('disabledReasonEmailAddressNone')
              }}
              <template #prefix>
                <IHeroiconsPaperAirplane />
              </template>
            </Button>
            <Button
              :aria-label="t('invitationLink')"
              class="block md:hidden"
              @click="copyLink(invitation)"
            >
              {{ t('invitationLink') }}
              <template #prefix>
                <IHeroiconsLink />
              </template>
            </Button>
            <Button
              v-if="event.accountByAuthorAccountId?.username"
              :aria-label="t('invitationView')"
              @click="
                navigateTo(
                  localePath({
                    path: `/event/view/${event.accountByAuthorAccountId.username}/${event.slug}`,
                    query: { ic: invitation.id },
                  }),
                )
              "
            >
              {{ t('invitationView') }}
              <template #prefix>
                <IHeroiconsEye />
              </template>
            </Button>
            <Button
              :aria-label="t('invitationDelete')"
              :disabled="pending.deletions.includes(invitation.id)"
              @click="delete_(invitation.id)"
            >
              {{ t('invitationDelete') }}
              <template #prefix>
                <IHeroiconsTrash />
              </template>
            </Button>
          </template>
        </DropDown>
      </div>
    </td>
  </tr>
  <!-- </Loader> -->
</template>

<script setup lang="ts">
import { useDeleteInvitationByIdMutation } from '~/gql/documents/mutations/invitation/invitationDelete'
import { useInviteMutation } from '~/gql/documents/mutations/invitation/invite'
import { getContactItem } from '~/gql/documents/fragments/contactItem'
import type {
  EventItemFragment,
  InvitationItemFragment,
} from '~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'accountByAuthorAccountId' | 'slug'>
  invitation: Pick<
    InvitationItemFragment,
    'contactByContactId' | 'feedback' | 'id'
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
const copyLink = async (invitation: Pick<InvitationItemFragment, 'id'>) => {
  if (!import.meta.client) return

  await copyText(
    `${window.location.origin}${localePath(`/invitation/unlock`)}?ic=${
      invitation.id
    }`,
  )

  showToast({ title: t('copySuccess') })
}
const delete_ = async (id: string) => {
  pending.deletions.push(id)
  await deleteInvitationByIdMutation.executeMutation({ id })
  pending.deletions.splice(pending.deletions.indexOf(id), 1)
}
const send = async (invitation: Pick<InvitationItemFragment, 'id'>) => {
  pending.sends.push(invitation.id)

  const result = await inviteMutation.executeMutation({
    invitationId: invitation.id,
    language: locale.value,
  })

  pending.sends.splice(pending.sends.indexOf(invitation.id), 1)

  if (result.error || !result.data) return

  showToast({ title: t('sendSuccess') })
}

// computations
const contact = computed(() =>
  getContactItem(props.invitation.contactByContactId),
)
</script>

<i18n lang="yaml">
de:
  copySuccess: Der Einladungslink wurde in die Zwischenablage kopiert.
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  invitationDelete: Einladung löschen
  invitationLink: Einladungslink kopieren
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  sendSuccess: Die Einladung wurde erfolgreich per E-Mail versandt.
  # postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
en:
  copySuccess: The invitation link has been copied to the clipboard.
  disabledReasonEmailAddressNone: This contact does not have an associated email address.
  invitationDelete: Delete invitation
  invitationLink: Copy invitation link
  invitationSend: Send invitation
  invitationView: View invitation
  sendSuccess: The invitation was successfully sent by email.
  # postgresP0002: The invitation could not be sent! You may not have access to the necessary data right now. Try reloading the page.
</i18n>
