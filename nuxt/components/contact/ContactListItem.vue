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
      <div class="flex items-center justify-evenly gap-2">
        <ButtonIcon
          :aria-label="
            contact.authorAccountUsername !== signedInUsername
              ? t('disabledReasonCreatorNot', {
                  authorAccountUsername: contact.authorAccountUsername,
                })
              : t('contactEdit')
          "
          :disabled="
            contact.authorAccountUsername !== signedInUsername || isEditing
          "
          @click="$emit('edit')"
        >
          <IconPencil />
        </ButtonIcon>
        <ButtonIcon
          :aria-label="t('contactDelete')"
          :disabled="isDeleting || contact.accountUsername === signedInUsername"
          @click="$emit('delete')"
        >
          <IconTrash />
        </ButtonIcon>
      </div>
    </td>
  </tr>
</template>

<script lang="ts">
import { PropType } from 'vue'

import { useMaevsiStore } from '~/store'
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
  setup() {
    const store = useMaevsiStore()
    const { t } = useI18n()

    const data = reactive({
      signedInUsername: store.signedInUsername,
    })
    const methods = {
      t,
    }

    return {
      ...data,
      ...methods,
    }
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
