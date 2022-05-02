import { Context } from '@nuxt/types-edge'

export default function ({ app, $moment }: Context) {
  app.i18n.onLanguageSwitched = (_oldLocale, newLocale) => {
    $moment.locale(newLocale)
  }
}
