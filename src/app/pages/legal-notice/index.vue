<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <LayoutProse>
      <h2>{{ t('tmg') }}</h2>
      <p>
        {{ t('addressName') }}<br />
        {{ t('addressOrganization') }}<br />
        {{ t('addressStreet') }}<br />
        {{ t('addressCity') }}
      </p>

      <h2>{{ t('contact') }}</h2>
      <p>{{ t('email') }}</p>

      <h2>{{ t('responsibility') }}</h2>
      <p>
        {{ t('addressName') }}<br />
        {{ t('addressOrganization') }}<br />
        {{ t('addressStreet') }}<br />
        {{ t('addressCity') }}
      </p>

      <h3>{{ t('liabilityContentTitle') }}</h3>
      <p>{{ t('liabilityContentDescription1') }}</p>
      <p>{{ t('liabilityContentDescription2') }}</p>

      <h3>{{ t('liabilityLinksTitle') }}</h3>
      <p>{{ t('liabilityLinksDescription1') }}</p>
      <p>{{ t('liabilityLinksDescription2') }}</p>

      <h3>{{ t('copyrightTitle') }}</h3>
      <p>{{ t('copyrightDescription1') }}</p>
      <p>{{ t('copyrightDescription2') }}</p>

      <p>
        <AppLink is-external to="https://www.e-recht24.de">
          {{ t('source') }}
        </AppLink>
      </p>

      <h2>{{ t('attributionTitle') }}</h2>
      <p>
        <i18n-t keypath="attributionDescription">
          <template #author>
            {{ t('fontAwesomeAuthor') }}
          </template>
          <template #license>
            <AppLink
              is-external
              to="https://creativecommons.org/licenses/by/4.0/"
            >
              {{ t('licenseCCBY40') }}
            </AppLink>
          </template>
          <template #title>
            {{ t('fontAwesome') }}
          </template>
        </i18n-t>
        <br />
        <i18n-t keypath="attributionDescription">
          <template #author>
            {{ t('heroiconsAuthor') }}
          </template>
          <template #license>
            <AppLink
              is-external
              to="https://github.com/tailwindlabs/heroicons/blob/master/LICENSE"
            >
              {{ t('licenseMIT') }}
            </AppLink>
          </template>
          <template #title>
            {{ t('heroicons') }}
          </template>
        </i18n-t>
        <br />
        <i18n-t keypath="attributionDescription">
          <template #author>
            {{ t('materialSymbolsAuthor') }}
          </template>
          <template #license>
            <AppLink
              is-external
              to="https://github.com/google/material-design-icons/blob/master/LICENSE"
            >
              {{ t('licenseApache20') }}
            </AppLink>
          </template>
          <template #title>
            {{ t('materialSymbols') }}
          </template>
        </i18n-t>
        <br />
        <i18n-t keypath="attributionDescription">
          <template #author>
            {{ t('solarAuthor') }}
          </template>
          <template #license>
            <AppLink
              is-external
              to="https://creativecommons.org/licenses/by/4.0/"
            >
              {{ t('licenseCCBY40') }}
            </AppLink>
          </template>
          <template #title>
            {{ t('solar') }}
          </template>
        </i18n-t>
      </p>
    </LayoutProse>
  </div>
</template>

<script lang="ts">
import { usePageBreadcrumb as usePageBreadcrumbHome } from '../index.vue'
import type { BreadcrumbLinkLocalized } from '~/types/breadcrumbs'

export const usePageBreadcrumb = () =>
  ({
    label: {
      de: 'Impressum',
      en: 'Legal notice',
    },
    to: '/legal-notice',
  }) as BreadcrumbLinkLocalized
</script>

<script setup lang="ts">
const { t } = useI18n()
const getBreadcrumbItemProps = useGetBreadcrumbItemProps()

// data
const breadcrumbItems = getBreadcrumbItemProps([
  usePageBreadcrumbHome(),
  {
    current: true,
    ...usePageBreadcrumb(),
  },
])
const title = t('title')

// initialization
useHeadDefault({ title })
</script>

