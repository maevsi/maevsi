import { z } from 'zod'

export const LOCALE_DEFAULT = 'en'

export enum Locale {
  DE = 'de',
  EN = 'en',
}
export const LocaleSchema = z.nativeEnum(Locale)
