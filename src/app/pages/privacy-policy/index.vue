<template>
  <div>
    <LayoutBreadcrumbs :items="breadcrumbItems" />
    <LayoutPageTitle :title="title" />
    <LayoutProse>
      <h2>{{ t('summary') }}</h2>
      <h3>{{ t('generalNotesTitle') }}</h3>
      <p>{{ t('generalNotesDescription') }}</p>

      <h3>{{ t('dataCollection') }}</h3>
      <h4>{{ t('dataCollectionLiabilityTitle') }}</h4>
      <p>{{ t('dataCollectionLiabilityDescription') }}</p>

      <h4>{{ t('dataCollectionMethodTitle') }}</h4>
      <p>{{ t('dataCollectionMethodDescription1') }}</p>
      <p>{{ t('dataCollectionMethodDescription2') }}</p>

      <h4>{{ t('dataCollectionUseTitle') }}</h4>
      <p>{{ t('dataCollectionUseDescription') }}</p>

      <h4>{{ t('dataCollectionRightsTitle') }}</h4>
      <p>{{ t('dataCollectionRightsDescription1') }}</p>
      <p>{{ t('dataCollectionRightsDescription2') }}</p>

      <h3>{{ t('dataCollectionToolsTitle') }}</h3>
      <p>{{ t('dataCollectionToolsDescription1') }}</p>
      <p>{{ t('dataCollectionToolsDescription2') }}</p>

      <h2>{{ t('hostingCdn') }}</h2>
      <h3>{{ t('hostingCdnExternalTitle') }}</h3>
      <p>{{ t('hostingCdnExternalDescription1') }}</p>
      <p>{{ t('hostingCdnExternalDescription2') }}</p>
      <p>{{ t('hostingCdnExternalDescription3') }}</p>
      <p>{{ t('hostingCdnExternalDescription4') }}</p>
      <address>
        {{ t('hostingCdnExternalAddressName') }}<br />
        {{ t('hostingCdnExternalAddressStreet') }}<br />
        {{ t('hostingCdnExternalAddressCity') }}
      </address>

      <h4>{{ t('hostingCdnExternalProcessingContractTitle') }}</h4>
      <p>{{ t('hostingCdnExternalProcessingContractDescription') }}</p>

      <h2>{{ t('mandatoryInfo') }}</h2>
      <h3>{{ t('mandatoryInfoPrivacyTitle') }}</h3>
      <p>{{ t('mandatoryInfoPrivacyDescription1') }}</p>
      <p>{{ t('mandatoryInfoPrivacyDescription2') }}</p>
      <p>{{ t('mandatoryInfoPrivacyDescription3') }}</p>

      <h3>{{ t('mandatoryInfoResponsibleTitle') }}</h3>
      <p>{{ t('mandatoryInfoResponsibleDescription1') }}</p>
      <address>
        {{ t('mandatoryInfoResponsibleAddressName') }}<br />
        {{ t('mandatoryInfoResponsibleAddressOrganization') }}<br />
        {{ t('mandatoryInfoResponsibleAddressStreet') }}<br />
        {{ t('mandatoryInfoResponsibleAddressCity') }}<br />
        <br />
        {{ t('mandatoryInfoResponsibleAddressEmail') }}
      </address>
      <p>{{ t('mandatoryInfoResponsibleDescription2') }}</p>

      <h3>{{ t('mandatoryInfoStorageDurationTitle') }}</h3>
      <p>{{ t('mandatoryInfoStorageDurationDescription') }}</p>

      <h3>{{ t('mandatoryInfoDataSharingUsaTitle') }}</h3>
      <p>{{ t('mandatoryInfoDataSharingUsaDescription') }}</p>

      <h3>{{ t('mandatoryInfoConsentRevocationTitle') }}</h3>
      <p>{{ t('mandatoryInfoConsentRevocationDescription') }}</p>

      <h3>{{ t('mandatoryInfoConsentRevocationSpecialTitle') }}</h3>
      <p class="font-bold">
        {{ t('mandatoryInfoConsentRevocationSpecialDescription1') }}
      </p>
      <p class="font-bold">
        {{ t('mandatoryInfoConsentRevocationSpecialDescription2') }}
      </p>

      <h3>{{ t('mandatoryInfoComplaintTitle') }}</h3>
      <p>{{ t('mandatoryInfoComplaintDescription') }}</p>

      <h3>{{ t('mandatoryInfoPortabilityTitle') }}</h3>
      <p>{{ t('mandatoryInfoPortabilityDescription') }}</p>

      <h3>{{ t('mandatoryInfoSslTlsTitle') }}</h3>
      <p>{{ t('mandatoryInfoSslTlsDescription1') }}</p>
      <p>{{ t('mandatoryInfoSslTlsDescription2') }}</p>

      <h3>{{ t('mandatoryInfoDataChangeTitle') }}</h3>
      <p>{{ t('mandatoryInfoDataChangeDescription') }}</p>

      <h3>{{ t('mandatoryInfoProcessingRestrictionTitle') }}</h3>
      <p>{{ t('mandatoryInfoProcessingRestrictionDescription1') }}</p>
      <ul>
        <li>{{ t('mandatoryInfoProcessingRestrictionList1') }}</li>
        <li>{{ t('mandatoryInfoProcessingRestrictionList2') }}</li>
        <li>{{ t('mandatoryInfoProcessingRestrictionList3') }}</li>
        <li>{{ t('mandatoryInfoProcessingRestrictionList4') }}</li>
      </ul>
      <p>{{ t('mandatoryInfoProcessingRestrictionDescription2') }}</p>

      <h3>{{ t('mandatoryInfoOppositionTitle') }}</h3>
      <p>{{ t('mandatoryInfoOppositionDescription') }}</p>

      <h2>{{ t('dataAcquisition') }}</h2>
      <h3>{{ t('dataAcquisitionCookiesTitle') }}</h3>
      <p>{{ t('dataAcquisitionCookiesDescription1') }}</p>
      <p>{{ t('dataAcquisitionCookiesDescription2') }}</p>
      <p>{{ t('dataAcquisitionCookiesDescription3') }}</p>
      <p>{{ t('dataAcquisitionCookiesDescription4') }}</p>
      <p>{{ t('dataAcquisitionCookiesDescription5') }}</p>
      <p>{{ t('dataAcquisitionCookiesDescription6') }}</p>

      <h3>{{ t('dataAcquisitionLogTitle') }}</h3>
      <p>{{ t('dataAcquisitionLogDescription1') }}</p>
      <ul>
        <li>{{ t('dataAcquisitionLogItem1') }}</li>
        <li>{{ t('dataAcquisitionLogItem2') }}</li>
        <li>{{ t('dataAcquisitionLogItem3') }}</li>
        <li>{{ t('dataAcquisitionLogItem4') }}</li>
        <li>{{ t('dataAcquisitionLogItem5') }}</li>
        <li>{{ t('dataAcquisitionLogItem6') }}</li>
      </ul>
      <p>{{ t('dataAcquisitionLogDescription2') }}</p>
      <p>{{ t('dataAcquisitionLogDescription3') }}</p>

      <h3>{{ t('dataAcquisitionContactFormTitle') }}</h3>
      <p>{{ t('dataAcquisitionContactFormDescription1') }}</p>
      <p>{{ t('dataAcquisitionContactFormDescription2') }}</p>
      <p>{{ t('dataAcquisitionContactFormDescription3') }}</p>

      <h3>{{ t('dataAcquisitionContactExternalTitle') }}</h3>
      <p>{{ t('dataAcquisitionContactExternalDescription1') }}</p>
      <p>{{ t('dataAcquisitionContactExternalDescription2') }}</p>
      <p>{{ t('dataAcquisitionContactExternalDescription3') }}</p>

      <h3>{{ t('dataAcquisitionCommentsTitle') }}</h3>
      <p>{{ t('dataAcquisitionCommentsDescription') }}</p>

      <h4>{{ t('dataAcquisitionCommentsIpTitle') }}</h4>
      <p>{{ t('dataAcquisitionCommentsIpDescription') }}</p>

      <h4>{{ t('dataAcquisitionCommentsSubscribeTitle') }}</h4>
      <p>{{ t('dataAcquisitionCommentsSubscribeDescription') }}</p>

      <h4>{{ t('dataAcquisitionCommentsStorageDurationTitle') }}</h4>
      <p>{{ t('dataAcquisitionCommentsStorageDurationDescription') }}</p>

      <h4>{{ t('dataAcquisitionCommentsLegalBasisTitle') }}</h4>
      <p>{{ t('dataAcquisitionCommentsLegalBasisDescription') }}</p>

      <h2>{{ t('newsletter') }}</h2>
      <h3>{{ t('newsletterDataTitle') }}</h3>
      <p>{{ t('newsletterDataDescription1') }}</p>
      <p>{{ t('newsletterDataDescription2') }}</p>
      <p>{{ t('newsletterDataDescription3') }}</p>

      <i18n-t keypath="newsletterDataDescription4" tag="p">
        <template #strong>
          <strong>{{ t('newsletterDataDescription4s') }}</strong>
        </template>
      </i18n-t>

      <h2>{{ t('pluginsTools') }}</h2>
      <h3>{{ t('pluginsToolsYouTubeTitle') }}</h3>
      <p>{{ t('pluginsToolsYouTubeDescription1') }}</p>
      <p>{{ t('pluginsToolsYouTubeDescription2') }}</p>
      <p>{{ t('pluginsToolsYouTubeDescription3') }}</p>
      <p>{{ t('pluginsToolsYouTubeDescription4') }}</p>
      <p>{{ t('pluginsToolsYouTubeDescription5') }}</p>
      <p>{{ t('pluginsToolsYouTubeDescription6') }}</p>
      <i18n-t keypath="pluginsToolsYouTubeDescription7" tag="p">
        <template #linkPrivacy>
          <AppLink :to="t('pluginsToolsYouTubeDescription7s')">
            {{ t('pluginsToolsYouTubeDescription7s') }}
          </AppLink>
        </template>
      </i18n-t>

      <h3>{{ t('pluginsToolsGoogleWebFontsTitle') }}</h3>
      <p>{{ t('pluginsToolsGoogleWebFontsDescription1') }}</p>
      <i18n-t keypath="pluginsToolsGoogleWebFontsDescription2" tag="p">
        <template #linkFaq>
          <AppLink :to="t('pluginsToolsGoogleWebFontsDescription2s1')">
            {{ t('pluginsToolsGoogleWebFontsDescription2s1') }}
          </AppLink>
        </template>
        <template #linkPrivacy>
          <AppLink :to="t('pluginsToolsGoogleWebFontsDescription2s2')">
            {{ t('pluginsToolsGoogleWebFontsDescription2s2') }}
          </AppLink>
        </template>
      </i18n-t>

      <h3>{{ t('pluginsToolsFontAwesomeTitle') }}</h3>
      <p>{{ t('pluginsToolsFontAwesomeDescription1') }}</p>
      <i18n-t keypath="pluginsToolsFontAwesomeDescription2" tag="p">
        <template #linkPrivacy>
          <AppLink :to="t('pluginsToolsFontAwesomeDescription2s')">
            {{ t('pluginsToolsFontAwesomeDescription2s') }}
          </AppLink>
        </template>
      </i18n-t>

      <h3>{{ t('pluginsToolsGoogleMapsTitle') }}</h3>
      <p>{{ t('pluginsToolsGoogleMapsDescription1') }}</p>
      <p>{{ t('pluginsToolsGoogleMapsDescription2') }}</p>
      <p>{{ t('pluginsToolsGoogleMapsDescription3') }}</p>
      <i18n-t keypath="pluginsToolsGoogleMapsDescription4" tag="p">
        <template #linkGdpr>
          <AppLink
            is-external
            to="https://privacy.google.com/businesses/gdprcontrollerterms/"
          >
            {{ t('pluginsToolsGoogleMapsDescription4s1') }}
          </AppLink>
        </template>
        <template #linkGdprScss>
          <AppLink
            is-external
            to="https://privacy.google.com/businesses/gdprcontrollerterms/sccs/"
          >
            {{ t('pluginsToolsGoogleMapsDescription4s2') }}
          </AppLink>
        </template>
      </i18n-t>
      <i18n-t keypath="pluginsToolsGoogleMapsDescription5" tag="p">
        <template #linkPrivacy>
          <AppLink :to="t('pluginsToolsGoogleMapsDescription5s')">
            {{ t('pluginsToolsGoogleMapsDescription5s') }}
          </AppLink>
        </template>
      </i18n-t>

      <h3>{{ t('pluginsToolsGoogleReCaptchaTitle') }}</h3>
      <p>{{ t('pluginsToolsGoogleReCaptchaDescription1') }}</p>
      <p>{{ t('pluginsToolsGoogleReCaptchaDescription2') }}</p>
      <p>{{ t('pluginsToolsGoogleReCaptchaDescription3') }}</p>
      <p>{{ t('pluginsToolsGoogleReCaptchaDescription4') }}</p>
      <i18n-t keypath="pluginsToolsGoogleReCaptchaDescription5" tag="p">
        <template #linkPrivacy>
          <AppLink :to="t('pluginsToolsGoogleReCaptchaDescription5s1')">
            {{ t('pluginsToolsGoogleReCaptchaDescription5s1') }}
          </AppLink>
        </template>
        <template #linkTerms>
          <AppLink :to="t('pluginsToolsGoogleReCaptchaDescription5s2')">
            {{ t('pluginsToolsGoogleReCaptchaDescription5s2') }}
          </AppLink>
        </template>
      </i18n-t>
      <p>
        <AppLink is-external to="https://www.e-recht24.de">
          {{ t('source') }}
        </AppLink>
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
      de: 'Datenschutzerklärung',
      en: 'Privacy policy',
    },
    to: '/privacy-policy',
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
  dataAcquisition: 4. Datenerfassung auf dieser Website
  dataAcquisitionCommentsDescription: Für die Kommentarfunktion auf dieser Seite werden neben Ihrem Kommentar auch Angaben zum Zeitpunkt der Erstellung des Kommentars, Ihre E-Mail-Adresse und, wenn Sie nicht anonym posten, der von Ihnen gewählte Nutzername gespeichert.
  dataAcquisitionCommentsIpDescription: Unsere Kommentarfunktion speichert die IP-Adressen der Nutzer, die Kommentare verfassen. Da wir Kommentare auf dieser Website nicht vor der Freischaltung prüfen, benötigen wir diese Daten, um im Falle von Rechtsverletzungen wie Beleidigungen oder Propaganda gegen den Verfasser vorgehen zu können.
  dataAcquisitionCommentsIpTitle: Speicherung der IP-Adresse
  dataAcquisitionCommentsLegalBasisDescription: Die Speicherung der Kommentare erfolgt auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Sie können eine von Ihnen erteilte Einwilligung jederzeit widerrufen. Dazu reicht eine formlose Mitteilung per E-Mail an uns. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
  dataAcquisitionCommentsLegalBasisTitle: Rechtsgrundlage
  dataAcquisitionCommentsStorageDurationDescription: Die Kommentare und die damit verbundenen Daten werden gespeichert und verbleiben auf dieser Website, bis der kommentierte Inhalt vollständig gelöscht wurde oder die Kommentare aus rechtlichen Gründen gelöscht werden müssen (z. B. beleidigende Kommentare).
  dataAcquisitionCommentsStorageDurationTitle: Speicherdauer der Kommentare
  dataAcquisitionCommentsSubscribeDescription: Als Nutzer der Seite können Sie nach einer Anmeldung Kommentare abonnieren. Sie erhalten eine Bestätigungs-E-Mail, um zu prüfen, ob Sie der Inhaber der angegebenen E-Mail-Adresse sind. Sie können diese Funktion jederzeit über einen Link in den Info-Mails abbestellen. Die im Rahmen des Abonnierens von Kommentaren eingegebenen Daten werden in diesem Fall gelöscht; wenn Sie diese Daten für andere Zwecke und an anderer Stelle (z. B. Newsletterbestellung) an uns übermittelt haben, verbleiben diese Daten jedoch bei uns.
  dataAcquisitionCommentsSubscribeTitle: Abonnieren von Kommentaren
  dataAcquisitionCommentsTitle: Kommentarfunktion auf dieser Website
  dataAcquisitionContactExternalDescription1: Wenn Sie uns per E-Mail, Telefon oder Telefax kontaktieren, wird Ihre Anfrage inklusive aller daraus hervorgehenden personenbezogenen Daten (Name, Anfrage) zum Zwecke der Bearbeitung Ihres Anliegens bei uns gespeichert und verarbeitet. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
  dataAcquisitionContactExternalDescription2: Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
  dataAcquisitionContactExternalDescription3: Die von Ihnen an uns per Kontaktanfragen übersandten Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihres Anliegens). Zwingende gesetzliche Bestimmungen – insbesondere gesetzliche Aufbewahrungsfristen – bleiben unberührt.
  dataAcquisitionContactExternalTitle: Anfrage per E-Mail, Telefon oder Telefax
  dataAcquisitionContactFormDescription1: Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter.
  dataAcquisitionContactFormDescription2: Die Verarbeitung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. b DSGVO, sofern Ihre Anfrage mit der Erfüllung eines Vertrags zusammenhängt oder zur Durchführung vorvertraglicher Maßnahmen erforderlich ist. In allen übrigen Fällen beruht die Verarbeitung auf unserem berechtigten Interesse an der effektiven Bearbeitung der an uns gerichteten Anfragen (Art. 6 Abs. 1 lit. f DSGVO) oder auf Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO) sofern diese abgefragt wurde.
  dataAcquisitionContactFormDescription3: Die von Ihnen im Kontaktformular eingegebenen Daten verbleiben bei uns, bis Sie uns zur Löschung auffordern, Ihre Einwilligung zur Speicherung widerrufen oder der Zweck für die Datenspeicherung entfällt (z. B. nach abgeschlossener Bearbeitung Ihrer Anfrage). Zwingende gesetzliche Bestimmungen – insbesondere Aufbewahrungsfristen – bleiben unberührt.
  dataAcquisitionContactFormTitle: Kontaktformular
  dataAcquisitionCookiesDescription1: Unsere Internetseiten verwenden so genannte „Cookies“. Cookies sind kleine Textdateien und richten auf Ihrem Endgerät keinen Schaden an. Sie werden entweder vorübergehend für die Dauer einer Sitzung (Session-Cookies) oder dauerhaft (permanente Cookies) auf Ihrem Endgerät gespeichert. Session-Cookies werden nach Ende Ihres Besuchs automatisch gelöscht. Permanente Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese selbst löschen oder eine automatische Löschung durch Ihren Webbrowser erfolgt.
  dataAcquisitionCookiesDescription2: Teilweise können auch Cookies von Drittunternehmen auf Ihrem Endgerät gespeichert werden, wenn Sie unsere Seite betreten (Third-Party-Cookies). Diese ermöglichen uns oder Ihnen die Nutzung bestimmter Dienstleistungen des Drittunternehmens (z.B. Cookies zur Abwicklung von Zahlungsdienstleistungen).
  dataAcquisitionCookiesDescription3: Cookies haben verschiedene Funktionen. Zahlreiche Cookies sind technisch notwendig, da bestimmte Websitefunktionen ohne diese nicht funktionieren würden (z.B. die Login-Funktion). Andere Cookies dienen dazu, das Nutzerverhalten auszuwerten oder Werbung anzuzeigen.
  dataAcquisitionCookiesDescription4: Cookies, die zur Durchführung des elektronischen Kommunikationsvorgangs (notwendige Cookies) oder zur Bereitstellung bestimmter, von Ihnen erwünschter Funktionen (funktionale Cookies, z. B. für die Login-Funktion) oder zur Optimierung der Website (z.B. Cookies zur Messung des Webpublikums) erforderlich sind, werden auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO gespeichert, sofern keine andere Rechtsgrundlage angegeben wird. Der Websitebetreiber hat ein berechtigtes Interesse an der Speicherung von Cookies zur technisch fehlerfreien und optimierten Bereitstellung seiner Dienste. Sofern eine Einwilligung zur Speicherung von Cookies abgefragt wurde, erfolgt die Speicherung der betreffenden Cookies ausschließlich auf Grundlage dieser Einwilligung (Art. 6 Abs. 1 lit. a DSGVO); die Einwilligung ist jederzeit widerrufbar.
  dataAcquisitionCookiesDescription5: Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren. Bei der Deaktivierung von Cookies kann die Funktionalität dieser Website eingeschränkt sein.
  dataAcquisitionCookiesDescription6: Soweit Cookies von Drittunternehmen oder zu Analysezwecken eingesetzt werden, werden wir Sie hierüber im Rahmen dieser Datenschutzerklärung gesondert informieren und ggf. eine Einwilligung abfragen.
  dataAcquisitionCookiesTitle: Cookies
  dataAcquisitionLogDescription1: 'Der Provider der Seiten erhebt und speichert automatisch Informationen in so genannten Server-Log-Dateien, die Ihr Browser automatisch an uns übermittelt. Dies sind:'
  dataAcquisitionLogDescription2: Eine Zusammenführung dieser Daten mit anderen Datenquellen wird nicht vorgenommen.
  dataAcquisitionLogDescription3: Die Erfassung dieser Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse an der technisch fehlerfreien Darstellung und der Optimierung seiner Website – hierzu müssen die Server-Log-Files erfasst werden.
  dataAcquisitionLogItem1: Browsertyp und Browserversion
  dataAcquisitionLogItem2: verwendetes Betriebssystem
  dataAcquisitionLogItem3: Referrer URL
  dataAcquisitionLogItem4: Hostname des zugreifenden Rechners
  dataAcquisitionLogItem5: Uhrzeit der Serveranfrage
  dataAcquisitionLogItem6: IP-Adresse
  dataAcquisitionLogTitle: Server-Log-Dateien
  dataCollection: Datenerfassung auf dieser Website
  dataCollectionLiabilityDescription: Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Impressum dieser Website entnehmen.
  dataCollectionLiabilityTitle: Wer ist verantwortlich für die Datenerfassung auf dieser Website?
  dataCollectionMethodDescription1: Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben.
  dataCollectionMethodDescription2: Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs). Die Erfassung dieser Daten erfolgt automatisch, sobald Sie diese Website betreten.
  dataCollectionMethodTitle: Wie erfassen wir Ihre Daten?
  dataCollectionRightsDescription1: Sie haben jederzeit das Recht, unentgeltlich Auskunft über Herkunft, Empfänger und Zweck Ihrer gespeicherten personenbezogenen Daten zu erhalten. Sie haben außerdem ein Recht, die Berichtigung oder Löschung dieser Daten zu verlangen. Wenn Sie eine Einwilligung zur Datenverarbeitung erteilt haben, können Sie diese Einwilligung jederzeit für die Zukunft widerrufen. Außerdem haben Sie das Recht, unter bestimmten Umständen die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Des Weiteren steht Ihnen ein Beschwerderecht bei der zuständigen Aufsichtsbehörde zu.
  dataCollectionRightsDescription2: Hierzu sowie zu weiteren Fragen zum Thema Datenschutz können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
  dataCollectionRightsTitle: Welche Rechte haben Sie bezüglich Ihrer Daten?
  dataCollectionToolsDescription1: Beim Besuch dieser Website kann Ihr Surf-Verhalten statistisch ausgewertet werden. Das geschieht vor allem mit sogenannten Analyseprogrammen.
  dataCollectionToolsDescription2: Detaillierte Informationen zu diesen Analyseprogrammen finden Sie in der folgenden Datenschutzerklärung.
  dataCollectionToolsTitle: Analyse-Tools und Tools von Drittanbietern
  dataCollectionUseDescription: Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
  dataCollectionUseTitle: Wofür nutzen wir Ihre Daten?
  generalNotesDescription: Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
  generalNotesTitle: Allgemeine Hinweise
  hostingCdn: 2. Hosting und Content Delivery Networks (CDN)
  hostingCdnExternalAddressCity: 91710 Gunzenhausen, Deutschland
  hostingCdnExternalAddressName: Hetzner Online GmbH
  hostingCdnExternalAddressStreet: Industriestr. 25
  hostingCdnExternalDescription1: Diese Website wird bei einem externen Dienstleister gehostet (Hoster). Die personenbezogenen Daten, die auf dieser Website erfasst werden, werden auf den Servern des Hosters gespeichert. Hierbei kann es sich v. a. um IP-Adressen, Kontaktanfragen, Meta- und Kommunikationsdaten, Vertragsdaten, Kontaktdaten, Namen, Websitezugriffe und sonstige Daten, die über eine Website generiert werden, handeln.
  hostingCdnExternalDescription2: Der Einsatz des Hosters erfolgt zum Zwecke der Vertragserfüllung gegenüber unseren potenziellen und bestehenden Kunden (Art. 6 Abs. 1 lit. b DSGVO) und im Interesse einer sicheren, schnellen und effizienten Bereitstellung unseres Online-Angebots durch einen professionellen Anbieter (Art. 6 Abs. 1 lit. f DSGVO).
  hostingCdnExternalDescription3: Unser Hoster wird Ihre Daten nur insoweit verarbeiten, wie dies zur Erfüllung seiner Leistungspflichten erforderlich ist und unsere Weisungen in Bezug auf diese Daten befolgen.
  hostingCdnExternalDescription4: 'Wir setzen folgenden Hoster ein:'
  hostingCdnExternalProcessingContractDescription: Um die datenschutzkonforme Verarbeitung zu gewährleisten, haben wir einen Vertrag über Auftragsverarbeitung mit unserem Hoster geschlossen.
  hostingCdnExternalProcessingContractTitle: Abschluss eines Vertrages über Auftragsverarbeitung
  hostingCdnExternalTitle: Externes Hosting
  mandatoryInfo: 3. Allgemeine Hinweise und Pflichtinformationen
  mandatoryInfoComplaintDescription: Im Falle von Verstößen gegen die DSGVO steht den Betroffenen ein Beschwerderecht bei einer Aufsichtsbehörde, insbesondere in dem Mitgliedstaat ihres gewöhnlichen Aufenthalts, ihres Arbeitsplatzes oder des Orts des mutmaßlichen Verstoßes zu. Das Beschwerderecht besteht unbeschadet anderweitiger verwaltungsrechtlicher oder gerichtlicher Rechtsbehelfe.
  mandatoryInfoComplaintTitle: Beschwerderecht bei der zuständigen Aufsichtsbehörde
  mandatoryInfoConsentRevocationDescription: Viele Datenverarbeitungsvorgänge sind nur mit Ihrer ausdrücklichen Einwilligung möglich. Sie können eine bereits erteilte Einwilligung jederzeit widerrufen. Die Rechtmäßigkeit der bis zum Widerruf erfolgten Datenverarbeitung bleibt vom Widerruf unberührt.
  mandatoryInfoConsentRevocationSpecialDescription1: WENN DIE DATENVERARBEITUNG AUF GRUNDLAGE VON ART. 6 ABS. 1 LIT. E ODER F DSGVO ERFOLGT, HABEN SIE JEDERZEIT DAS RECHT, AUS GRÜNDEN, DIE SICH AUS IHRER BESONDEREN SITUATION ERGEBEN, GEGEN DIE VERARBEITUNG IHRER PERSONENBEZOGENEN DATEN WIDERSPRUCH EINZULEGEN; DIES GILT AUCH FÜR EIN AUF DIESE BESTIMMUNGEN GESTÜTZTES PROFILING. DIE JEWEILIGE RECHTSGRUNDLAGE, AUF DENEN EINE VERARBEITUNG BERUHT, ENTNEHMEN SIE DIESER DATENSCHUTZERKLÄRUNG. WENN SIE WIDERSPRUCH EINLEGEN, WERDEN WIR IHRE BETROFFENEN PERSONENBEZOGENEN DATEN NICHT MEHR VERARBEITEN, ES SEI DENN, WIR KÖNNEN ZWINGENDE SCHUTZWÜRDIGE GRÜNDE FÜR DIE VERARBEITUNG NACHWEISEN, DIE IHRE INTERESSEN, RECHTE UND FREIHEITEN ÜBERWIEGEN ODER DIE VERARBEITUNG DIENT DER GELTENDMACHUNG, AUSÜBUNG ODER VERTEIDIGUNG VON RECHTSANSPRÜCHEN (WIDERSPRUCH NACH ART. 21 ABS. 1 DSGVO).
  mandatoryInfoConsentRevocationSpecialDescription2: WERDEN IHRE PERSONENBEZOGENEN DATEN VERARBEITET, UM DIREKTWERBUNG ZU BETREIBEN, SO HABEN SIE DAS RECHT, JEDERZEIT WIDERSPRUCH GEGEN DIE VERARBEITUNG SIE BETREFFENDER PERSONENBEZOGENER DATEN ZUM ZWECKE DERARTIGER WERBUNG EINZULEGEN; DIES GILT AUCH FÜR DAS PROFILING, SOWEIT ES MIT SOLCHER DIREKTWERBUNG IN VERBINDUNG STEHT. WENN SIE WIDERSPRECHEN, WERDEN IHRE PERSONENBEZOGENEN DATEN ANSCHLIESSEND NICHT MEHR ZUM ZWECKE DER DIREKTWERBUNG VERWENDET (WIDERSPRUCH NACH ART. 21 ABS. 2 DSGVO).
  mandatoryInfoConsentRevocationSpecialTitle: Widerspruchsrecht gegen die Datenerhebung in besonderen Fällen sowie gegen Direktwerbung (Art. 21 DSGVO)
  mandatoryInfoConsentRevocationTitle: Widerruf Ihrer Einwilligung zur Datenverarbeitung
  mandatoryInfoDataChangeDescription: Sie haben im Rahmen der geltenden gesetzlichen Bestimmungen jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten, deren Herkunft und Empfänger und den Zweck der Datenverarbeitung und ggf. ein Recht auf Berichtigung oder Löschung dieser Daten. Hierzu sowie zu weiteren Fragen zum Thema personenbezogene Daten können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden.
  mandatoryInfoDataChangeTitle: Auskunft, Löschung und Berichtigung
  mandatoryInfoDataSharingUsaDescription: Auf unserer Website sind unter anderem Tools von Unternehmen mit Sitz in den USA eingebunden. Wenn diese Tools aktiv sind, können Ihre personenbezogenen Daten an die US-Server der jeweiligen Unternehmen weitergegeben werden. Wir weisen darauf hin, dass die USA kein sicherer Drittstaat im Sinne des EU-Datenschutzrechts sind. US-Unternehmen sind dazu verpflichtet, personenbezogene Daten an Sicherheitsbehörden herauszugeben, ohne dass Sie als Betroffener hiergegen gerichtlich vorgehen könnten. Es kann daher nicht ausgeschlossen werden, dass US-Behörden (z.B. Geheimdienste) Ihre auf US-Servern befindlichen Daten zu Überwachungszwecken verarbeiten, auswerten und dauerhaft speichern. Wir haben auf diese Verarbeitungstätigkeiten keinen Einfluss.
  mandatoryInfoDataSharingUsaTitle: Hinweis zur Datenweitergabe in die USA
  mandatoryInfoOppositionDescription: Der Nutzung von im Rahmen der Impressumspflicht veröffentlichten Kontaktdaten zur Übersendung von nicht ausdrücklich angeforderter Werbung und Informationsmaterialien wird hiermit widersprochen. Die Betreiber der Seiten behalten sich ausdrücklich rechtliche Schritte im Falle der unverlangten Zusendung von Werbeinformationen, etwa durch Spam-E-Mails, vor.
  mandatoryInfoOppositionTitle: Widerspruch gegen Werbe-E-Mails
  mandatoryInfoPortabilityDescription: Sie haben das Recht, Daten, die wir auf Grundlage Ihrer Einwilligung oder in Erfüllung eines Vertrags automatisiert verarbeiten, an sich oder an einen Dritten in einem gängigen, maschinenlesbaren Format aushändigen zu lassen. Sofern Sie die direkte Übertragung der Daten an einen anderen Verantwortlichen verlangen, erfolgt dies nur, soweit es technisch machbar ist.
  mandatoryInfoPortabilityTitle: Recht auf Datenübertragbarkeit
  mandatoryInfoPrivacyDescription1: Die Betreiber dieser Seiten nehmen den Schutz Ihrer persönlichen Daten sehr ernst. Wir behandeln Ihre personenbezogenen Daten vertraulich und entsprechend der gesetzlichen Datenschutzvorschriften sowie dieser Datenschutzerklärung.
  mandatoryInfoPrivacyDescription2: Wenn Sie diese Website benutzen, werden verschiedene personenbezogene Daten erhoben. Personenbezogene Daten sind Daten, mit denen Sie persönlich identifiziert werden können. Die vorliegende Datenschutzerklärung erläutert, welche Daten wir erheben und wofür wir sie nutzen. Sie erläutert auch, wie und zu welchem Zweck das geschieht.
  mandatoryInfoPrivacyDescription3: Wir weisen darauf hin, dass die Datenübertragung im Internet (z. B. bei der Kommunikation per E-Mail) Sicherheitslücken aufweisen kann. Ein lückenloser Schutz der Daten vor dem Zugriff durch Dritte ist nicht möglich.
  mandatoryInfoPrivacyTitle: Datenschutz
  mandatoryInfoProcessingRestrictionDescription1: 'Sie haben das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen. Hierzu können Sie sich jederzeit unter der im Impressum angegebenen Adresse an uns wenden. Das Recht auf Einschränkung der Verarbeitung besteht in folgenden Fällen:'
  mandatoryInfoProcessingRestrictionDescription2: Wenn Sie die Verarbeitung Ihrer personenbezogenen Daten eingeschränkt haben, dürfen diese Daten – von ihrer Speicherung abgesehen – nur mit Ihrer Einwilligung oder zur Geltendmachung, Ausübung oder Verteidigung von Rechtsansprüchen oder zum Schutz der Rechte einer anderen natürlichen oder juristischen Person oder aus Gründen eines wichtigen öffentlichen Interesses der Europäischen Union oder eines Mitgliedstaats verarbeitet werden.
  mandatoryInfoProcessingRestrictionList1: Wenn Sie die Richtigkeit Ihrer bei uns gespeicherten personenbezogenen Daten bestreiten, benötigen wir in der Regel Zeit, um dies zu überprüfen. Für die Dauer der Prüfung haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
  mandatoryInfoProcessingRestrictionList2: Wenn die Verarbeitung Ihrer personenbezogenen Daten unrechtmäßig geschah/geschieht, können Sie statt der Löschung die Einschränkung der Datenverarbeitung verlangen.
  mandatoryInfoProcessingRestrictionList3: Wenn wir Ihre personenbezogenen Daten nicht mehr benötigen, Sie sie jedoch zur Ausübung, Verteidigung oder Geltendmachung von Rechtsansprüchen benötigen, haben Sie das Recht, statt der Löschung die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
  mandatoryInfoProcessingRestrictionList4: Wenn Sie einen Widerspruch nach Art. 21 Abs. 1 DSGVO eingelegt haben, muss eine Abwägung zwischen Ihren und unseren Interessen vorgenommen werden. Solange noch nicht feststeht, wessen Interessen überwiegen, haben Sie das Recht, die Einschränkung der Verarbeitung Ihrer personenbezogenen Daten zu verlangen.
  mandatoryInfoProcessingRestrictionTitle: Recht auf Einschränkung der Verarbeitung
  mandatoryInfoResponsibleAddressCity: 34127 Kassel
  mandatoryInfoResponsibleAddressEmail: "E-Mail: contact+privacy-policy{'@'}maev.si"
  mandatoryInfoResponsibleAddressName: Jonas Thelemann
  mandatoryInfoResponsibleAddressOrganization: SciencePark, CoCreation-Lab
  mandatoryInfoResponsibleAddressStreet: Universitätsplatz 12
  mandatoryInfoResponsibleDescription1: 'Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:'
  mandatoryInfoResponsibleDescription2: Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten (z. B. Namen, E-Mail-Adressen o. Ä.) entscheidet.
  mandatoryInfoResponsibleTitle: Hinweis zur verantwortlichen Stelle
  mandatoryInfoSslTlsDescription1: Diese Seite nutzt aus Sicherheitsgründen und zum Schutz der Übertragung vertraulicher Inhalte, wie zum Beispiel Bestellungen oder Anfragen, die Sie an uns als Seitenbetreiber senden, eine SSL- bzw. TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie daran, dass die Adresszeile des Browsers von „http://“ auf „https://“ wechselt und an dem Schloss-Symbol in Ihrer Browserzeile.
  mandatoryInfoSslTlsDescription2: Wenn die SSL- bzw. TLS-Verschlüsselung aktiviert ist, können die Daten, die Sie an uns übermitteln, nicht von Dritten mitgelesen werden.
  mandatoryInfoSslTlsTitle: SSL- bzw. TLS-Verschlüsselung
  mandatoryInfoStorageDurationDescription: Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keinen anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben (z.B. steuer- oder handelsrechtliche Aufbewahrungsfristen); im letztgenannten Fall erfolgt die Löschung nach Fortfall dieser Gründe.
  mandatoryInfoStorageDurationTitle: Speicherdauer
  newsletter: 5. Newsletter
  newsletterDataDescription1: Wenn Sie den auf der Website angebotenen Newsletter beziehen möchten, benötigen wir von Ihnen eine E-Mail-Adresse sowie Informationen, welche uns die Überprüfung gestatten, dass Sie der Inhaber der angegebenen E-Mail-Adresse sind und mit dem Empfang des Newsletters einverstanden sind. Weitere Daten werden nicht bzw. nur auf freiwilliger Basis erhoben. Diese Daten verwenden wir ausschließlich für den Versand der angeforderten Informationen und geben diese nicht an Dritte weiter.
  newsletterDataDescription2: Die Verarbeitung der in das Newsletteranmeldeformular eingegebenen Daten erfolgt ausschließlich auf Grundlage Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO). Die erteilte Einwilligung zur Speicherung der Daten, der E-Mail-Adresse sowie deren Nutzung zum Versand des Newsletters können Sie jederzeit widerrufen, etwa über den „Austragen“-Link im Newsletter. Die Rechtmäßigkeit der bereits erfolgten Datenverarbeitungsvorgänge bleibt vom Widerruf unberührt.
  newsletterDataDescription3: Die von Ihnen zum Zwecke des Newsletter-Bezugs bei uns hinterlegten Daten werden von uns bis zu Ihrer Austragung aus dem Newsletter bei uns bzw. dem Newsletterdiensteanbieter gespeichert und nach der Abbestellung des Newsletters aus der Newsletterverteilerliste gelöscht. Daten, die zu anderen Zwecken bei uns gespeichert wurden bleiben hiervon unberührt.
  newsletterDataDescription4s: Sie können der Speicherung widersprechen, sofern Ihre Interessen unser berechtigtes Interesse überwiegen.
  newsletterDataDescription4: Nach Ihrer Austragung aus der Newsletterverteilerliste wird Ihre E-Mail-Adresse bei uns bzw. dem Newsletterdiensteanbieter ggf. in einer Blacklist gespeichert, um künftige Mailings zu verhindern. Die Daten aus der Blacklist werden nur für diesen Zweck verwendet und nicht mit anderen Daten zusammengeführt. Dies dient sowohl Ihrem Interesse als auch unserem Interesse an der Einhaltung der gesetzlichen Vorgaben beim Versand von Newslettern (berechtigtes Interesse im Sinne des Art. 6 Abs. 1 lit. f DSGVO). Die Speicherung in der Blacklist ist zeitlich nicht befristet. {strong}
  newsletterDataTitle: Newsletterdaten
  pluginsTools: 6. Plugins und Tools
  pluginsToolsFontAwesomeDescription1: Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten Font Awesome. Font Awesome ist lokal installiert. Eine Verbindung zu Servern von Fonticons, Inc. findet dabei nicht statt.
  pluginsToolsFontAwesomeDescription2s: https://fontawesome.com/privacy
  pluginsToolsFontAwesomeDescription2: 'Weitere Informationen zu Font Awesome finden Sie und in der Datenschutzerklärung für Font Awesome unter: {linkPrivacy}.'
  pluginsToolsFontAwesomeTitle: Font Awesome (lokales Hosting)
  pluginsToolsGoogleMapsDescription1: Diese Seite nutzt den Kartendienst Google Maps. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
  pluginsToolsGoogleMapsDescription2: Zur Nutzung der Funktionen von Google Maps ist es notwendig, Ihre IP-Adresse zu speichern. Diese Informationen werden in der Regel an einen Server von Google in den USA übertragen und dort gespeichert. Der Anbieter dieser Seite hat keinen Einfluss auf diese Datenübertragung.
  pluginsToolsGoogleMapsDescription3: Die Nutzung von Google Maps erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote und an einer leichten Auffindbarkeit der von uns auf der Website angegebenen Orte. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
  pluginsToolsGoogleMapsDescription4s1: https://privacy.google.com/businesses/gdprcontrollerterms/
  pluginsToolsGoogleMapsDescription4s2: https://privacy.google.com/businesses/gdprcontrollerterms/sccs/
  pluginsToolsGoogleMapsDescription4: 'Die Datenübertragung in die USA wird auf die Standardvertragsklauseln der EU-Kommission gestützt. Details finden Sie hier: {linkGdpr} und {linkGdprScss}.'
  pluginsToolsGoogleMapsDescription5s: https://policies.google.com/privacy?hl=de
  pluginsToolsGoogleMapsDescription5: 'Mehr Informationen zum Umgang mit Nutzerdaten finden Sie in der Datenschutzerklärung von Google: {linkPrivacy}.'
  pluginsToolsGoogleMapsTitle: Google Maps
  pluginsToolsGoogleReCaptchaDescription1: Wir nutzen „Google reCAPTCHA“ (im Folgenden „reCAPTCHA“) auf dieser Website. Anbieter ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
  pluginsToolsGoogleReCaptchaDescription2: Mit reCAPTCHA soll überprüft werden, ob die Dateneingabe auf dieser Website (z. B. in einem Kontaktformular) durch einen Menschen oder durch ein automatisiertes Programm erfolgt. Hierzu analysiert reCAPTCHA das Verhalten des Websitebesuchers anhand verschiedener Merkmale. Diese Analyse beginnt automatisch, sobald der Websitebesucher die Website betritt. Zur Analyse wertet reCAPTCHA verschiedene Informationen aus (z. B. IP-Adresse, Verweildauer des Websitebesuchers auf der Website oder vom Nutzer getätigte Mausbewegungen). Die bei der Analyse erfassten Daten werden an Google weitergeleitet.
  pluginsToolsGoogleReCaptchaDescription3: Die reCAPTCHA-Analysen laufen vollständig im Hintergrund. Websitebesucher werden nicht darauf hingewiesen, dass eine Analyse stattfindet.
  pluginsToolsGoogleReCaptchaDescription4: Die Speicherung und Analyse der Daten erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO. Der Websitebetreiber hat ein berechtigtes Interesse daran, seine Webangebote vor missbräuchlicher automatisierter Ausspähung und vor SPAM zu schützen. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
  pluginsToolsGoogleReCaptchaDescription5s1: https://policies.google.com/privacy?hl=de
  pluginsToolsGoogleReCaptchaDescription5s2: https://policies.google.com/terms?hl=de
  pluginsToolsGoogleReCaptchaDescription5: 'Weitere Informationen zu Google reCAPTCHA entnehmen Sie den Google-Datenschutzbestimmungen und den Google Nutzungsbedingungen unter folgenden Links: {linkPrivacy} und {linkTerms}.'
  pluginsToolsGoogleReCaptchaTitle: Google reCAPTCHA
  pluginsToolsGoogleWebFontsDescription1: Diese Seite nutzt zur einheitlichen Darstellung von Schriftarten so genannte Web Fonts, die von Google bereitgestellt werden. Die Google Fonts sind lokal installiert. Eine Verbindung zu Servern von Google findet dabei nicht statt.
  pluginsToolsGoogleWebFontsDescription2s1: https://developers.google.com/fonts/faq
  pluginsToolsGoogleWebFontsDescription2s2: https://policies.google.com/privacy?hl=de
  pluginsToolsGoogleWebFontsDescription2: 'Weitere Informationen zu Google Web Fonts finden Sie unter {linkFaq} und in der Datenschutzerklärung von Google: {linkPrivacy}.'
  pluginsToolsGoogleWebFontsTitle: Google Web Fonts (lokales Hosting)
  pluginsToolsYouTubeDescription1: Diese Website bindet Videos der YouTube ein. Betreiber der Seiten ist die Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Irland.
  pluginsToolsYouTubeDescription2: Wir nutzen YouTube im erweiterten Datenschutzmodus. Dieser Modus bewirkt laut YouTube, dass YouTube keine Informationen über die Besucher auf dieser Website speichert, bevor diese sich das Video ansehen. Die Weitergabe von Daten an YouTube-Partner wird durch den erweiterten Datenschutzmodus hingegen nicht zwingend ausgeschlossen. So stellt YouTube – unabhängig davon, ob Sie sich ein Video ansehen – eine Verbindung zum Google DoubleClick-Netzwerk her.
  pluginsToolsYouTubeDescription3: Sobald Sie ein YouTube-Video auf dieser Website starten, wird eine Verbindung zu den Servern von YouTube hergestellt. Dabei wird dem YouTube-Server mitgeteilt, welche unserer Seiten Sie besucht haben. Wenn Sie in Ihrem YouTube-Account eingeloggt sind, ermöglichen Sie YouTube, Ihr Surfverhalten direkt Ihrem persönlichen Profil zuzuordnen. Dies können Sie verhindern, indem Sie sich aus Ihrem YouTube-Account ausloggen.
  pluginsToolsYouTubeDescription4: Des Weiteren kann YouTube nach Starten eines Videos verschiedene Cookies auf Ihrem Endgerät speichern oder vergleichbare Wiedererkennungstechnologien (z.B. Device-Fingerprinting) einsetzen. Auf diese Weise kann YouTube Informationen über Besucher dieser Website erhalten. Diese Informationen werden u. a. verwendet, um Videostatistiken zu erfassen, die Anwenderfreundlichkeit zu verbessern und Betrugsversuchen vorzubeugen.
  pluginsToolsYouTubeDescription5: Gegebenenfalls können nach dem Start eines YouTube-Videos weitere Datenverarbeitungsvorgänge ausgelöst werden, auf die wir keinen Einfluss haben.
  pluginsToolsYouTubeDescription6: Die Nutzung von YouTube erfolgt im Interesse einer ansprechenden Darstellung unserer Online-Angebote. Dies stellt ein berechtigtes Interesse im Sinne von Art. 6 Abs. 1 lit. f DSGVO dar. Sofern eine entsprechende Einwilligung abgefragt wurde, erfolgt die Verarbeitung ausschließlich auf Grundlage von Art. 6 Abs. 1 lit. a DSGVO; die Einwilligung ist jederzeit widerrufbar.
  pluginsToolsYouTubeDescription7s: https://policies.google.com/privacy?hl=de
  pluginsToolsYouTubeDescription7: 'Weitere Informationen über Datenschutz bei YouTube finden Sie in deren Datenschutzerklärung unter: {linkPrivacy}.'
  pluginsToolsYouTubeTitle: YouTube mit erweitertem Datenschutz
  source: Quelle
  summary: 1. Datenschutz auf einen Blick
  title: Datenschutzerklärung
