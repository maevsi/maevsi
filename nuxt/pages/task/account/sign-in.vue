<template>
  <div>
    <CardStateInfo
      v-if="$route.query.referrer && !$route.query.isRedirectNoticeHidden"
    >
      {{ $t('accountRequired') }}
    </CardStateInfo>
    <h1>{{ title }}</h1>
    <div class="flex justify-center">
      <FormAccountSignIn class="max-w-lg grow" />
    </div>
  </div>
</template>

<script lang="ts">
import { Context } from '@nuxt/types-edge'
import { defineComponent } from '#app'
import { useMaevsiStore } from '~/store'

export default defineComponent({
  name: 'IndexPage',
  middleware({ app, redirect, route, $pinia }: Context): void {
    const store = useMaevsiStore($pinia)

    if (store.jwtDecoded?.role === 'maevsi_account') {
      return redirect(route.query.referrer || app.localePath('/dashboard/'))
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
  accountRequired: Melde dich an, um fortzufahren.
  title: Anmelden
en:
  accountRequired: Sign in to continue.
  title: Sign in
</i18n>
