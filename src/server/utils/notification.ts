import camelcaseKeys from 'camelcase-keys'

import { sendEmail } from './email'
import { LOCALE_DEFAULT, type Locale } from './i18n'
import { HTML_TO_TEXT } from './dependencies/htmlToText'

const EVENT_DESCRIPTION_TRIM_LENGTH = 250
const TUSD_FILES_URL =
  'https://tusd.' + (process.env.STACK_DOMAIN || 'maevsi.test') + '/files/'

export const CHANNEL_NAME_ACCOUNT_PASSWORD_RESET =
  'account_password_reset_request'
export const CHANNEL_NAME_ACCOUNT_REGISTRATION = 'account_registration'
export const CHANNEL_NAME_EVENT_INVITATION = 'event_invitation'

export type Account = {
  email_address: string
  email_address_verification: string
  email_address_verification_valid_until: string
  password_reset_verification: string
  password_reset_verification_valid_until: string
  username: string
}

type Template = {
  language: Locale
  namespace: string
  variables: Record<string, unknown>
}

type MaevsiEvent = {
  id: number
  authorUsername: string
  description: string | null
  end: string | null // Date
  inviteeCountMaximum: number | null
  isArchived: boolean
  isInPerson: boolean
  isRemote: boolean
  location: string | null
  name: string
  slug: string
  start: string // Date
  visibility: 'public' | 'private'
}

type AccountPasswordResetRequestEvent = {
  channel: 'account_password_reset_request'
  payload: {
    account: Account
    template: Template
  }
}

type AccountRegistrationEvent = {
  channel: 'account_registration'
  payload: {
    account: Account
    template: Template
  }
}

type EventInvitationEvent = {
  channel: 'event_invitation'
  payload: {
    data: {
      emailAddress: string
      event: MaevsiEvent
      invitationId: string
      eventAuthorProfilePictureUploadStorageKey: string
      eventAuthorUsername: string
    }
    template: Template
  }
}

type ChannelEvent =
  | AccountPasswordResetRequestEvent
  | AccountRegistrationEvent
  | EventInvitationEvent

const locales = {
  [CHANNEL_NAME_ACCOUNT_PASSWORD_RESET]: {
    de: {
      subject: 'Passwort zurücksetzen',
    },
    en: {
      subject: 'Reset password',
    },
  },
  [CHANNEL_NAME_ACCOUNT_REGISTRATION]: {
    de: {
      subject: 'Registrierung abschließen',
    },
    en: {
      subject: 'Complete registration',
    },
  },
  [CHANNEL_NAME_EVENT_INVITATION]: {
    de: {
      eventAttendanceTypeInPerson: 'vor Ort',
      eventAttendanceTypeRemote: 'digital',
      eventIsArchived: 'archiviert',
      eventVisibilityIsPrivate: 'private',
      eventVisibilityIsPublic: 'öffentliche',
      subject: (eventName: string) => `Einladung: ${eventName}`,
    },
    en: {
      eventAttendanceTypeInPerson: 'in person',
      eventAttendanceTypeRemote: 'remote',
      eventIsArchived: 'archived',
      eventVisibilityIsPrivate: 'a private',
      eventVisibilityIsPublic: 'a public',
      subject: (eventName: string) => `Invitation: ${eventName}`,
    },
  },
} as const

export const processNotification = async ({
  channelEvent,
  id,
  is_acknowledged,
}: {
  channelEvent: ChannelEvent
  id: string
  is_acknowledged?: boolean
}) => {
  if (is_acknowledged) return

  const { channel, payload } = channelEvent

  const locale = payload.template.language as unknown as Locale

  switch (channel) {
    case CHANNEL_NAME_ACCOUNT_PASSWORD_RESET:
      await sendEmail({
        mailOptions: {
          subject: locales[channel][locale].subject,
          to: payload.account.email_address,
        },
        name: channel,
        props: {
          emailAddress: payload.account.email_address,
          locale,
          passwordResetVerificationLink: `https://${
            process.env.STACK_DOMAIN || 'maevsi.test'
          }${
            payload.template.language !== LOCALE_DEFAULT
              ? '/' + payload.template.language
              : ''
          }/account/password/reset?code=${
            payload.account.password_reset_verification
          }`,
          username: payload.account.username,
          validUntil: momentFormatDate({
            input: payload.account.password_reset_verification_valid_until,
            format: MOMENT_FORMAT,
            locale: payload.template.language,
          }),
        },
      })
      break
    case CHANNEL_NAME_ACCOUNT_REGISTRATION:
      await sendEmail({
        mailOptions: {
          subject: locales[channel][locale].subject,
          to: payload.account.email_address,
        },
        name: channel,
        props: {
          emailAddress: payload.account.email_address,
          emailAddressVerificationLink: `https://${
            process.env.STACK_DOMAIN || 'maevsi.test'
          }${
            payload.template.language !== LOCALE_DEFAULT
              ? '/' + payload.template.language
              : ''
          }/account/verify?code=${payload.account.email_address_verification}`,
          locale,
          username: payload.account.username,
          validUntil: momentFormatDate({
            input: payload.account.email_address_verification_valid_until,
            format: MOMENT_FORMAT,
            locale: payload.template.language,
          }),
        },
      })
      break
    case CHANNEL_NAME_EVENT_INVITATION:
      sendEventInvitationMail(channelEvent)
      break
    default:
      throw new Error(`Unexpected channel: ${channel}`)
  }

  await ack({
    id,
  })
}

