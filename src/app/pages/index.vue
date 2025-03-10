<template>
  <div class="flex flex-col gap-32 pt-8 pb-64 md:gap-64">
    <section id="overview" class="flex items-center gap-8">
      <div class="flex flex-col items-start gap-8 md:gap-16">
        <h1
          class="m-0 text-left text-4xl font-extrabold sm:text-5xl md:text-5xl xl:text-7xl"
        >
          {{ t('title') }}
        </h1>
        <div class="flex gap-8">
          <ButtonColored
            :aria-label="t('testNowFree')"
            class="text-lg md:text-xl"
            :to="localePath('event')"
          >
            {{ t('testNowFree') }}
          </ButtonColored>
          <Button
            v-if="!isApp"
            :aria-label="t('appInstall')"
            :is-primary="false"
            :to="localePath('docs-app')"
          >
            {{ t('appInstall') }}
            <template #suffix>
              <IHeroiconsArrowRight />
            </template>
          </Button>
        </div>
      </div>
      <LoaderImage
        :alt="t('heroImage')"
        aspect="aspect-[750/861]"
        class="hidden xl:block"
        height="861"
        src="/assets/static/images/hero_background.png"
        width="750"
      />
    </section>
    <section class="grid gap-32 2xl:grid-cols-2 2xl:gap-64">
      <TailwindFeature
        :keyword="t('featureRecommendationsKeyword')"
        :title="t('featureRecommendationsTitle')"
        :description="
          t('featureRecommendationsDescription', {
            siteName: t('globalSiteName'),
          })
        "
      >
        <IHeroiconsLightBulb />
      </TailwindFeature>
      <TailwindFeature
        :keyword="t('featureInvitationsKeyword')"
        :title="t('featureInvitationsTitle')"
        :description="t('featureInvitationsDescription')"
      >
        <IHeroiconsSparkles />
      </TailwindFeature>
      <TailwindFeature
        :keyword="t('featurePortfolioKeyword')"
        :title="t('featurePortfolioTitle')"
        :description="t('featurePortfolioDescription')"
      >
        <IHeroiconsTrophy />
      </TailwindFeature>
      <TailwindFeature
        :keyword="t('featureCommunityKeyword')"
        :title="t('featureCommunityTitle')"
        :description="
          t('featureCommunityDescription', { siteName: t('globalSiteName') })
        "
      >
        <IHeroiconsUserGroup />
      </TailwindFeature>
    </section>
    <section>
      <TailwindDiscord />
    </section>
    <section>
      <TailwindPricing />
    </section>
    <div
      class="fixed bottom-4 left-1/2 flex -translate-x-1/2 flex-col items-center gap-2 text-xl transition duration-300"
      :class="isScrollHintShown ? 'opacity-20' : 'opacity-0'"
    >
      <IHeroiconsChevronDoubleDown
        class="animate-bounce"
        height="3.2em"
        width="3.2em"
        @click="scrollToSteps"
      />
    </div>
    <!-- Timeline / Awards / KPIs (https://tailwindui.com/components/marketing/sections/stats-sections) -->
    <!-- Blog (https://tailwindui.com/components/marketing/sections/blog-sections) -->
    <!-- Contact form (https://tailwindui.com/components/marketing/sections/contact-sections) -->
    <!-- Socials (https://tailwindui.com/components/marketing/sections/footers) -->
    <!-- Testimonials (https://tailwindui.com/components/marketing/sections/testimonials, https://tailwindui.com/components/marketing/sections/logo-clouds) -->
    <!-- Team (https://tailwindui.com/components/marketing/sections/team-sections) -->
    <!-- Organizer Page (https://github.com/maevsi/vibetype/blob/3900d49c7c2025bb75a741ed96fff03fbe204300/src/pages/index.vue) -->
    <canvas
      ref="canvasRef"
      class="pointer-events-none fixed inset-0 h-full w-full"
    />
  </div>
</template>

<script setup lang="ts">
import JSConfetti from 'js-confetti'

import { useAchievementUnlockMutation } from '~~/gql/documents/mutations/achievement/achievementUnlock'

const { t } = useI18n()
const localePath = useLocalePath()
const siteConfig = useSiteConfig()
const { isApp } = usePlatform()
const store = useStore()
const fireAlert = useFireAlert()
let confetti: JSConfetti

// refs
const sectionStepsRef = ref<HTMLElement>()
const canvasRef = ref<HTMLCanvasElement>()

// data
const isScrollHintShown = ref(false)
const loadingId = Math.random()
const loadingIds = useState(STATE_LOADING_IDS_NAME, () => [loadingId])

// api data
const achievementUnlockMutation = useAchievementUnlockMutation()
// const api = getApiData([achievementUnlockMutation])

// methods
const hideScrollHint = () => {
  isScrollHintShown.value = false
}
const scrollToSteps = () => {
  sectionStepsRef.value?.scrollIntoView({ behavior: 'smooth' })
}

// lifecycle
onMounted(async () => {
  if (window.scrollY === 0) {
    isScrollHintShown.value = true

    window.addEventListener('scroll', hideScrollHint)
  }

  loadingIds.value.splice(loadingIds.value.indexOf(loadingId), 1)

  confetti = new JSConfetti({ canvas: canvasRef.value })

  if (store.jwtDecoded?.role === `${SITE_NAME}_account`) {
    const result = await achievementUnlockMutation.executeMutation({
      code: 'c29d9fd1-e455-4f19-a62f-f89b5256a52b',
      alias: window.location.search,
    })

    if (result.error || !result.data?.achievementUnlock?.uuid) return

    confetti.addConfetti()

    const alertResult = await fireAlert({
      confirmButtonText: t('unlockConfirm'),
      denyButtonColor: 'gray',
      denyButtonText: t('unlockDeny'),
      iconHtml: '🎉',
      level: 'success',
      showDenyButton: true,
      text: t('unlockText'),
      title: t('unlockTitle'),
    })

    if (alertResult.isConfirmed) {
      await navigateTo(
        localePath({
          name: 'account-view-username',
          params: {
            username: store.jwtDecoded.account_username,
          },
        }),
      )
    }
  }
})
onBeforeUnmount(() => {
  window.removeEventListener('scroll', hideScrollHint)
})

// initialization
useHeadDefault({ title: siteConfig.name })
</script>

<i18n lang="yaml">
de:
  featureRecommendationsKeyword: Smarte Relevanz
  featureRecommendationsTitle: Vorteilhafte Empfehlungen
  featureRecommendationsDescription: Lehne dich zurück und entspanne dich mit einem Lächeln im Gesicht, denn du weißt, dass {siteName} dich informiert, wenn es etwas geben wird, das du nicht verpassen willst.
  featureInvitationsKeyword: Persönliche Wertschätzung
  featureInvitationsTitle: Exklusive Einladungen
  featureInvitationsDescription: 'Ob du es glaubst oder nicht: Menschen lieben es, dich bei sich zu haben. Nun liegt es an dir, ihnen zu ermöglichen, dich auf elegante Art und Weise zu unvergesslichen Veranstaltungen einzuladen.'
  featurePortfolioKeyword: Vertrauenswürdige Nutzer
  featurePortfolioTitle: Respektables Auftreten
  featurePortfolioDescription: Vertraue nicht uns, vertraue den Nutzenden. Sieh dir die Erfahrungen an, die andere stolz teilen, und entscheide selbst, wohin du am besten gehst.
  featureCommunityKeyword: Loyale Gemeinschaft
  featureCommunityTitle: Stärkende Freundschaften
  featureCommunityDescription: An einem neuen Ort anzukommen, kann hart sein. Am selben Ort zu bleiben, auch. Wo auch immer du bist, {siteName} ist deine Abkürzung, unter tolle Menschen zu kommen und lang anhaltende Verbindungen aufzubauen.
  appInstall: oder die App installieren
  heroImage: Heldenbild.
  testNowFree: Jetzt kostenlos testen
  title: Keine Veranstaltung mehr verpassen
  unlockConfirm: Zum Profil
  unlockDeny: Schließen
  unlockText: Sieh dir deine neue Errungenschaft auf deinem Profil an.
  unlockTitle: Auszeichnung freigeschaltet
en:
  featureRecommendationsKeyword: Smart relevance
  featureRecommendationsTitle: Advantageous recommendations
  featureRecommendationsDescription: Lean back and relax with a smile on your face, knowing very well that {siteName} will let you know whenever there's something coming up that you don't want to miss.
  featureInvitationsKeyword: Personal appreciation
  featureInvitationsTitle: Exclusive invitations
  featureInvitationsDescription: 'Believe it or not: People love to have you around. Now allow them to bring you in most elegantly for memorable get-togethers.'
  featurePortfolioKeyword: Trustworthy users
  featurePortfolioTitle: Respectable appearance
  featurePortfolioDescription: Don't trust us, trust the users. Check the experiences shared proudly by others and be in full control of where to go best.
  featureCommunityKeyword: Loyal community
  featureCommunityTitle: Empowering friendships
  featureCommunityDescription: Arriving somewhere new can be hard. Staying in the same place can be too. Wherever you are, {siteName} is your shortcut to get among amazing people and build long lasting connections.
  appInstall: or install the app
  heroImage: Hero image.
  testNowFree: Test now for free
  title: Never miss an event
  unlockConfirm: Go to profile
  unlockDeny: Close
  unlockText: Check out your new achievement on your profile.
  unlockTitle: Achievement unlocked
</i18n>
