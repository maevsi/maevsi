<template>
  <div v-if="contact" class="flex whitespace-nowrap">
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
        class="absolute bottom-0 right-0 rounded-full bg-background-bright dark:bg-background-dark"
        :feedback="feedback"
      />
    </div>
    <div class="ml-4 flex flex-col justify-center">
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
import { defineComponent } from '#app'
import { Contact } from '~/types/contact'

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
