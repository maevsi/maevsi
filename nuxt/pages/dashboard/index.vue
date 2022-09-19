<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <section class="lg:w-1/2">
          <h2>{{ t('eventsMine') }}</h2>
          <ButtonColored
            :aria-label="t('eventsMine')"
            :to="localePath(`/event/${signedInUsername}`)"
          >
            {{ t('eventsMine') }}
            <template slot="prefix">
              <IconCalendar />
            </template>
          </ButtonColored>
        </section>
        <section class="lg:w-1/2">
          <h2>{{ t('invitationsMine') }}</h2>
          <CardStateInfo>
            {{ t('invitationsMineDescription') }}
          </CardStateInfo>
        </section>
      </div>
      <div class="flex gap-4">
        <section class="lg:w-1/2">
          <h2>{{ t('contactsMine') }}</h2>
          <ButtonColored
            :aria-label="t('contactBook')"
            :to="localePath('/contact')"
          >
            {{ t('contactBook') }}
            <template slot="prefix">
              <IconAddressBook />
            </template>
          </ButtonColored>
        </section>
        <section class="lg:w-1/2">
          <h2>{{ t('uploadsMine') }}</h2>
          <ButtonColored :aria-label="t('gallery')" :to="localePath('/upload')">
            {{ t('gallery') }}
            <template slot="prefix">
              <IconImages />
            </template>
          </ButtonColored>
        </section>
      </div>
      <section>
        <h2>{{ t('news') }}</h2>
        <CardStateInfo>
          {{ t('newsDescription') }}
        </CardStateInfo>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter, navigateTo } from '#app'
import { useHead } from '#head'

import { useMaevsiStore } from '~/store'

definePageMeta({
  middleware: [
    function (_to: any, _from: any) {
      const localePath = useLocalePath()
      const store = useMaevsiStore()

      if (store.jwtDecoded?.role === 'maevsi_anonymous') {
        return navigateTo(localePath('/'))
      }
    },
  ],
})

export default defineComponent({
  name: 'IndexPage',
  setup() {
    const router = useRouter()
    const { t } = useI18n()
    const store = useMaevsiStore()
    const localePath = useLocalePath()

    const data = reactive({
      signedInUsername: store.signedInUsername,
      title: t('title'),
    })
    const methods = {
      localePath,
      t,
    }

    useHead({
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: data.title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            router.currentRoute.value.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: data.title,
        },
      ],
      title: data.title,
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
  contactBook: Kontaktbuch
  contactsMine: Meine Kontake
  dashboard: Dashboard
  eventsMine: Meine Veranstaltungen
  eventsMineDescription: Hier wirst du bald deine Veranstaltungen sehen.
  gallery: Bildergalerie
  invitationsMine: Meine Einladungen
  invitationsMineDescription: Hier wirst du bald die Veranstaltungen sehen, zu denen du eingeladen bist.
  news: Ereignisverlauf
  newsDescription: Hier wirst du bald alle für dich relevanten Neuigkeiten sehen.
  profile: Profil
  title: Dashboard
  uploadsMine: Meine Uploads
en:
  contactBook: Contact book
  contactsMine: My contacts
  dashboard: dashboard
  eventsMine: My events
  eventsMineDescription: Here you will soon see your events.
  gallery: Image gallery
  invitationsMine: My invitations
  invitationsMineDescription: Here you will soon see the events to which you are invited.
  news: Recent changes
  newsDescription: Here you will soon see all the news relevant to you.
  profile: Profile
  title: Dashboard
  uploadsMine: My uploads
</i18n>
