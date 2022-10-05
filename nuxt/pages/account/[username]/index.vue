<template>
  <div class="flex flex-col gap-4">
    <Breadcrumbs :prefixes="[{ name: t('accounts'), to: '..', append: true }]">
      {{ routeParamUsername }}
    </Breadcrumbs>
    <ButtonList v-if="signedInUsername === routeParamUsername">
      <ButtonColored :aria-label="t('settings')" to="settings" append>
        {{ t('settings') }}
        <template #prefix>
          <IconPencil />
        </template>
      </ButtonColored>
      <ButtonColored :aria-label="t('signOut')" @click.native="signOut">
        {{ t('signOut') }}
        <template #prefix>
          <IconSignOut />
        </template>
      </ButtonColored>
    </ButtonList>
    <div class="flex min-w-0 flex-col items-center justify-center sm:flex-row">
      <div class="sm:mr-4">
        <AccountProfilePicture
          ref="profilePicture"
          classes="h-24 rounded w-24"
          height="96"
          :username="routeParamUsername"
          width="96"
        />
      </div>
      <h2 class="max-w-full overflow-hidden text-ellipsis sm:w-auto">
        {{ routeParamUsername }}
      </h2>
    </div>
    <ButtonList>
      <ButtonColored
        :aria-label="t('eventsTheir', { name: routeParamUsername })"
        :is-primary="false"
        :to="localePath(`/event/${routeParamUsername}`)"
      >
        {{ t('eventsTheir', { name: routeParamUsername }) }}
        <template #prefix>
          <IconCalendar />
        </template>
      </ButtonColored>
    </ButtonList>
  </div>
</template>

<script lang="ts">
import { useSignOut } from '~/plugins/util/auth'
import { useMaevsiStore } from '~/store'
import { useAccountIsExistingQuery } from '~/gql/generated'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const route = useRoute()

      const accountIsExisting = useAccountIsExistingQuery({
        variables: {
          username: route.params.username as string,
        },
      }).executeQuery()

      if (
        accountIsExisting.error ||
        accountIsExisting.data.value?.accountIsExisting
      ) {
        return abortNavigation() // TODO: { statusCode: 403 }
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const { signOut } = useSignOut()
    const { t } = useI18n()
    const store = useMaevsiStore()
    const route = useRoute()
    const localePath = useLocalePath()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      routeParamUsername: route.params.username as string,
      title: route.params.username as string,
    })
    const methods = {
      localePath,
      signOut,
      t,
    }

    useHeadDefault(data.title, {
      meta: [
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'profile',
        },
        {
          hid: 'profile:username',
          property: 'profile:username',
          content: route.params.username,
        },
      ],
    })

    return {
      ...data,
      ...methods,
    }
  },
})
</script>

<i18n lang="yml">
de:
  accounts: Konten
  eventsTheir: Veranstaltungen von {name}
  settings: Bearbeiten
  signOut: Abmelden
en:
  accounts: accounts
  eventsTheir: Events by {name}
  settings: Edit
  signOut: Sign out
</i18n>
