<template>
  <Loader :api="api" indicator="ping">
    <div v-if="contact && account" class="flex gap-4">
      <div class="relative">
        <AccountProfilePicture
          v-if="account.id"
          :account-id="account.id"
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
      <div class="flex flex-col justify-center items-start overflow-hidden">
        <div class="truncate font-medium">
          {{ contact.firstName }}
          {{ contact.lastName }}
        </div>
        <div
          v-if="account.username"
          class="truncate text-gray-500 dark:text-gray-400"
        >
          <AppLink
            v-if="isUsernameLinked"
            :to="localePath(`/account/${account.username}`)"
          >
            {{ `@${account.username}` }}
          </AppLink>
          <div v-else>
            {{ `@${account.username}` }}
          </div>
        </div>
      </div>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import { getAccountItem } from '~/gql/documents/fragments/accountItem'
import { useAccountByIdQuery } from '~/gql/documents/queries/account/accountById'
import { ContactItemFragment } from '~/gql/generated/graphql'

export interface Props {
  contact: Pick<
    ContactItemFragment,
    'accountId' | 'emailAddress' | 'emailAddressHash' | 'firstName' | 'lastName'
  >
  feedback?: string | null
  isUsernameLinked?: boolean
}
const props = withDefaults(defineProps<Props>(), {
  feedback: undefined,
  isUsernameLinked: true,
})

const localePath = useLocalePath()

// api data
const accountByIdQuery = await useAccountByIdQuery({
  id: props.contact.accountId,
})
const account = getAccountItem(accountByIdQuery.data.value?.accountById)
const api = getApiData([accountByIdQuery])
</script>
