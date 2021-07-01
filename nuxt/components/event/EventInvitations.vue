<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlError"
    :error-message="graphqlError ? String(graphqlError) : undefined"
  />
  <div v-else>
    <div class="overflow-auto">
      <table v-if="allInvitations" class="border w-full">
        <thead>
          <tr>
            <th class="border" scope="col">{{ $t('username') }}</th>
            <th class="border" scope="col">{{ $t('firstName') }}</th>
            <th class="border" scope="col">{{ $t('lastName') }}</th>
            <th class="border" scope="col">{{ $t('emailAddress') }}</th>
            <th class="border" scope="col">{{ $t('address') }}</th>
            <th class="border" scope="col">{{ $t('url') }}</th>
            <th class="border" scope="col">{{ $t('invitationCode') }}</th>
            <th class="border" scope="col">{{ $t('feedback') }}</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="invitation in allInvitations.nodes"
            :key="invitation.uuid"
            :class="{
              'animate-pulse': pending.deletions.includes(invitation.uuid),
            }"
          >
            <td class="border">
              {{ invitation.contactByContactId.accountUsername }}
            </td>
            <td class="border">
              {{ invitation.contactByContactId.firstName }}
            </td>
            <td class="border">{{ invitation.contactByContactId.lastName }}</td>
            <td class="border">
              {{ invitation.contactByContactId.emailAddress }}
            </td>
            <td class="border">
              {{
                (invitation.contactByContactId.address || '').replace(
                  '\n',
                  ', '
                )
              }}
            </td>
            <td class="border">
              {{ invitation.contactByContactId.url }}
            </td>
            <td class="border font-mono">{{ invitation.uuid }}</td>
            <td class="border font-mono">
              <div v-if="invitation.feedback" class="flex justify-center">
                <FontAwesomeIcon
                  :icon="['fas', getFeedbackIconId(invitation.feedback)]"
                  :title="getFeedbackTranslation(invitation.feedback)"
                />
              </div>
            </td>
            <td class="border font-mono">
              <div class="flex items-center justify-evenly">
                <ButtonTableInteraction
                  :aria-label="$t('invitationView')"
                  :icon-id="['fas', 'eye']"
                  is-title-show
                  @click="
                    $router.push({
                      path: localePath(
                        `/event/${event.authorUsername}/${event.slug}`
                      ),
                      query: { ic: invitation.uuid },
                    })
                  "
                />
                <ButtonTableInteraction
                  :aria-label="
                    invitation.contactByContactId.authorAccountUsername !==
                    $store.state.signedInUsername
                      ? $t('disabledReasonCreatorNot', {
                          authorAccountUsername:
                            invitation.contactByContactId.authorAccountUsername,
                        })
                      : $t('invitationEdit')
                  "
                  :disabled="
                    invitation.contactByContactId.authorAccountUsername !==
                      $store.state.signedInUsername ||
                    pending.edits.includes(invitation.uuid)
                  "
                  :icon-id="['fas', 'edit']"
                  is-title-show
                  @click="edit(invitation)"
                />
                <ButtonTableInteraction
                  :aria-label="
                    invitation.contactByContactId.emailAddress
                      ? $t('invitationSend')
                      : $t('disabledReasonEmailAddressNone')
                  "
                  :disabled="
                    !invitation.contactByContactId.emailAddress ||
                    pending.sends.includes(invitation.uuid)
                  "
                  :icon-id="['fas', 'paper-plane']"
                  is-title-show
                  @click="send(invitation)"
                />
                <ButtonTableInteraction
                  :aria-label="$t('invitationDelete')"
                  :disabled="pending.deletions.includes(invitation.uuid)"
                  :icon-id="['fas', 'trash']"
                  is-title-show
                  @click="deletion(invitation.uuid)"
                />
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <br />
    <Button
      :aria-label="$t('invitationAdd')"
      :disabled="
        event.inviteeCountMaximum
          ? allInvitations.totalCount >= event.inviteeCountMaximum
          : false
      "
      :icon-id="['fas', 'plus']"
      @click="add()"
    >
      {{ $t('invitationAdd') }}
    </Button>
    <p class="text-center">
      {{
        $t('invitationsUsed', {
          amountCurrent: allInvitations.totalCount,
          amountMaximum: event.inviteeCountMaximum || '∞',
        })
      }}
    </p>
    <Modal id="ModalEventInvitation">
      <h2 slot="header">
        {{ formEventInvitationHeading }}
      </h2>
      <FormEventInvitation
        ref="formEventInvitation"
        :event="event"
        :data-initial="selectedInvitation"
        @submitSuccess="submitSuccess"
      />
      <div slot="footer" />
    </Modal>
  </div>
</template>

<script>
import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete.gql'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite.gql'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll.gql'

