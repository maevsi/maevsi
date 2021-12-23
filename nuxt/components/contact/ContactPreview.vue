<template>
  <div v-if="contact" class="flex text-left whitespace-nowrap">
    <div class="relative">
      <AccountProfilePicture
        v-if="contact.accountUsername"
        ref="Image"
        classes="max-w-none"
        height="48"
        rounded
        :username="contact.accountUsername"
        width="48"
      />
      <ContactAvatar
        v-else
        ref="Image"
        class="max-w-none"
        :email-address="contact.emailAddress"
        :email-address-hash="contact.emailAddressHash"
        rounded
        size="48"
      />
      <InvitationFeedbackIcon
        v-if="feedback"
        class="absolute bg-white border-2 border-white bottom-0 right-0 rounded-full"
        :feedback="feedback"
      />
    </div>
    <div class="flex flex-col justify-center ml-4">
      <div class="font-medium">
        {{ contact.firstName || $t('placeholder') }}
        {{ contact.lastName || $t('placeholder') }}
      </div>
      <div class="text-gray-500 dark:text-gray-400">
        {{
          contact.accountUsername
            ? `@${contact.accountUsername}`
            : $t('placeholder')
        }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Contact } from '~/types/contact'

import { defineComponent } from '#app'

export default defineComponent({
  props: {
    contact: {
      required: true,
      type: Object as PropType<Contact>,
    },
    feedback: {
      default: undefined,
      type: String as PropType<string | undefined>,
    },
  },
})
</script>

<i18n lang="yml">
de:
  placeholder: –
en:
  placeholder: –
</i18n>
