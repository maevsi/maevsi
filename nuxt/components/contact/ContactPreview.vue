<template>
  <div v-if="contact" class="flex gap-4">
    <div class="relative">
      <AccountProfilePicture
        v-if="contact.accountUsername"
        classes="max-w-none"
        height="48"
        rounded
        :username="contact.accountUsername"
        width="48"
      />
      <ContactAvatar
        v-else
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
    <div class="flex flex-col justify-center items-start overflow-hidden">
      <div class="truncate font-medium">
        {{ contact.firstName }}
        {{ contact.lastName }}
      </div>
      <div
        v-if="contact.accountUsername"
        class="truncate text-gray-500 dark:text-gray-400"
      >
        <AppLink
          v-if="isUsernameLinked"
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

<script setup lang="ts">
import { Contact } from '~/gql/generated'

export interface Props {
  contact: Pick<
    Contact,
    | 'accountUsername'
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
