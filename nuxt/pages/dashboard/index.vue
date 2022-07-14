<template>
  <div>
    <Breadcrumbs>
      {{ $t('dashboard') }}
    </Breadcrumbs>
    <h1>
      {{ title }}
    </h1>
    <div class="flex flex-col gap-4">
      <ButtonList>
        <ButtonColored
          :aria-label="$t('contactBook')"
          :to="localePath('/contact')"
        >
          {{ $t('contactBook') }}
          <template slot="prefix">
            <IconAddressBook />
          </template>
        </ButtonColored>
        <ButtonColored :aria-label="$t('gallery')" :to="localePath('/upload')">
          {{ $t('gallery') }}
          <template slot="prefix">
            <IconImages />
          </template>
        </ButtonColored>
      </ButtonList>
      <div class="flex gap-4">
        <section class="lg:w-1/2">
          <h2>{{ $t('eventsMine') }}</h2>
          <CardStateInfo>
            {{ $t('eventsMineDescription') }}
          </CardStateInfo>
        </section>
        <section class="lg:w-1/2">
          <h2>{{ $t('invitationsMine') }}</h2>
          <CardStateInfo>
            {{ $t('invitationsMineDescription') }}
          </CardStateInfo>
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

import { defineComponent } from '#app'

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
  data() {
    return {
      title: this.$t('title'),
    }
  },
  head() {
    const title = this.title as string
    return {
      meta: [
        {
          hid: 'og:title',
          property: 'og:title',
          content: title,
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content:
            'https://' +
            (process.env.NUXT_ENV_STACK_DOMAIN || 'maevsi.test') +
            this.$router.currentRoute.fullPath,
        },
        {
          hid: 'twitter:title',
          property: 'twitter:title',
          content: title,
        },
      ],
      title,
    }
  },
})
</script>

<i18n lang="yml">
de:
  contactBook: Kontaktbuch
  dashboard: Dashboard
  events: Alle Veranstaltungen
  eventsMine: Meine Veranstaltungen
  eventsMineDescription: Hier wirst du bald deine Veranstaltungen sehen.
  gallery: Bildergalerie
  invitationsMine: Meine Einladungen
  invitationsMineDescription: Hier wirst du bald die Veranstaltungen sehen, zu denen du eingeladen bist.
  news: Ereignisverlauf
  newsDescription: Hier wirst du bald alle für dich relevanten Neuigkeiten sehen.
  profile: Profil
  title: Dashboard
en:
  contactBook: Contact book
  dashboard: dashboard
  events: All events
  eventsMine: My events
  eventsMineDescription: Here you will soon see your events.
  gallery: Image gallery
  invitationsMine: My invitations
  invitationsMineDescription: Here you will soon see the events to which you are invited.
  news: Recent changes history
  newsDescription: Here you will soon see all the news relevant to you.
  profile: Profile
  title: Dashboard
</i18n>
