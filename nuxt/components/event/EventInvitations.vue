<template>
  <Loader
    v-if="($apollo.loading && !allInvitations) || graphqlErrorMessage"
    :error-message="graphqlErrorMessage"
  />
  <div v-else>
    <span class="text-center">
      {{
        $t('invitationsUsed', {
          amountCurrent: allInvitations.totalCount,
          amountMaximum: event.inviteeCountMaximum || '∞',
        })
      }}
    </span>
    <table v-if="allInvitations" class="w-full border">
      <thead>
        <tr>
          <th class="border" scope="col">{{ $t('username') }}</th>
          <th class="border" scope="col">{{ $t('firstName') }}</th>
          <th class="border" scope="col">{{ $t('lastName') }}</th>
          <th class="border" scope="col">{{ $t('emailAddress') }}</th>
          <th class="border" scope="col">{{ $t('address') }}</th>
          <th class="border" scope="col">{{ $t('invitationCode') }}</th>
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
          <td class="border">{{ invitation.contactByContactId.firstName }}</td>
          <td class="border">{{ invitation.contactByContactId.lastName }}</td>
          <td class="border">
            {{ invitation.contactByContactId.emailAddress }}
          </td>
          <td class="border">
            {{
              (invitation.contactByContactId.address || '').replace('\n', ', ')
            }}
          </td>
          <td class="border font-mono">{{ invitation.uuid }}</td>
          <td class="border font-mono">
            <div class="flex items-center justify-evenly">
              <ButtonTableInteraction
                :disabled="
                  invitation.contactByContactId.authorAccountUsername !==
                    $store.state.signedInUsername ||
                  pending.edits.includes(invitation.uuid)
                "
                :icon-id="['fas', 'edit']"
                :title="
                  invitation.contactByContactId.authorAccountUsername !==
                  $store.state.signedInUsername
                    ? $t('disabledReasonCreatorNot', {
                        authorAccountUsername:
                          invitation.contactByContactId.authorAccountUsername,
                      })
                    : undefined
                "
                @click="edit(invitation)"
              />
              <ButtonTableInteraction
                :disabled="
                  !invitation.contactByContactId.emailAddress ||
                  pending.sends.includes(invitation.uuid)
                "
                :icon-id="['fas', 'paper-plane']"
                :title="
                  invitation.contactByContactId.emailAddress
                    ? undefined
                    : $t('disabledReasonEmailAddressNone')
                "
                @click="send(invitation)"
              />
              <ButtonTableInteraction
                :disabled="pending.deletions.includes(invitation.uuid)"
                :icon-id="['fas', 'times']"
                @click="deletion(invitation.uuid)"
              />
            </div>
          </td>
        </tr>
      </tbody>
    </table>
    <Button
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
    <Modal
      id="ModalEventInvitation"
      is-cancellable
      :is-submit-disabled="
        $refs.formEventInvitation && $refs.formEventInvitation.$v.form.$invalid
      "
      :submit-name="$t('save')"
      :submit-task-provider="() => $refs.formEventInvitation.getSubmitPromise()"
      @submitSuccess="$apollo.queries.allInvitations.refetch()"
    >
      <h2 slot="header">
        {{ formEventInvitationHeading }}
      </h2>
      <FormEventInvitation
        ref="formEventInvitation"
        :event="event"
        is-embedded
        :data-initial="selectedInvitation"
      />
    </Modal>
  </div>
</template>

<script>
import INVITATION_DELETE_MUTATION from '~/gql/mutation/invitation/invitationDelete'
import INVITE_MUTATION from '~/gql/mutation/invitation/invite'
import INVITATIONS_ALL_QUERY from '~/gql/query/invitation/invitationsAll'

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
          this.graphqlErrorMessage = error.message
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
      graphqlErrorMessage: undefined,
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
      this.graphqlErrorMessage = undefined
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
          this.graphqlErrorMessage = reason.toString()
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
    send(invitation) {
      this.pending.sends.push(invitation.uuid)
      this.graphqlErrorMessage = undefined
      this.$apollo
        .mutate({
          mutation: INVITE_MUTATION,
          variables: {
            invitationId: invitation.id,
          },
        })
        .then((_value) => {
          alert(
            this.$t('sendSuccess', {
              emailAddress: invitation.contactByContactId.emailAddress,
            })
          )
          this.$apollo.queries.allInvitations &&
            this.$apollo.queries.allInvitations.refetch()
        })
        .catch((reason) => {
          this.graphqlErrorMessage = reason.toString()
          consola.error(reason.message)
        })
        .finally(() => {
          this.pending.sends.splice(
            this.pending.sends.indexOf(invitation.uuid),
            1
          )
        })
    },
  },
}
</script>

<i18n lang="yml">
de:
  address: 'Adresse'
  disabledReasonCreatorNot: 'Dieser Kontakt wird von {authorAccountUsername} verwaltet.'
  disabledReasonEmailAddressNone: 'Diesem Kontakt fehlt eine E-Mail-Adresse.'
  emailAddress: 'E-Mail Adresse'
  firstName: 'Vorname'
  invitationAdd: 'Einladung hinzufügen'
  invitationEdit: 'Einladung bearbeiten'
  invitationCode: 'Einladungscode'
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  lastName: 'Nachname'
  save: 'Speichern'
  sendSuccess: 'Einladung an {emailAddress} erfolgreich angefordert.'
  username: 'Nutzername'
en:
  address: 'Address'
  disabledReasonCreatorNot: 'This contact is being managed by {authorAccountUsername}.'
  disabledReasonEmailAddressNone: 'This contact is missing an email address.'
  emailAddress: 'Email address'
  firstName: 'First name'
  invitationAdd: 'Add invitation'
  invitationEdit: 'Edit invitation'
  invitationCode: 'Invitation code'
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  lastName: 'Last name'
  save: 'Save'
  sendSuccess: 'Invitation to {emailAddress} requested successfully.'
  username: 'Username'
</i18n>
