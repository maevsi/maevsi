import OpenAI from 'openai'
import { zodResponseFormat } from 'openai/helpers/zod'
import { z } from 'zod'

export default defineEventHandler(async () => {
  const runtimeConfig = useRuntimeConfig()
  const openai = new OpenAI({
    apiKey: runtimeConfig.private.openai.apiKey,
  })

  const Event = z.object({
    id: z.string(),
    end: z.string(),
  })

  const completion = await openai.beta.chat.completions.parse({
    messages: [
      {
        role: 'system',
        content: `Export this event into json if the information is given else insert an empty string. Make sure:
          - proper casing and spelling is used.
          - the date format is ISO 8601`,
      },
      {
        role: 'user',
        content: INPUT,
      },
    ],
    model: 'gpt-4o-mini',
    response_format: zodResponseFormat(Event, 'event'),
  })
  return completion.choices[0].message.parsed
})

const INPUT = `Inhalt anspringen                         Menü            Workshopreihe „Wie künstliche Intelligenz den Alltag unterstützen kann"     Veranstaltungsinformationen Dienstag, 21. Januar 2025 10:00 Uhr – 11:30 Uhr Weitere Termine Di , 28 . 01 . 25 Di , 04 . 02 . 25 Di , 11 . 02 . 25 Di , 18 . 02 . 25 Links iCal-Export (Öffnet in einem neuen Tab) Dieser Kurs richtet sich an Seniorinnen und Senioren, die mehr über Künstliche Intelligenz (KI) erfahren und praktische Anwendungen von KI im Alltag kennenlernen möchten. Nach diesem Kurs werden die Teilnehmenden in der Lage sein, folgende Fragen zu beantworten: • Was ist Künstliche Intelligenz und wie funktioniert sie? • Welche Vorteile und Herausforderungen bringt Künstliche Intelligenz mit sich? • Wie kann Künstliche Intelligenz den Alltag unterstützen und erleichtern? • Wie kann man Künstliche Intelligenz sicher und verantwortungsvoll nutzen? Veranstalter: Smart Kassel Büro (Stadt Kassel) Eintrittspreis kostenlos Veranstaltungsort Stadtteiltreff Fasanenhof/Wolfsanger Karte öffnen (Geoportal) (Öffnet in einem neuen Tab) Routenplaner öffnen (Google Maps) (Öffnet in einem neuen Tab) ÖPNV -Verbindung (Öffnet in einem neuen Tab) Anschrift Hinter dem Fasanenhof 1 H 34125 Kassel Kontakt 0561 72904565 st-fawo DRK-Kassel de Veranstaltungserinnerung per Push-Mitteilung Lassen Sie sich erinnern! Sie erhalten eine Stunde vor Beginn der Veranstaltung eine Push-Mitteilung. Ziehen Sie dazu einfach den Schieberegler nach rechts auf „grün“. Dieser Service kann jederzeit über den Schieberegler oder in den Browser‐Einstellungen wieder abbestellt werden. Weitere Informationen finden Sie in unserer  Datenschutzerklärung . Die Push-Funktion wurde in Ihrem Browser deaktiviert oder wird nicht unterstützt. Quelle: Stadt Kassel      Vielen Dank fürs Weitersagen.                           Sie befinden sich hier: Startseite Veranstaltungskalender Workshopreihe „Wie künstliche Intelligenz den Alltag unterstützen kann"  Erläuterungen und Hinweise          Schnellzugriff Karriere bei der Stadt Veranstaltungen Politisches Informationssystem (Öffnet in einem neuen Tab) Baustellen Blitzer Einkaufen Parken Stadtplan Notfall-Seite Dialog Kontakt zur Stadt Kassel Feedback Pressekontakt Push-Mitteilungen Soziale Medien Newsletter Amtsblatt Elektronische Kommunikation Leichte Sprache Gebärdensprache Service Kassel-App Service Point in GALERIA Kassel Impressum Datenschutz­erklärung Rechtliche Hinweise Barrierefreiheit Sitemap Bankverbindung/SEPA    Herausgeber Stadt Kassel, documenta-Stadt Obere Königsstraße 8 / Rathaus 34117 Kassel Telefon: 0561 115 Telefax: 0561 787 2258 E-Mail:  info kassel de De-Mail:  service kassel.de-mail de   Besuchen Sie uns auch auf:      © 2025 Stadt Kassel                                          Um Ihnen die optimale Nutzung von kassel.de zu ermöglichen, verwenden wir Cookies. Für den Betrieb der Seite und grundlegende Funktionen werden technisch notwendige Cookies gesetzt. Eine Einwilligung Ihrerseits ist nicht erforderlich. Cookies zur Erfassung statistischer Daten können Sie ablehnen. Hier ablehnen OK                                           Suche      Hier Suchtext eingeben             Google Translate With Google Translate kassel.de can be translated into other languages. If you select a language, you leave kassel.de and retrieve content on Google servers. The city of Kassel has no influence on the processing of your data by Google. If you don‘t want your data to be transmitted to Google close this window by clicking "X". English (Öffnet in einem neuen Tab) 中文 (Zhōngwén), 汉语 / 漢語 (Hànyǔ) (Öffnet in einem neuen Tab) Español (Öffnet in einem neuen Tab) Türkçe (Öffnet in einem neuen Tab) Українська (Öffnet in einem neuen Tab) Nederlands, Vlaams (Öffnet in einem neuen Tab) Italiano (Öffnet in einem neuen Tab) polszczyzna (Öffnet in einem neuen Tab) dansk (Öffnet in einem neuen Tab) suomi (Öffnet in einem neuen Tab) Svenska (Öffnet in einem neuen Tab) Norsk (Öffnet in einem neuen Tab) slovenščina (Öffnet in einem neuen Tab) čeština (Öffnet in einem neuen Tab) magyar (Öffnet in einem neuen Tab) हिन्दी, हिंदी (Öffnet in einem neuen Tab) العربية (Öffnet in einem neuen Tab) Português (Öffnet in einem neuen Tab) বাংলা (Öffnet in einem neuen Tab) русский (Öffnet in einem neuen Tab) 日本語, (にほんご Nihongo) (Öffnet in einem neuen Tab) ꦧꦱꦗꦮ, Basa Jawa (Öffnet in einem neuen Tab) 한국어 (韓國語, Hangugeo) (Öffnet in einem neuen Tab) Française (Öffnet in einem neuen Tab) తెలుగు (Öffnet in einem neuen Tab) मराठी (Öffnet in einem neuen Tab) தமிழ் (Öffnet in einem neuen Tab) Tiếng Việt (Öffnet in einem neuen Tab) اردو (Öffnet in einem neuen Tab)`
