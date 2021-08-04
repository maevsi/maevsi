<template>
  <tr
    :key="contact.nodeId"
    :class="{
      'animate-pulse': isDeleting,
    }"
  >
    <td>
      <ContactPreview :contact="contact" />
    </td>
    <td>
      {{ contact.emailAddress || '–' }}
    </td>
    <td>
      {{ (contact.address || '').replace('\n', ', ') || '–' }}
    </td>
    <td>
      {{ contact.phoneNumber || '–' }}
    </td>
    <td>
      {{ contact.url || '–' }}
    </td>
    <td>
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

<script lang="ts">
import { defineComponent, PropType } from '@nuxtjs/composition-api'
import { Contact } from '~/types/contact'

export default defineComponent({
  props: {
    contact: {
      required: true,
      type: Object as PropType<Contact>,
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
})
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
