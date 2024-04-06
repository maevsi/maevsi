<template>
  <Card>
    <div class="flex items-center gap-4">
      <div class="px-2">
        <AccountProfilePicture
          :account-id="accountId"
          classes="rounded-full h-12 w-12"
          height="48"
          width="48"
        />
      </div>
      <div class="flex flex-1 flex-col">
        <i18n-t keypath="message" tag="span">
          <template #username>
            <span class="font-bold">
              {{ username }}
            </span>
          </template>
        </i18n-t>
      </div>
      <div class="relative flex gap-1">
        <IHeroiconsXCircle
          class="text-gray-500 dark:text-gray-400"
          height="2.5em"
          width="2.5em"
        />
        <IHeroiconsCheckCircle
          class="text-green-500"
          height="2.5em"
          width="2.5em"
        />
      </div>
    </div>
  </Card>
</template>

<script setup lang="ts">
export interface Props {
  accountId: string
  username: string
}
withDefaults(defineProps<Props>(), {})

useI18n()
</script>

<i18n lang="yaml">
de:
  message: '{username} möchte mit dir befreundet sein'
en:
  message: '{username} wants to be your friend'
</i18n>
