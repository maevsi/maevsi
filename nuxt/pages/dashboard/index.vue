<template>
  <div>
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-4">
      <div class="flex gap-4">
        <section class="lg:w-1/2">
          <h2>{{ $t('eventsMine') }}</h2>
          <ButtonColored
            :aria-label="$t('eventsMine')"
            :to="localePath(`/event/${signedInUsername()}`)"
          >
            {{ $t('eventsMine') }}
            <template slot="prefix">
              <IconCalendar />
            </template>
          </ButtonColored>
        </section>
        <section class="lg:w-1/2">
          <h2>{{ $t('invitationsMine') }}</h2>
          <CardStateInfo>
            {{ $t('invitationsMineDescription') }}
          </CardStateInfo>
        </section>
      </div>
      <div class="flex gap-4">
        <section class="lg:w-1/2">
          <h2>{{ $t('contactsMine') }}</h2>
          <ButtonColored
            :aria-label="$t('contactBook')"
            :to="localePath('/contact')"
          >
            {{ $t('contactBook') }}
            <template slot="prefix">
              <IconAddressBook />
            </template>
          </ButtonColored>
        </section>
        <section class="lg:w-1/2">
          <h2>{{ $t('uploadsMine') }}</h2>
          <ButtonColored
            :aria-label="$t('gallery')"
            :to="localePath('/upload')"
          >
            {{ $t('gallery') }}
            <template slot="prefix">
              <IconImages />
            </template>
          </ButtonColored>
        </section>
      </div>
      <section>
        <h2>{{ $t('news') }}</h2>
        <CardStateInfo>
          {{ $t('newsDescription') }}
        </CardStateInfo>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { useHead } from '@vueuse/head'
import { useI18n } from 'vue-i18n-composable'
import { mapGetters } from 'vuex'

import { defineComponent, reactive, useNuxtApp } from '#app'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, store, redirect }: Context): void {
    if (store.getters.jwtDecoded?.role === 'maevsi_anonymous') {
      return redirect(app.localePath('/'))
    }
  },
  transition: {
    name: 'layout',
  },
  setup() {
    const { $router } = useNuxtApp()
    const { t } = useI18n()

    const data = reactive({
      title: t('title'),
    })
    const computations = {
      ...mapGetters(['signedInUsername']),
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
            $router.currentRoute.fullPath,
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
      ...computations,
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
