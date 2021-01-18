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
    <table v-if="allInvitationsComputed" class="w-full border">
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
          v-for="invitation in allInvitationsComputed"
          :key="invitation.uuid"
          :class="{
            'animate-pulse': pending.deletions.includes(invitation.uuid),
          }"
        >
          <td class="border">{{ invitation.username }}</td>
          <td class="border">{{ invitation.firstName }}</td>
          <td class="border">{{ invitation.lastName }}</td>
          <td class="border">{{ invitation.emailAddress }}</td>
          <td class="border">
            {{ (invitation.address || '').replace('\n', ', ') }}
          </td>
          <td class="border font-mono">{{ invitation.uuid }}</td>
          <td class="border font-mono">
            <div class="flex items-center justify-evenly">
              <ButtonTableInteraction
                v-if="!invitation.username"
                :disabled="pending.edits.includes(invitation.uuid)"
                :icon-id="['fas', 'edit']"
                @click="edit(invitation)"
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
      ref="modal"
      cancellable
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
      },
      selectedInvitation: undefined,
    }
  },
  computed: {
    allInvitationsComputed() {
      return [
        ...this.allInvitations.nodes.map((invitation) => {
          const invitationFlattened = {
            uuid: invitation.uuid,
          }

          if (invitation.contactByContactId) {
            ;[
              'address',
              'emailAddress',
              'firstName',
              'lastName',
              'username',
            ].forEach(
              (property) =>
                (invitationFlattened[property] =
                  invitation.contactByContactId[property])
            )
          }

          return invitationFlattened
        }),
      ]
    },
  },
  methods: {
    add() {
      this.formEventInvitationHeading = this.$t('invitationAdd')
      this.selectedInvitation = undefined
      this.$refs.modal.isVisible = true
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
    },
    edit(invitation) {
      this.formEventInvitationHeading = this.$t('invitationEdit')
      this.selectedInvitation = invitation
      this.$refs.modal.isVisible = true
    },
  },
}
</script>

<i18n lang="yml">
de:
  address: 'Adresse'
  emailAddress: 'E-Mail Adresse'
  firstName: 'Vorname'
  invitationAdd: 'Einladung hinzufügen'
  invitationEdit: 'Einladung bearbeiten'
  invitationCode: 'Einladungscode'
  invitationsUsed: 'Einladungen benutzt: {amountCurrent} / {amountMaximum}'
  lastName: 'Nachname'
  save: 'Speichern'
  username: 'Nutzername'
en:
  address: 'Address'
  emailAddress: 'Email address'
  firstName: 'First name'
  invitationAdd: 'Add invitation'
  invitationEdit: 'Edit invitation'
  invitationCode: 'Invitation code'
  invitationsUsed: 'Invitations used: {amountCurrent} / {amountMaximum}'
  lastName: 'Last name'
  save: 'Save'
  username: 'Username'
</i18n>
