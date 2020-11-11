export default function ({ app }) {
  app.i18n.onLanguageSwitched = (_oldLocale, newLocale) => {
    app.$moment.locale(newLocale)
  }
}
