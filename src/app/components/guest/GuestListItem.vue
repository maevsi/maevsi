<template>
  <!-- <Loader :api="api" indicator="ping"> -->
  <tr
    v-if="contact"
    :class="{
      'animate-pulse': pending.deletions.includes(guest.id),
    }"
  >
    <td class="max-w-0">
      <ContactPreview :contact="contact" :feedback="guest.feedback" />
    </td>
    <td class="max-w-0">
      <div
        class="text-text-dark dark:text-text-bright flex items-center justify-evenly gap-4"
      >
        <ButtonIcon
          :aria-label="
            contact.accountId || contact.emailAddress
              ? t('guestSend')
              : t('disabledReasonEmailAddressNone')
          "
          class="hidden md:block"
          :disabled="
            (!contact.accountId && !contact.emailAddress) ||
            pending.sends.includes(guest.id)
          "
          @click="send(guest)"
        >
          <IHeroiconsPaperAirplane />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('guestLink')"
          class="hidden md:block"
          @click="copyLink(guest)"
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
                  ? t('guestSend')
                  : t('disabledReasonEmailAddressNone')
              "
              class="block md:hidden"
              :disabled="
                (!contact.accountId && !contact.emailAddress) ||
                pending.sends.includes(guest.id)
              "
              @click="send(guest)"
            >
              {{
                contact.accountId || contact.emailAddress
                  ? t('guestSend')
                  : t('disabledReasonEmailAddressNone')
              }}
              <template #prefix>
                <IHeroiconsPaperAirplane />
              </template>
            </Button>
            <Button
              :aria-label="t('guestLink')"
              class="block md:hidden"
              @click="copyLink(guest)"
            >
              {{ t('guestLink') }}
              <template #prefix>
                <IHeroiconsLink />
              </template>
            </Button>
            <Button
              v-if="event.accountByCreatedBy?.username"
              :aria-label="t('guestView')"
              @click="
                navigateTo(
                  localePath({
                    path: `/event/view/${event.accountByCreatedBy.username}/${event.slug}`,
                    query: { ic: guest.id },
                  }),
                )
              "
            >
              {{ t('guestView') }}
              <template #prefix>
                <IHeroiconsEye />
              </template>
            </Button>
            <Button
              :aria-label="t('guestDelete')"
              :disabled="pending.deletions.includes(guest.id)"
              @click="delete_(guest.id)"
            >
              {{ t('guestDelete') }}
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
import { useDeleteGuestByIdMutation } from '~~/gql/documents/mutations/guest/guestDelete'
import { useInviteMutation } from '~~/gql/documents/mutations/guest/invite'
import { getContactItem } from '~~/gql/documents/fragments/contactItem'
import type {
  EventItemFragment,
  GuestItemFragment,
} from '~~/gql/generated/graphql'

export interface Props {
  event: Pick<EventItemFragment, 'accountByCreatedBy' | 'slug'>
  guest: Pick<GuestItemFragment, 'contactByContactId' | 'feedback' | 'id'>
}
const props = withDefaults(defineProps<Props>(), {})

const { locale, t } = useI18n()
const localePath = useLocalePath()

// api data
const deleteGuestByIdMutation = useDeleteGuestByIdMutation()
const inviteMutation = useInviteMutation()
// const api = getApiData([deleteGuestByIdMutation, inviteMutation])

// data
const pending = reactive({
  deletions: ref<string[]>([]),
  edits: ref<string[]>([]),
  sends: ref<string[]>([]),
})

// methods
const copyLink = async (guest: Pick<GuestItemFragment, 'id'>) => {
  if (!import.meta.client) return

  await copyText(
    `${window.location.origin}${localePath(`guest-unlock`)}?ic=${guest.id}`,
  )

  await showToast({ title: t('copySuccess') })
}
const delete_ = async (id: string) => {
  pending.deletions.push(id)
  await deleteGuestByIdMutation.executeMutation({ id })
  pending.deletions.splice(pending.deletions.indexOf(id), 1)
}
const send = async (guest: Pick<GuestItemFragment, 'id'>) => {
  pending.sends.push(guest.id)

  const result = await inviteMutation.executeMutation({
    guestId: guest.id,
    language: locale.value,
  })

  pending.sends.splice(pending.sends.indexOf(guest.id), 1)

  if (result.error || !result.data) return

  await showToast({ title: t('sendSuccess') })
}

// computations
const contact = computed(() => getContactItem(props.guest.contactByContactId))
</script>

<i18n lang="yaml">
de:
  copySuccess: Der Einladungslink wurde in die Zwischenablage kopiert.
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  guestDelete: Einladung löschen
  guestLink: Einladungslink kopieren
  guestSend: Einladung versenden
  guestView: Einladung anzeigen
  sendSuccess: Die Einladung wurde erfolgreich per E-Mail versandt.
  # postgresP0002: Die Einladung konnte nicht versandt werden! Möglicherweise hast du aktuell keinen Zugriff auf die notwendigen Daten. Versuche die Seite neu zu laden.
en:
  copySuccess: The guest link has been copied to the clipboard.
  disabledReasonEmailAddressNone: This contact does not have an associated email address.
  guestDelete: Delete guest
  guestLink: Copy guest link
  guestSend: Send guest
  guestView: View guest
  sendSuccess: The guest was successfully sent by email.
  # postgresP0002: The guest could not be sent! You may not have access to the necessary data right now. Try reloading the page.
</i18n>