const ack = async ({ id }: { id: string }) => {
  const response = await fetch('http://postgraphile:5000/graphql', {
    body: JSON.stringify({
      query: `mutation { notificationAcknowledge(input: { id: "${id}", isAcknowledged: true }) { clientMutationId } }`,
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })

  if (!response.ok)
    console.error(`Could not ack due to error: "${response.statusText}"`)
}

export const sendEventInvitationMail = async (
  channelEvent: EventInvitationEvent,
) => {
  const { channel, payload } = channelEvent
  const payloadCamelCased = camelcaseKeys(payload, { deep: true })

  const {
    emailAddress,
    event,
    invitationId,
    eventAuthorProfilePictureUploadStorageKey,
    eventAuthorUsername,
  } = payloadCamelCased.data

  const res = await (
    await fetch('http://maevsi:3000/api/ical', {
      body: JSON.stringify({
        contact: { emailAddress },
        event: {
          ...event,
          accountByAuthorAccountId: {
            username: eventAuthorUsername,
          },
        },
        invitation: {
          id: invitationId,
        },
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  ).text()

  if (!invitationId) {
    console.error(`Could not get invitation id ${invitationId}!`)
    return
  }

  if (!emailAddress) {
    console.error(`Could not get email address ${emailAddress}!`)
    return
  }

  if (!event) {
    console.error(`Could not get contact ${event}!`)
    return
  }

  const language = payloadCamelCased.template.language
  const t = locales[CHANNEL_NAME_EVENT_INVITATION][language]

  const eventAttendanceType = [
    ...(event.isInPerson ? [t.eventAttendanceTypeInPerson] : []),
    ...(event.isRemote ? [t.eventAttendanceTypeInPerson] : []),
  ].join(', ')

  let eventDescription

  if (event.description !== null) {
    eventDescription = HTML_TO_TEXT(
      event.description,
      // handlebars.compile(event.description)({
      //   contact: { emailAddress },
      //   event,
      //   invitation: {
      //     id: invitationId,
      //   },
      // }),
    )

    if (event.description.length > EVENT_DESCRIPTION_TRIM_LENGTH) {
      eventDescription =
        eventDescription.substring(0, EVENT_DESCRIPTION_TRIM_LENGTH) + '…'
    }
  }

  let eventVisibility

  if (event.isArchived) {
    eventVisibility = t.eventIsArchived
  } else if (event.visibility === 'public') {
    eventVisibility = t.eventVisibilityIsPublic
  } else if (event.visibility === 'private') {
    eventVisibility = t.eventVisibilityIsPrivate
  } else {
    throw new Error(
      `Event is neither archived nor has it a visibility of public or private: ${event}`,
    )
  }

  await sendEmail({
    mailOptions: {
      fromName: eventAuthorUsername,
      icalEvent: {
        content: res,
        filename: eventAuthorUsername + '_' + event.slug + '.ics',
        method: 'request',
      },
      subject: t.subject(event.name),
      to: emailAddress,
    },
    name: channel,
    props: {
      emailAddress,
      eventAttendanceType,
      eventAuthorProfileHref: `https://${
        process.env.STACK_DOMAIN || 'maevsi.test'
      }/accounts/${eventAuthorUsername}`,
      eventAuthorProfilePictureSrc: eventAuthorProfilePictureUploadStorageKey
        ? TUSD_FILES_URL + eventAuthorProfilePictureUploadStorageKey
        : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyAgUFVCTElDICctLy9XM0MvL0RURCBTVkcgMS4xLy9FTicgICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPgo8c3ZnIHdpZHRoPSI0MDFweCIgaGVpZ2h0PSI0MDFweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAzMTIuODA5IDAgNDAxIDQwMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIzMTIuODA5IDAgNDAxIDQwMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+Cgk8cmVjdCB4PSI2MDEuNDUiIHk9IjY1My4wNyIgd2lkdGg9IjQwMSIgaGVpZ2h0PSI0MDEiIGZpbGw9IiNFNEU2RTciLz4KCTxwYXRoIGQ9Im04MDIuMzggOTA4LjA4Yy04NC41MTUgMC0xNTMuNTIgNDguMTg1LTE1Ny4zOCAxMDguNjJoMzE0Ljc5Yy0zLjg3LTYwLjQ0LTcyLjktMTA4LjYyLTE1Ny40MS0xMDguNjJ6IiBmaWxsPSIjQUVCNEI3Ii8+Cgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+CjwvZz4KPC9zdmc+Cg==',
      eventAuthorUsername: eventAuthorUsername,
      eventDescription,
      eventDuration: event.end
        ? momentFormatDuration({
            start: event.start,
            end: event.end,
            format: MOMENT_FORMAT,
            locale: payloadCamelCased.template.language,
          })
        : undefined,
      // TODO: add event group (https://github.com/maevsi/maevsi/issues/92)
      eventLink: `https://${process.env.STACK_DOMAIN || 'maevsi.test'}${
        payloadCamelCased.template.language !== LOCALE_DEFAULT
          ? '/' + payloadCamelCased.template.language
          : ''
      }/invitation/unlock?ic=${invitationId}`,
      eventName: event.name,
      eventStart: momentFormatDate({
        input: event.start,
        format: MOMENT_FORMAT,
        locale: payloadCamelCased.template.language,
      }),
      eventVisibility,
      locale: payloadCamelCased.template.language,
    },
  })
}