const consola = require('consola')

export default {
  apollo: {
    allInvitations() {
      return {
        query: INVITATIONS_ALL_QUERY,
        variables: {
          eventId: +this.event.id,
        },
        update: (data) => data.allInvitations,
        error(error, _vm, _key, _type, _options) {
          this.graphqlError = error
          consola.error(error)
        },
      }
    },
  },
  props: {
    event: {
      required: true,
      type: Object,
    },
  },
  data() {
    return {
      formEventInvitationHeading: undefined,
      graphqlError: undefined,
      pending: {
        deletions: [],
        edits: [],
        sends: [],
      },
      selectedInvitation: undefined,
    }
  },
  methods: {
    add() {
      this.formEventInvitationHeading = this.$t('invitationAdd')
      this.selectedInvitation = undefined
      this.$store.commit('modalAdd', { id: 'ModalEventInvitation' })
    },
    deletion(uuid) {
      this.pending.deletions.push(uuid)
      this.graphqlError = undefined
      this.$apollo
        .mutate({
          mutation: INVITATION_DELETE_MUTATION,
          variables: {
            uuid,
          },
        })
        .then((_value) => {
          this.$apollo.queries.allInvitations &&
            this.$apollo.queries.allInvitations.refetch()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.pending.deletions.slice(this.pending.deletions.indexOf(uuid), 1)
        })
    },
    edit(invitation) {
      this.formEventInvitationHeading = this.$t('invitationEdit')
      this.selectedInvitation = invitation
      this.$store.commit('modalAdd', { id: 'ModalEventInvitation' })
    },
    getFeedbackIconId(feedback) {
      switch (feedback) {
        case 'ACCEPTED':
          return 'check-circle'
        case 'CANCELED':
          return 'times-circle'
        case null:
          return
        default:
          consola.error('Unexpected feedback type!')
      }
    },
    getFeedbackTranslation(feedback) {
      switch (feedback) {
        case 'ACCEPTED':
          return this.$t('feedbackAccepted')
        case 'CANCELED':
          return this.$t('feedbackCanceled')
        case null:
          return
        default:
          consola.error('Unexpected feedback type!')
      }
    },
    send(invitation) {
      this.pending.sends.push(invitation.uuid)
      this.graphqlError = undefined
      this.$apollo
        .mutate({
          mutation: INVITE_MUTATION,
          variables: {
            invitationId: invitation.id,
            language: this.$i18n.locale,
          },
        })
        .then((_value) => {
          this.$store.commit('modalAdd', {
            contentBody: this.$t('sendSuccess', {
              emailAddress: invitation.contactByContactId.emailAddress,
            }),
          })
          this.$apollo.queries.allInvitations &&
            this.$apollo.queries.allInvitations.refetch()
        })
        .catch((reason) => {
          this.graphqlError = reason
          consola.error(reason)
        })
        .finally(() => {
          this.pending.sends.splice(
            this.pending.sends.indexOf(invitation.uuid),
            1
          )
        })
    },
    submitSuccess() {
      this.$store.commit('modalRemove', 'ModalEventInvitation')
      this.$apollo.queries.allInvitations.refetch()
    },
  },
}
</script>

<i18n lang="yml">
de:
  address: Adresse
  disabledReasonCreatorNot: 'Dieser Kontakt wird von {authorAccountUsername} verwaltet.'
  disabledReasonEmailAddressNone: Diesem Kontakt fehlt eine E-Mail-Adresse.
  emailAddress: E-Mail Adresse
  firstName: Vorname
  feedback: Rückmeldung
  feedbackAccepted: Zugesagt
  feedbackCanceled: Abgelehnt
  invitationAdd: Einladung hinzufügen
  invitationEdit: Einladung bearbeiten
  invitationCode: Einladungscode
  invitationDelete: Einladung löschen
  invitationSend: Einladung versenden
  invitationView: Einladung anzeigen
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  lastName: Nachname
  save: Speichern
  sendSuccess: Einladung an {emailAddress} erfolgreich angefordert.
  url: Webseite
  username: Nutzername
en:
  address: Address
  disabledReasonCreatorNot: This contact is being managed by {authorAccountUsername}.
  disabledReasonEmailAddressNone: This contact is missing an email address.
  emailAddress: Email address
  firstName: First name
  feedback: Feedback
  feedbackAccepted: Accepted
  feedbackCanceled: Canceled
  invitationAdd: Add invitation
  invitationEdit: Edit invitation
  invitationCode: Invitation code
  invitationDelete: Delete invitation
  invitationSend: Send invitation
  invitationView: View invitation
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  lastName: Last name
  save: Save
  sendSuccess: Invitation to {emailAddress} requested successfully.
  url: Website
  username: Username
</i18n>
