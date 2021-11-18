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
      {{ (contact.address || '').replace('\n', ', ') || '–' }}
    </td>
    <td class="hidden xl:table-cell">
      {{ contact.phoneNumber || '–' }}
    </td>
    <td class="hidden xl:table-cell">
      {{ contact.url || '–' }}
    </td>
    <td>
      <div class="flex items-center justify-evenly">
        <ButtonTableInteraction
          :aria-label="
            contact.authorAccountUsername !== signedInUsername
              ? $t('disabledReasonCreatorNot', {
                  authorAccountUsername: contact.authorAccountUsername,
                })
              : $t('contactEdit')
          "
          :disabled="
            contact.authorAccountUsername !== signedInUsername || isEditing
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
import { mapGetters } from 'vuex'
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
  computed: {
    ...mapGetters(['signedInUsername']),
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