<i18n lang="yaml">
de:
  addressCity: 34127 Kassel
  addressName: Jonas Thelemann
  addressOrganization: SciencePark, CoCreation-Lab
  addressStreet: Universitätsplatz 12
  attributionDescription: '{title} von {author}, {license}'
  attributionTitle: Zuschreibungen
  contact: Kontakt
  copyrightDescription1: Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
  copyrightDescription2: Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
  copyrightTitle: Urheberrecht
  email: "E-Mail: contact+legal-notice{'@'}maev.si"
  fontAwesome: Font Awesome
  fontAwesomeAuthor: Dave Gandy
  heroicons: HeroIcons
  heroiconsAuthor: Refactoring UI Inc
  liabilityContentDescription1: Als Diensteanbieter sind wir gemäß § 7 Abs.1 TMG für eigene Inhalte auf diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
  liabilityContentDescription2: Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
  liabilityContentTitle: Haftung für Inhalte
  liabilityLinksDescription1: Unser Angebot enthält Links zu externen Websites Dritter, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar.
  liabilityLinksDescription2: Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
  liabilityLinksTitle: Haftung für Links
  licenseApache20: Apache 2.0
  licenseCCBY40: CC BY 4.0
  licenseMIT: MIT
  materialSymbols: Material Symbols
  materialSymbolsAuthor: Google
  responsibility: Verantwortlich für den Inhalt nach § 55 Abs. 2 RStV
  solar: Solar
  solarAuthor: 480 Design
  source: Quelle
  title: Impressum
  tmg: Angaben gemäß § 5 TMG
en:
  addressCity: 34127 Kassel
  addressName: Jonas Thelemann
  addressOrganization: SciencePark, CoCreation-Lab
  addressStreet: Universitätsplatz 12
  attributionDescription: '{title} by {author}, {license}'
  attributionTitle: Attributions
  contact: Contact
  copyrightDescription1: The content and works created by the site operators on these pages are subject to German copyright law. The reproduction, editing, distribution and any kind of exploitation outside the limits of copyright require the written consent of the respective author or creator. Downloads and copies of this site are only permitted for private, non-commercial use.
  copyrightDescription2: Insofar as the content on this page was not created by the operator, the copyrights of third parties are respected. In particular, third-party content is identified as such. Should you nevertheless become aware of a copyright infringement, we request that you notify us accordingly. If we become aware of any infringements, we will remove such content immediately.
  copyrightTitle: Copyright
  email: "Email: contact+legal-notice{'@'}maev.si"
  fontAwesome: Font Awesome
  fontAwesomeAuthor: Dave Gandy
  heroicons: HeroIcons
  heroiconsAuthor: Refactoring UI Inc
  liabilityContentDescription1: As a service provider, we are responsible for our own content on these pages in accordance with general legislation pursuant to Section 7 (1) of the German Telemedia Act (TMG). According to §§ 8 to 10 TMG, however, we are not obligated as a service provider to monitor transmitted or stored third-party information or to investigate circumstances that indicate illegal activity.
  liabilityContentDescription2: Obligations to remove or block the use of information according to general laws remain unaffected. However, liability in this regard is only possible from the time of knowledge of a concrete infringement. If we become aware of such infringements, we will remove this content immediately.
  liabilityContentTitle: Liability for content
  liabilityLinksDescription1: Our offer contains links to external websites of third parties, on whose contents we have no influence. Therefore, we cannot assume any liability for these external contents. The respective provider or operator of the pages is always responsible for the content of the linked pages. The linked pages were checked for possible legal violations at the time of linking. Illegal contents were not recognizable at the time of linking.
  liabilityLinksDescription2: However, a permanent control of the contents of the linked pages is not reasonable without concrete evidence of a violation of the law. If we become aware of any infringements, we will remove such links immediately.
  liabilityLinksTitle: Liability for links
  licenseApache20: Apache 2.0
  licenseCCBY40: CC BY 4.0
  licenseMIT: MIT
  materialSymbols: Material Symbols
  materialSymbolsAuthor: Google
  responsibility: Responsible for the content according to § 55 para. 2 RStV
  solar: Solar
  solarAuthor: 480 Design
  source: Source
  title: Legal notice
  tmg: Information according to § 5 TMG
</i18n>
