import { LOGO_BASE64 } from '../utils/assets'
import type { EmailName } from '../utils/email'
import { EMAIL_NAMES, getEmail } from '../utils/email'
import { Locale } from '../utils/i18n'
import { getQuerySafe } from '../utils/validation'
import { z } from 'zod'

const emailGetQuerySchema = z.object({
  locale: z.nativeEnum(Locale).default(Locale.EN),
  name: EMAIL_NAMES.optional(),
})

const logoSource = `data:image/png;base64,${LOGO_BASE64}`

const getDemoEmailProps = (locale: Locale) =>
  ({
    [EMAIL_NAMES.enum.account_password_reset_request]: {
      emailAddress: 'user@example.com',
      locale,
      logoSource,
      passwordResetVerificationLink:
        'https://example.com/reset-password?token=abcd1234',
      stackDomain: 'example.com',
      username: 'john_doe',
      validUntil: '2024-12-31T23:59:59Z',
    },
    [EMAIL_NAMES.enum.account_registration]: {
      emailAddress: 'newuser@example.com',
      emailAddressVerificationLink:
        'https://example.com/verify-email?token=verify5678',
      locale,
      logoSource,
      stackDomain: 'example.com',
      username: 'john_doe',
      validUntil: '2024-12-31T23:59:59Z',
    },
    [EMAIL_NAMES.enum.event_invitation]: {
      emailAddress: 'invitee@example.com',
      eventAttendanceType: 'in-person',
      eventAuthorProfileHref: 'https://example.com/profiles/author123',
      eventAuthorProfilePictureSrc:
        'https://example.com/images/author-profile.jpg',
      eventAuthorUsername: 'john_doe',
      eventDescription:
        'Join us for an exciting event on the future of technology and innovation.',
      eventDuration: '2 hours',
      eventLink: 'https://example.com/events/tech-event',
      eventName: 'Future of Tech 2024',
      eventStart: '2024-10-15T14:00:00Z',
      eventVisibility: 'public',
      logoSource,
      locale,
      stackDomain: 'example.com',
    },
  }) as const

const generateEmailContent = async (
  emailNames: EmailName[],
  locale: Locale,
): Promise<string> => {
  const demoEmailProps = getDemoEmailProps(locale)
  const allEmails = await Promise.all(
    emailNames.map(async (name) => {
      const demoProps = demoEmailProps[name]
      const email = await getEmail({ name, props: demoProps })
      return `<h2>${name}</h2>${email.html}<hr/><span style="white-space: pre;">${email.text}</span><hr/>`
    }),
  )
  return `<h1>Email preview</h1>${allEmails.join()}`
}

export default defineEventHandler(async (event) => {
  const query = await getQuerySafe({ event, schema: emailGetQuerySchema })
  const emailName = query.name
  const locale = query.locale
  const emailContent = emailName
    ? await generateEmailContent([emailName], locale)
    : await generateEmailContent(EMAIL_NAMES.options, locale)

  return emailContent
})
