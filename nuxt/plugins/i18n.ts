import { Context } from '@nuxt/types'

export default function ({ app, $moment }: Context) {
  app.i18n.onLanguageSwitched = (_oldLocale, newLocale) => {
    $moment.locale(newLocale)
  }
}
