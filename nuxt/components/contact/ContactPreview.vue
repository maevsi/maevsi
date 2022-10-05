<template>
  <div v-if="contact" class="flex gap-4">
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
    <div class="flex flex-col justify-center overflow-hidden">
      <div class="truncate font-medium">
        {{ contact.firstName || t('placeholder') }}
        {{ contact.lastName || t('placeholder') }}
      </div>
      <div class="truncate text-gray-500 dark:text-gray-400">
        <div v-if="!contact.accountUsername">
          {{ t('placeholder') }}
        </div>
        <AppLink
          v-else-if="isUsernameLinked"
          :to="localePath(`/account/${contact.accountUsername}`)"
        >
          {{ `@${contact.accountUsername}` }}
        </AppLink>
        <div v-else>
          {{ `@${contact.accountUsername}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { PropType } from 'vue'

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
    isUsernameLinked: {
      default: true,
      type: Boolean,
    },
  },
  setup() {
    const localePath = useLocalePath()
    const { t } = useI18n()

    const methods = {
      localePath,
      t,
    }

    return {
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  placeholder: –
en:
  placeholder: –
</i18n>
