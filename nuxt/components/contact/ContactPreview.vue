<template>
  <div class="flex text-left whitespace-nowrap">
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
        class="h-12 w-12"
        :email-address="contact.emailAddress"
        :email-address-hash="contact.emailAddressHash"
        rounded
        size="48"
      />
      <InvitationFeedbackIcon
        v-if="feedback"
        class="
          absolute
          bg-white
          border-2 border-white
          bottom-0
          right-0
          rounded-full
        "
        :feedback="feedback"
      />
    </div>
    <div class="flex flex-col justify-center ml-4">
      <div class="font-medium">
        {{ contact.firstName || '–' }} {{ contact.lastName || '–' }}
      </div>
      <div v-if="contact.accountUsername" class="text-gray-500">
        {{ `@${contact.accountUsername}` }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    contact: {
      required: true,
      type: Object,
    },
    feedback: {
      default: undefined,
      type: String,
    },
  },
}
</script>