en:
  dataAcquisition: 4. Data collection on this website
  dataAcquisitionCommentsDescription: For the comment function on this page, in addition to your comment, information on the time of creation of the comment, your e-mail address and, if you do not post anonymously, the username you have chosen will be stored.
  dataAcquisitionCommentsIpDescription: Our comment function stores the IP addresses of users who post comments. Since we do not check comments on this website before they are activated, we need this data to be able to take action against the author in the event of legal violations such as insults or propaganda.
  dataAcquisitionCommentsIpTitle: IP address storage
  dataAcquisitionCommentsLegalBasisDescription: The storage of comments is based on your consent (Art. 6 para. 1 lit. a GDPR). You can revoke your consent at any time. For this purpose, an informal communication by e-mail to us is sufficient. The legality of the data processing operations already carried out remains unaffected by the revocation.
  dataAcquisitionCommentsLegalBasisTitle: Legal basis
  dataAcquisitionCommentsStorageDurationDescription: The comments and the associated data are stored and remain on this website until the commented content has been completely deleted or the comments have to be deleted for legal reasons (e.g. offensive comments).
  dataAcquisitionCommentsStorageDurationTitle: Comments storage period
  dataAcquisitionCommentsSubscribeDescription: As a user of the site, you can subscribe to comments after registering. You will receive a confirmation e-mail to verify that you are the owner of the e-mail address provided. You can unsubscribe from this function at any time via a link in the info e-mails. In this case, the data entered in the context of subscribing to comments will be deleted; however, if you have transmitted this data to us for other purposes and at another point (e.g. newsletter order), this data will remain with us.
  dataAcquisitionCommentsSubscribeTitle: Subscribe to comments
  dataAcquisitionCommentsTitle: Comment function on this website
  dataAcquisitionContactExternalDescription1: If you contact us by e-mail, telephone or fax, your inquiry including all resulting personal data (name, inquiry) will be stored and processed by us for the purpose of processing your request. We will not pass on this data without your consent.
  dataAcquisitionContactExternalDescription2: The processing of this data is based on Art. 6 (1) lit. b GDPR, if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of requests addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested.
  dataAcquisitionContactExternalDescription3: The data you send to us via contact requests will remain with us until you request us to delete it, revoke your consent to store it, or the purpose for storing the data no longer applies (e.g. after your request has been processed). Mandatory statutory provisions – in particular statutory retention periods – remain unaffected.
  dataAcquisitionContactExternalTitle: Request by e-mail, phone or fax
  dataAcquisitionContactFormDescription1: If you send us inquiries via the contact form, your data from the inquiry form including the contact data you provided there will be stored by us for the purpose of processing the inquiry and in case of follow-up questions. We do not pass on this data without your consent.
  dataAcquisitionContactFormDescription2: The processing of this data is based on Art. 6 (1) lit. b GDPR, if your request is related to the performance of a contract or is necessary for the implementation of pre-contractual measures. In all other cases, the processing is based on our legitimate interest in the effective processing of requests addressed to us (Art. 6 para. 1 lit. f GDPR) or on your consent (Art. 6 para. 1 lit. a GDPR) if this was requested.
  dataAcquisitionContactFormDescription3: The data you enter in the contact form will remain with us until you request us to delete it, revoke your consent to store it, or the purpose for storing the data no longer applies (e.g. after we have completed processing your request). Mandatory legal provisions – in particular retention periods – remain unaffected.
  dataAcquisitionContactFormTitle: Contact form
  dataAcquisitionCookiesDescription1: Our Internet pages use so-called „cookies“. Cookies are small text files and do not cause any damage to your end device. They are stored either temporarily for the duration of a session (session cookies) or permanently (permanent cookies) on your end device. Session cookies are automatically deleted at the end of your visit. Permanent cookies remain stored on your end device until you delete them yourself or until they are automatically deleted by your web browser.
  dataAcquisitionCookiesDescription2: In some cases, cookies from third-party companies may also be stored on your terminal device when you enter our site (third-party cookies). These enable us or you to use certain services of the third-party company (e.g. cookies for processing payment services).
  dataAcquisitionCookiesDescription3: Cookies have various functions. Many cookies are technically necessary, as certain website functions would not work without them (e.g. the login function). Other cookies are used to evaluate user behavior or to display advertising.
  dataAcquisitionCookiesDescription4: Cookies that are necessary to carry out the electronic communication process (necessary cookies) or to provide certain functions that you have requested (functional cookies, e.g. for the login function) or to optimize the website (e.g. cookies to measure the web audience) are stored on the basis of Art. 6 (1) lit. f GDPR, unless another legal basis is specified. The website operator has a legitimate interest in storing cookies for the technically error-free and optimized provision of its services. If consent to store cookies has been requested, the cookies in question are stored exclusively on the basis of this consent (Art. 6 para. 1 lit. a GDPR); consent can be revoked at any time.
  dataAcquisitionCookiesDescription5: You can set your browser so that you are informed about the setting of cookies and only allow cookies in individual cases, exclude the acceptance of cookies for certain cases or in general and activate the automatic deletion of cookies when closing the browser. When deactivating cookies, the functionality of this website may be limited.
  dataAcquisitionCookiesDescription6: If cookies are used by third-party companies or for analysis purposes, we will inform you about this separately within the framework of this data protection declaration and, if necessary, request your consent.
  dataAcquisitionCookiesTitle: Cookies
  dataAcquisitionLogDescription1: 'The provider of the pages automatically collects and stores information in so-called server log files, which your browser automatically transmits to us. These are:'
  dataAcquisitionLogDescription2: This data is not merged with other data sources.
  dataAcquisitionLogDescription3: The collection of this data is based on Art. 6 para. 1 lit. f GDPR. The website operator has a legitimate interest in the technically error-free presentation and optimization of its website – for this purpose, the server log files must be collected.
  dataAcquisitionLogItem1: browser type and version
  dataAcquisitionLogItem2: operating system used
  dataAcquisitionLogItem3: referrer URL
  dataAcquisitionLogItem4: host name of the accessing computer
  dataAcquisitionLogItem5: time of the server request
  dataAcquisitionLogItem6: IP address
  dataAcquisitionLogTitle: Server log files
  dataCollection: Data collection on this website
  dataCollectionLiabilityDescription: The data processing on this website is carried out by the website operator. You can find his contact details in the imprint of this website.
  dataCollectionLiabilityTitle: Who is responsible for the data collection on this website?
  dataCollectionMethodDescription1: Your data is collected on the one hand by you providing it to us. This can be, for example, data that you enter in a contact form.
  dataCollectionMethodDescription2: Other data is collected automatically or after your consent when you visit the website by our IT systems. This is mainly technical data (e.g. internet browser, operating system or time of page view). The collection of this data takes place automatically as soon as you enter this website.
  dataCollectionMethodTitle: How do we collect your data?
  dataCollectionRightsDescription1: You have the right at any time to receive information free of charge about the origin, recipient and purpose of your stored personal data. You also have a right to request the correction or deletion of this data. If you have given your consent to data processing, you can revoke this consent at any time for the future. You also have the right to request the restriction of the processing of your personal data under certain circumstances. Furthermore, you have the right to lodge a complaint with the competent supervisory authority.
  dataCollectionRightsDescription2: For this purpose, as well as for further questions on the subject of data protection, you can contact us at any time at the address given in the imprint.
  dataCollectionRightsTitle: What rights do you have regarding your data?
  dataCollectionToolsDescription1: When visiting this website, your surfing behavior can be statistically evaluated. This is done mainly with so-called analysis programs.
  dataCollectionToolsDescription2: Detailed information about these analysis programs can be found in the following privacy policy.
  dataCollectionToolsTitle: Third-party analytics and tools
  dataCollectionUseDescription: Some of the data is collected to ensure error-free provision of the website. Other data may be used to analyze your user behavior.
  dataCollectionUseTitle: What do we use your data for?
  generalNotesDescription: The following notices provide a simple overview of what happens to your personal data when you visit this website. Personal data is any data that can be used to identify you personally. For detailed information on the subject of data protection, please refer to our privacy policy listed below this text.
  generalNotesTitle: General notes
  hostingCdn: 2. Hosting and Content Delivery Networks (CDN)
  hostingCdnExternalAddressCity: 91710 Gunzenhausen, Deutschland
  hostingCdnExternalAddressName: Hetzner Online GmbH
  hostingCdnExternalAddressStreet: Industriestr. 25
  hostingCdnExternalDescription1: This website is hosted by an external service provider (hoster). The personal data collected on this website is stored on the hoster's servers. This may include IP addresses, contact requests, meta and communication data, contract data, contact data, names, website accesses and other data generated via a website.
  hostingCdnExternalDescription2: The hoster is used for the purpose of fulfilling contracts with our potential and existing customers (Art. 6 para. 1 lit. b GDPR) and in the interest of a secure, fast and efficient provision of our online offer by a professional provider (Art. 6 para. 1 lit. f GDPR).
  hostingCdnExternalDescription3: Our hoster will only process your data to the extent necessary to fulfill its service obligations and will follow our instructions regarding this data.
  hostingCdnExternalDescription4: 'We use the following hoster:'
  hostingCdnExternalProcessingContractDescription: To ensure data protection-compliant processing, we have concluded an order processing contract with our hoster.
  hostingCdnExternalProcessingContractTitle: Conclusion of a contract for order processing
  hostingCdnExternalTitle: External hosting
  mandatoryInfo: 3. General notes and mandatory information
  mandatoryInfoComplaintDescription: In the event of breaches of the GDPR, data subjects shall have a right of appeal to a supervisory authority, in particular in the Member State of their habitual residence, their place of work or the place of the alleged breach. The right of appeal is without prejudice to other administrative or judicial remedies.
  mandatoryInfoComplaintTitle: Right of appeal to the competent supervisory authority
  mandatoryInfoConsentRevocationDescription: Many data processing operations are only possible with your express consent. You can revoke consent you have already given at any time. The legality of the data processing carried out until the revocation remains unaffected by the revocation.
  mandatoryInfoConsentRevocationSpecialDescription1: IF THE DATA PROCESSING IS CARRIED OUT ON THE BASIS OF ART. 6 ABS. 1 LIT. E OR F GDPR, YOU HAVE THE RIGHT TO OBJECT TO THE PROCESSING OF YOUR PERSONAL DATA AT ANY TIME FOR REASONS ARISING FROM YOUR PARTICULAR SITUATION; THIS ALSO APPLIES TO PROFILING BASED ON THESE PROVISIONS. THE RESPECTIVE LEGAL BASIS ON WHICH PROCESSING IS BASED CAN BE FOUND IN THIS PRIVACY POLICY. IF YOU OBJECT, WE WILL NO LONGER PROCESS YOUR PERSONAL DATA UNLESS WE CAN DEMONSTRATE COMPELLING LEGITIMATE GROUNDS FOR THE PROCESSING WHICH OVERRIDE YOUR INTERESTS, RIGHTS AND FREEDOMS, OR THE PROCESSING SERVES THE PURPOSE OF ASSERTING, EXERCISING OR DEFENDING LEGAL CLAIMS (OBJECTION UNDER ARTICLE 21 (1) GDPR).
  mandatoryInfoConsentRevocationSpecialDescription2: IF YOUR PERSONAL DATA IS PROCESSED FOR THE PURPOSE OF DIRECT MARKETING, YOU HAVE THE RIGHT TO OBJECT AT ANY TIME TO THE PROCESSING OF PERSONAL DATA CONCERNING YOU FOR THE PURPOSE OF SUCH MARKETING; THIS ALSO APPLIES TO PROFILING INSOFAR AS IT IS CONNECTED WITH SUCH DIRECT MARKETING. IF YOU OBJECT, YOUR PERSONAL DATA WILL SUBSEQUENTLY NO LONGER BE USED FOR THE PURPOSE OF DIRECT MARKETING (OBJECTION PURSUANT TO ARTICLE 21 (2) GDPR).
  mandatoryInfoConsentRevocationSpecialTitle: Right to object to data collection in special cases and to direct marketing (Art. 21 GDPR)
  mandatoryInfoConsentRevocationTitle: Revocation of your consent to data processing
  mandatoryInfoDataChangeDescription: Within the framework of the applicable legal provisions, you have the right at any time to free information about your stored personal data, its origin and recipient and the purpose of data processing and, if necessary, a right to correction or deletion of this data. For this purpose, as well as for further questions on the subject of personal data, you can contact us at any time at the address given in the imprint.
  mandatoryInfoDataChangeTitle: Information, deletion and correction
  mandatoryInfoDataSharingUsaDescription: Among other things, tools from companies based in the USA are integrated on our website. If these tools are active, your personal data may be transferred to the US servers of the respective companies. We would like to point out that the USA is not a safe third country in the sense of EU data protection law. US companies are obliged to hand over personal data to security authorities without you as a data subject being able to take legal action against this. It can therefore not be ruled out that US authorities (e.g. intelligence services) process, evaluate and permanently store your data located on US servers for monitoring purposes. We have no influence on these processing activities.
  mandatoryInfoDataSharingUsaTitle: Note on data transfer to the USA
  mandatoryInfoOppositionDescription: The use of contact data published within the framework of the imprint obligation to send advertising and information materials not expressly requested is hereby prohibited. The operators of the pages expressly reserve the right to take legal action in the event of the unsolicited sending of advertising information, such as spam e-mails.
  mandatoryInfoOppositionTitle: Objection to advertising e-mails
  mandatoryInfoPortabilityDescription: You have the right to have data that we process automatically on the basis of your consent or in fulfillment of a contract handed over to you or to a third party in a common, machine-readable format. If you request the direct transfer of the data to another controller, this will only be done insofar as it is technically feasible.
  mandatoryInfoPortabilityTitle: Right to data portability
  mandatoryInfoPrivacyDescription1: The operators of these pages take the protection of your personal data very seriously. We treat your personal data confidentially and in accordance with the statutory data protection regulations and this privacy policy.
  mandatoryInfoPrivacyDescription2: When you use this website, various personal data are collected. Personal data is data with which you can be personally identified. This privacy policy explains what data we collect and what we use it for. It also explains how and for what purpose this is done.
  mandatoryInfoPrivacyDescription3: We point out that data transmission over the Internet (eg communication by e-mail) security gaps. A complete protection of the data against access by third parties is not possible.
  mandatoryInfoPrivacyTitle: Privacy
  mandatoryInfoProcessingRestrictionDescription1: 'You have the right to request the restriction of the processing of your personal data. To do this, you can contact us at any time at the address given in the imprint. The right to restriction of processing exists in the following cases:'
  mandatoryInfoProcessingRestrictionDescription2: If you have restricted the processing of your personal data, these data may be processed – apart from their storage – only with your consent or for the assertion, exercise or defense of legal claims or for the protection of the rights of another natural or legal person or for reasons of an important public interest of the European Union or a Member State.
  mandatoryInfoProcessingRestrictionList1: If you dispute the accuracy of your personal data stored by us, we usually need time to verify this. For the duration of the review, you have the right to request the restriction of the processing of your personal data.
  mandatoryInfoProcessingRestrictionList2: If the processing of your personal data happened/is happening unlawfully, you may request the restriction of data processing instead of erasure.
  mandatoryInfoProcessingRestrictionList3: If we no longer need your personal data, but you need it to exercise, defend or enforce legal claims, you have the right to request restriction of the processing of your personal data instead of deletion.
  mandatoryInfoProcessingRestrictionList4: If you have lodged an objection pursuant to Art. 21 (1) GDPR, a balancing of your and our interests must be carried out. As long as it has not yet been determined whose interests prevail, you have the right to request the restriction of the processing of your personal data.
  mandatoryInfoProcessingRestrictionTitle: Right to restriction of processing
  mandatoryInfoResponsibleAddressCity: 34127 Kassel
  mandatoryInfoResponsibleAddressEmail: "E-mail: contact+privacy-policy{'@'}maev.si"
  mandatoryInfoResponsibleAddressName: Jonas Thelemann
  mandatoryInfoResponsibleAddressOrganization: SciencePark, CoCreation-Lab
  mandatoryInfoResponsibleAddressStreet: Universitätsplatz 12
  mandatoryInfoResponsibleDescription1: 'The responsible party for data processing on this website is:'
  mandatoryInfoResponsibleDescription2: The controller is the natural or legal person who alone or jointly with others determines the purposes and means of the processing of personal data (e.g. names, e-mail addresses, etc.).
  mandatoryInfoResponsibleTitle: Note on the responsible body
  mandatoryInfoSslTlsDescription1: This site uses SSL or TLS encryption for security reasons and to protect the transmission of confidential content, such as orders or requests that you send to us as the site operator. You can recognize an encrypted connection by the fact that the address line of the browser changes from „http://“ to „https://“ and by the lock symbol in your browser line.
  mandatoryInfoSslTlsDescription2: If SSL or TLS encryption is activated, the data you transmit to us cannot be read by third parties.
  mandatoryInfoSslTlsTitle: SSL or TLS encryption
  mandatoryInfoStorageDurationDescription: Unless a more specific storage period has been specified within this privacy policy, your personal data will remain with us until the purpose for data processing no longer applies. If you assert a legitimate request for deletion or revoke your consent to data processing, your data will be deleted unless we have other legally permissible reasons for storing your personal data (e.g. retention periods under tax or commercial law); in the latter case, the data will be deleted once these reasons no longer apply.
  mandatoryInfoStorageDurationTitle: Storage duration
  newsletter: 5. Newsletter
  newsletterDataDescription1: If you would like to receive the newsletter offered on the website, we require an e-mail address from you as well as information that allows us to verify that you are the owner of the specified e-mail address and agree to receive the newsletter. Further data is not collected or only on a voluntary basis. We use this data exclusively for sending the requested information and do not pass it on to third parties.
  newsletterDataDescription2: The processing of the data entered in the newsletter registration form is based exclusively on your consent (Art. 6 para. 1 lit. a GDPR). You can revoke your consent to the storage of the data, the e-mail address and their use for sending the newsletter at any time, for example via the „unsubscribe“-link in the newsletter. The legality of the data processing operations already carried out remains unaffected by the revocation.
  newsletterDataDescription3: The data you provide for the purpose of receiving the newsletter will be stored by us or the newsletter service provider until you unsubscribe from the newsletter and will be deleted from the newsletter distribution list after you unsubscribe from the newsletter. Data that has been stored by us for other purposes remains unaffected by this.
  newsletterDataDescription4s: You can object to the storage if your interests outweigh our legitimate interest.
  newsletterDataDescription4: After you have unsubscribed from the newsletter distribution list, your e-mail address will be stored by us or the newsletter service provider in a blacklist, if necessary, in order to prevent future mailings. The data from the blacklist will only be used for this purpose and will not be merged with other data. This serves both your interest and our interest in complying with legal requirements when sending newsletters (legitimate interest within the meaning of Art. 6 (1) lit. f GDPR). The storage in the blacklist is not limited in time. {strong}
  newsletterDataTitle: Newsletter data
  pluginsTools: 6. Plugins and tools
  pluginsToolsFontAwesomeDescription1: This site uses Font Awesome for consistent font rendering. Font Awesome is installed locally. A connection to servers of Fonticons, Inc. does not take place.
  pluginsToolsFontAwesomeDescription2s: https://fontawesome.com/privacy
  pluginsToolsFontAwesomeDescription2: 'For more information about Font Awesome, please see and Font Awesome privacy policy at: {linkPrivacy}.'
  pluginsToolsFontAwesomeTitle: Font Awesome (local hosting)
  pluginsToolsGoogleMapsDescription1: This site uses the map service Google Maps. The provider is Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Ireland.
  pluginsToolsGoogleMapsDescription2: To use the functions of Google Maps, it is necessary to store your IP address. This information is usually transferred to a Google server in the USA and stored there. The provider of this site has no influence on this data transmission.
  pluginsToolsGoogleMapsDescription3: The use of Google Maps is in the interest of an appealing presentation of our online offers and an easy location of the places indicated by us on the website. This represents a legitimate interest within the meaning of Art. 6 para. 1 lit. f GDPR. If a corresponding consent has been requested, the processing is based exclusively on Art. 6 para. 1 lit. a GDPR; the consent can be revoked at any time.
  pluginsToolsGoogleMapsDescription4s1: https://privacy.google.com/businesses/gdprcontrollerterms/
  pluginsToolsGoogleMapsDescription4s2: https://privacy.google.com/businesses/gdprcontrollerterms/sccs/
  pluginsToolsGoogleMapsDescription4: 'Data transfer to the USA is based on the standard contractual clauses of the EU Commission. Details can be found here: {linkGdpr} and {linkGdprScss}.'
  pluginsToolsGoogleMapsDescription5s: https://policies.google.com/privacy?hl=en
  pluginsToolsGoogleMapsDescription5: "More information about the handling of user data can be found in Google's privacy policy: {linkPrivacy}."
  pluginsToolsGoogleMapsTitle: Google Maps
  pluginsToolsGoogleReCaptchaDescription1: We use „Google reCAPTCHA“ (hereinafter „reCAPTCHA“) on this website. The provider is Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Ireland.
  pluginsToolsGoogleReCaptchaDescription2: The purpose of reCAPTCHA is to check whether the data input on this website (e.g. in a contact form) is made by a human or by an automated program. For this purpose, reCAPTCHA analyzes the behavior of the website visitor based on various characteristics. This analysis begins automatically as soon as the website visitor enters the website. For the analysis, reCAPTCHA evaluates various information (e.g. IP address, time spent by the website visitor on the website or mouse movements made by the user). The data collected during the analysis is forwarded to Google.
  pluginsToolsGoogleReCaptchaDescription3: The reCAPTCHA analyses run completely in the background. Website visitors are not notified that an analysis is taking place.
  pluginsToolsGoogleReCaptchaDescription4: The storage and analysis of the data is based on Art. 6 para. 1 lit. f GDPR. The website operator has a legitimate interest in protecting its web offers from abusive automated spying and from SPAM. If a corresponding consent was requested, the processing is based exclusively on Art. 6 para. 1 lit. a GDPR; the consent can be revoked at any time.
  pluginsToolsGoogleReCaptchaDescription5s1: https://policies.google.com/privacy?hl=en
  pluginsToolsGoogleReCaptchaDescription5s2: https://policies.google.com/terms?hl=en
  pluginsToolsGoogleReCaptchaDescription5: 'For more information about Google reCAPTCHA, see the Google Privacy Policy and the Google Terms of Service at the following links: {linkPrivacy} and {linkTerms}.'
  pluginsToolsGoogleReCaptchaTitle: Google reCAPTCHA
  pluginsToolsGoogleWebFontsDescription1: This site uses so-called web fonts provided by Google for the uniform display of fonts. The Google Fonts are installed locally. A connection to Google servers does not take place.
  pluginsToolsGoogleWebFontsDescription2s1: https://developers.google.com/fonts/faq
  pluginsToolsGoogleWebFontsDescription2s2: https://policies.google.com/privacy?hl=en
  pluginsToolsGoogleWebFontsDescription2: "For more information about Google Web Fonts, see {linkFaq} and Google's privacy policy: {linkPrivacy}."
  pluginsToolsGoogleWebFontsTitle: Google Web Fonts (local hosting)
  pluginsToolsYouTubeDescription1: This website embeds videos from YouTube. The operator of the pages is Google Ireland Limited („Google“), Gordon House, Barrow Street, Dublin 4, Ireland.
  pluginsToolsYouTubeDescription2: We use YouTube in extended privacy mode. According to YouTube, this mode means that YouTube does not store any information about visitors to this website before they watch the video. The disclosure of data to YouTube partners, however, is not necessarily excluded by the extended data protection mode. Thus, YouTube establishes a connection to the Google DoubleClick network – regardless of whether you watch a video.
  pluginsToolsYouTubeDescription3: As soon as you start a YouTube video on this website, a connection to the YouTube servers is established. This tells the YouTube server which of our pages you have visited. If you are logged into your YouTube account, you enable YouTube to assign your surfing behavior directly to your personal profile. You can prevent this by logging out of your YouTube account.
  pluginsToolsYouTubeDescription4: Furthermore, after starting a video, YouTube may store various cookies on your end device or use comparable recognition technologies (e.g. device fingerprinting). In this way, YouTube can obtain information about visitors to this website. This information is used, among other things, to collect video statistics, improve the user experience, and prevent fraud attempts.
  pluginsToolsYouTubeDescription5: If necessary, further data processing operations may be triggered after the start of a YouTube video, over which we have no control.
  pluginsToolsYouTubeDescription6: YouTube is used in the interest of an appealing presentation of our online offers. This represents a legitimate interest within the meaning of Art. 6 Para. 1 lit. f GDPR. If a corresponding consent has been requested, the processing is based exclusively on Art. 6 para. 1 lit. a GDPR; the consent can be revoked at any time.
  pluginsToolsYouTubeDescription7s: https://policies.google.com/privacy?hl=en
  pluginsToolsYouTubeDescription7: 'For more information about privacy at YouTube, please see their privacy policy at: {linkPrivacy}.'
  pluginsToolsYouTubeTitle: YouTube with enhanced privacy
  source: Source
  summary: 1. Data protection at a glance
  title: Privacy policy
</i18n>
