<template>
  <div v-if="contact" class="flex min-w-0 flex-1 gap-4">
    <div class="relative">
      <AccountProfilePicture
        v-if="contact.accountId"
        :account-id="contact.accountId"
        classes="rounded-full h-12 w-12"
        height="48"
        width="48"
      />
      <ContactAvatar
        v-else
        classes="rounded-full h-12 w-12"
        :email-address="contact.emailAddress"
        :email-address-hash="contact.emailAddressHash"
        size="48"
      />
      <InvitationFeedbackIcon
        v-if="feedback"
        class="absolute bottom-0 right-0 rounded-full bg-background-bright dark:bg-background-dark"
        :feedback="feedback"
      />
    </div>
    <div class="flex flex-col items-start justify-center overflow-hidden">
      <span class="truncate font-medium">
        {{ contact.firstName }}
        {{ contact.lastName }}
      </span>
      <div
        v-if="contact.accountByAccountId?.username"
        class="truncate text-gray-500 dark:text-gray-400"
      >
        <AppLink
          v-if="isUsernameLinked"
          :to="
            localePath(`/account/view/${contact.accountByAccountId.username}`)
          "
        >
          {{ `@${contact.accountByAccountId.username}` }}
        </AppLink>
        <div v-else>
          {{ `@${contact.accountByAccountId.username}` }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { ContactItemFragment } from '~/gql/generated/graphql'

export interface Props {
  contact: Pick<
    ContactItemFragment,
    | 'accountId'
    | 'accountByAccountId'
    | 'accountByAuthorAccountId'
    | 'emailAddress'
    | 'emailAddressHash'
    | 'firstName'
    | 'lastName'
  >
  feedback?: string | null
  isUsernameLinked?: boolean
}
withDefaults(defineProps<Props>(), {
  feedback: undefined,
  isUsernameLinked: true,
})

const localePath = useLocalePath()
</script>
