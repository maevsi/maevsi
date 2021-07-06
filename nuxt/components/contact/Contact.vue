<template>
  <tr
    :key="contact.nodeId"
    :class="{
      'animate-pulse': isDeleting,
    }"
  >
    <td class="border">
      <AccountProfilePicture
        v-if="contact.accountUsername"
        ref="Image"
        height="48"
        rounded
        :username="contact.accountUsername"
        width="48"
      />
      <ContactAvatar
        v-else
        ref="Image"
        class="h-12 w-12"
        :email-address="contact.emailAddress"
        :email-address-hash="contact.emailAddressHash"
        rounded
        size="48"
      />
    </td>
    <td class="border">
      {{ contact.accountUsername }}
    </td>
    <td class="border">
      {{ contact.firstName }}
    </td>
    <td class="border">{{ contact.lastName }}</td>
    <td class="border">
      {{ contact.emailAddress }}
    </td>
    <td class="border">
      {{ (contact.address || '').replace('\n', ', ') }}
    </td>
    <td class="border">
      {{ contact.url }}
    </td>
    <td class="border font-mono">
      <div class="flex items-center justify-evenly">
        <ButtonTableInteraction
          :aria-label="
            contact.authorAccountUsername !== $store.state.signedInUsername
              ? $t('disabledReasonCreatorNot', {
                  authorAccountUsername: contact.authorAccountUsername,
                })
              : $t('contactEdit')
          "
          :disabled="
            contact.authorAccountUsername !== $store.state.signedInUsername ||
            isEditing
          "
          :icon-id="['fas', 'edit']"
          is-title-show
          @click="$emit('edit')"
        />
        <ButtonTableInteraction
          :aria-label="$t('contactDelete')"
          :disabled="isDeleting"
          :icon-id="['fas', 'trash']"
          is-title-show
          @click="$emit('delete')"
        />
      </div>
    </td>
  </tr>
</template>

<script>
export default {
  props: {
    contact: {
      required: true,
      type: Object,
    },
    isDeleting: {
      default: false,
      type: Boolean,
    },
    isEditing: {
      default: false,
      type: Boolean,
    },
  },
}
</script>

<i18n lang="yml">
de:
  contactEdit: Kontakt bearbeiten
  contactDelete: Kontakt löschen
  disabledReasonCreatorNot: 'Dieser Kontakt wird von {authorAccountUsername} verwaltet.'
en:
  contactEdit: Edit contact
  contactDelete: Delete contact
  disabledReasonCreatorNot: This contact is being managed by {authorAccountUsername}.
</i18n>
