import camelcaseKeys from 'camelcase-keys'

import { sendEmail } from './email'
import { LOCALE_DEFAULT, type Locale } from './i18n'
import { HTML_TO_TEXT } from './dependencies/htmlToText'
import {
  MOMENT_FORMAT,
  momentFormatDate,
  momentFormatDuration,
} from './dependencies/moments'
import { EventVisibility } from '~~/gql/generated/graphql'

const EVENT_DESCRIPTION_TRIM_LENGTH = 250

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

type Event = {
  id: number
  authorUsername: string
  description: string | null
  end: string | null // Date
  guestCountMaximum: number | null
  isArchived: boolean
  isInPerson: boolean
  isRemote: boolean
  location: string | null
  name: string
  slug: string
  start: string // Date
  visibility: EventVisibility
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
      event: Event
      eventCreatorProfilePictureUploadStorageKey: string
      eventCreatorUsername: string
      guestId: string
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
      eventVisibilityIsUnlisted: 'ungelistete',
      subject: (eventName: string) => `Einladung: ${eventName}`,
    },
    en: {
      eventAttendanceTypeInPerson: 'in person',
      eventAttendanceTypeRemote: 'remote',
      eventIsArchived: 'archived',
      eventVisibilityIsPrivate: 'a private',
      eventVisibilityIsPublic: 'a public',
      eventVisibilityIsUnlisted: 'an unlisted',
      subject: (eventName: string) => `Invitation: ${eventName}`,
    },
  },
} as const

