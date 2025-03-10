<template>
  <Loader :api="api" indicator="ping">
    <div class="flex flex-col gap-4">
      <LayoutPageTitle :title="routeParamUsername" />
      <div
        class="flex min-w-0 flex-col items-center justify-center sm:flex-row"
      >
        <AccountProfilePicture
          :account-id="account?.id"
          classes="h-48 rounded-sm w-48"
          height="192"
          width="192"
        />
      </div>
      <div class="flex justify-center">
        <UnderConstruction>
          <ButtonColored
            v-if="store.signedInUsername !== routeParamUsername"
            :aria-label="t('friendAdd')"
            disabled
          >
            {{ t('friendAdd') }}
          </ButtonColored>
        </UnderConstruction>
      </div>
      <CardButton
        :title="t('eventsTheir', { name: routeParamUsername })"
        :to="
          localePath({
            name: 'event-view-username',
            params: { username: routeParamUsername },
          })
        "
      >
        <IHeroiconsCalendar />
      </CardButton>
      <div class="flex flex-col gap-2">
        <UnderConstruction>
          <span class="text-xl font-bold">
            {{ t('friends') }}
          </span>
          <!-- @vue-ignore -->
          <CardButton
            class="relative"
            is-disabled
            :to="`/friend/view/$username`"
          >
            <div class="isolate flex -space-x-2 overflow-hidden p-1">
              <AccountProfilePicture
                account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
                classes="rounded-full ring-3 ring-background-brighten dark:ring-background-darken"
                height="64"
                width="64"
              />
              <AccountProfilePicture
                account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
                classes="rounded-full ring-3 ring-background-brighten dark:ring-background-darken"
                height="64"
                width="64"
              />
              <AccountProfilePicture
                account-id="d3d7f2d0-bbf5-46aa-84ba-82ccf3c6af6b"
                classes="rounded-full ring-3 ring-background-brighten dark:ring-background-darken"
                height="64"
                width="64"
              />
            </div>
          </CardButton>
        </UnderConstruction>
      </div>
      <div class="flex flex-col gap-2">
        <span class="text-xl font-bold">
          {{ t('achievements') }}
        </span>
        <!-- @vue-ignore -->
        <CardButton
          class="relative"
          is-disabled
          :to="`/achievement/view/$username`"
        >
          <div
            v-if="
              achievements.filter(
                (achievement) =>
                  achievement.achievement === AchievementType.MeetTheTeam,
              ).length
            "
            class="flex gap-2 text-center"
          >
            <div class="flex flex-1 flex-col items-center gap-2 p-2">
              <div class="relative">
                <IMaterialSymbolsHexagonOutline height="4em" width="4em" />
                <div class="absolute inset-0 flex items-center justify-center">
                  <IFa6SolidHandshake height="1.5em" width="1.5em" />
                </div>
              </div>
              <span class="text-gray-700 dark:text-gray-300">
                {{ t('achievementMeetTheTeam') }}
              </span>
            </div>
          </div>
          <span v-else>
            {{ t('achievementsNone') }}
          </span>
        </CardButton>
      </div>
    </div>
  </Loader>
</template>

<script setup lang="ts">
import type { RouteLocationNormalized } from 'vue-router'
import type { RouteNamedMap } from 'vue-router/auto-routes'

import { getAccountItem } from '~~/gql/documents/fragments/accountItem'
import { getAchievementItem } from '~~/gql/documents/fragments/achievementItem'
import { useAccountByUsernameQuery } from '~~/gql/documents/queries/account/accountByUsername'
import { useAllAchievementsQuery } from '~~/gql/documents/queries/achievement/achievementsAll'
import { AchievementType } from '~~/gql/generated/graphql'

const ROUTE_NAME: keyof RouteNamedMap = 'account-view-username___en'

definePageMeta({
  async validate(route) {
    return await validateAccountExistence({
      route: route as RouteLocationNormalized<typeof ROUTE_NAME>,
    })
  },
})

const { t } = useI18n()
const route = useRoute(ROUTE_NAME)
const localePath = useLocalePath()
const store = useStore()

// api data
const accountByUsernameQuery = await zalgo(
  useAccountByUsernameQuery({
    username: route.params.username,
  }),
)
const account = getAccountItem(
  accountByUsernameQuery.data.value?.accountByUsername,
)
const achievementsQuery = await useAllAchievementsQuery({
  accountId: account?.id,
})
const achievements =
  achievementsQuery.data.value?.allAchievements?.nodes
    .map((x) => getAchievementItem(x))
    .filter(isNeitherNullNorUndefined) || []
const api = getApiData([accountByUsernameQuery, achievementsQuery])

// data
const routeParamUsername = route.params.username
const title = route.params.username

// initialization
useHeadDefault({
  title,
  extension: {
    ogType: 'profile',
    profileUsername: route.params.username,
  },
})
</script>

<i18n lang="yaml">
de:
  achievements: Errungenschaften
  achievementsNone: Noch keine freigeschaltet
  achievementMeetTheTeam: Triff das Team
  eventsTheir: Veranstaltungen von {name}
  friendAdd: Freundschaftsanfrage senden
  friends: Freunde
en:
  achievements: Achievements
  achievementsNone: None unlocked yet
  achievementMeetTheTeam: Meet the team
  eventsTheir: Events by {name}
  friends: Friends
  friendAdd: Send friend request
</i18n>