export const processNotification = async ({
  channelEvent,
  id,
  isAcknowledged,
  runtimeConfig,
  siteUrl,
  tusdFilesUrl,
}: {
  channelEvent: ChannelEvent
  id: string
  isAcknowledged?: boolean
  runtimeConfig: ReturnType<typeof useRuntimeConfig>
  siteUrl: string
  tusdFilesUrl: string
}) => {
  if (isAcknowledged) return

  const limit24h = isNaN(+runtimeConfig.public[SITE_NAME].email.limit24h)
    ? undefined
    : +runtimeConfig.public[SITE_NAME].email.limit24h

  if (!limit24h) {
    console.warn(
      `24h email limit is not a number, using default: ${MAEVSI_EMAIL_LIMIT_24H}`,
    )
  }

  const { channel, payload } = channelEvent
  const locale = payload.template.language

  switch (channel) {
    case CHANNEL_NAME_ACCOUNT_PASSWORD_RESET:
      await sendEmail({
        limit24h: limit24h || MAEVSI_EMAIL_LIMIT_24H,
        mailOptions: {
          subject: locales[channel][locale].subject,
          to: payload.account.email_address,
        },
        name: channel,
        props: {
          emailAddress: payload.account.email_address,
          locale,
          passwordResetVerificationLink: `${siteUrl}${
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
        limit24h: limit24h || MAEVSI_EMAIL_LIMIT_24H,
        mailOptions: {
          subject: locales[channel][locale].subject,
          to: payload.account.email_address,
        },
        name: channel,
        props: {
          emailAddress: payload.account.email_address,
          emailAddressVerificationLink: `${siteUrl}${
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
      sendEventInvitationMail({
        limit24h: limit24h || MAEVSI_EMAIL_LIMIT_24H,
        channelEvent,
        siteUrl,
        tusdFilesUrl,
      })
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

export const sendEventInvitationMail = async ({
  channelEvent,
  limit24h,
  siteUrl,
  tusdFilesUrl,
}: {
  channelEvent: EventInvitationEvent
  limit24h: number
  siteUrl: string
  tusdFilesUrl: string
}) => {
  const { channel, payload } = channelEvent
  const payloadCamelCased = camelcaseKeys(payload, { deep: true })

  const {
    emailAddress,
    event,
    guestId,
    eventCreatorProfilePictureUploadStorageKey,
    eventCreatorUsername,
  } = payloadCamelCased.data

  const res = await (
    await fetch(`http://${SITE_NAME}:3000/api/ical`, {
      body: JSON.stringify({
        contact: { emailAddress },
        event: {
          ...event,
          accountByCreatedBy: {
            username: eventCreatorUsername,
          },
        },
        guest: {
          id: guestId,
        },
      }),
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8',
      },
    })
  ).text()

  if (!guestId) {
    console.error(`Could not get guest id ${guestId}!`)
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
      //     id: guestId,
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
  } else if (event.visibility === EventVisibility.Public.toLowerCase()) {
    eventVisibility = t.eventVisibilityIsPublic
  } else if (event.visibility === EventVisibility.Private.toLowerCase()) {
    eventVisibility = t.eventVisibilityIsPrivate
  } else if (event.visibility === EventVisibility.Unlisted.toLowerCase()) {
    eventVisibility = t.eventVisibilityIsUnlisted
  } else {
    throw new Error(
      `Event is neither archived nor has it a visibility of public, unlisted or private: ${event}`,
    )
  }

  await sendEmail({
    limit24h,
    mailOptions: {
      fromName: eventCreatorUsername,
      icalEvent: {
        content: res,
        filename: eventCreatorUsername + '_' + event.slug + '.ics',
        method: 'request',
      },
      subject: t.subject(event.name),
      to: emailAddress,
    },
    name: channel,
    props: {
      emailAddress,
      eventAttendanceType,
      eventAuthorProfileHref: `${siteUrl}/accounts/${eventCreatorUsername}`,
      eventAuthorProfilePictureSrc: eventCreatorProfilePictureUploadStorageKey
        ? tusdFilesUrl + eventCreatorProfilePictureUploadStorageKey
        : 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPCFET0NUWVBFIHN2ZyAgUFVCTElDICctLy9XM0MvL0RURCBTVkcgMS4xLy9FTicgICdodHRwOi8vd3d3LnczLm9yZy9HcmFwaGljcy9TVkcvMS4xL0RURC9zdmcxMS5kdGQnPgo8c3ZnIHdpZHRoPSI0MDFweCIgaGVpZ2h0PSI0MDFweCIgZW5hYmxlLWJhY2tncm91bmQ9Im5ldyAzMTIuODA5IDAgNDAxIDQwMSIgdmVyc2lvbj0iMS4xIiB2aWV3Qm94PSIzMTIuODA5IDAgNDAxIDQwMSIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgdHJhbnNmb3JtPSJtYXRyaXgoMS4yMjMgMCAwIDEuMjIzIC00NjcuNSAtODQzLjQ0KSI+Cgk8cmVjdCB4PSI2MDEuNDUiIHk9IjY1My4wNyIgd2lkdGg9IjQwMSIgaGVpZ2h0PSI0MDEiIGZpbGw9IiNFNEU2RTciLz4KCTxwYXRoIGQ9Im04MDIuMzggOTA4LjA4Yy04NC41MTUgMC0xNTMuNTIgNDguMTg1LTE1Ny4zOCAxMDguNjJoMzE0Ljc5Yy0zLjg3LTYwLjQ0LTcyLjktMTA4LjYyLTE1Ny40MS0xMDguNjJ6IiBmaWxsPSIjQUVCNEI3Ii8+Cgk8cGF0aCBkPSJtODgxLjM3IDgxOC44NmMwIDQ2Ljc0Ni0zNS4xMDYgODQuNjQxLTc4LjQxIDg0LjY0MXMtNzguNDEtMzcuODk1LTc4LjQxLTg0LjY0MSAzNS4xMDYtODQuNjQxIDc4LjQxLTg0LjY0MWM0My4zMSAwIDc4LjQxIDM3LjkgNzguNDEgODQuNjR6IiBmaWxsPSIjQUVCNEI3Ii8+CjwvZz4KPC9zdmc+Cg==',
      eventAuthorUsername: eventCreatorUsername,
      eventDescription,
      eventDuration: event.end
        ? momentFormatDuration({
            start: event.start,
            end: event.end,
            format: MOMENT_FORMAT,
            locale: payloadCamelCased.template.language,
          })
        : undefined,
      // TODO: add event group (https://github.com/maevsi/vibetype/issues/92)
      eventLink: `${siteUrl}${
        payloadCamelCased.template.language !== LOCALE_DEFAULT
          ? '/' + payloadCamelCased.template.language
          : ''
      }/guest/unlock?ic=${guestId}`,
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
