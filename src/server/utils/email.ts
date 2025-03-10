import type { ExtractComponentProps } from '@vue-email/render'
import { render } from '@vue-email/render'
import { z } from 'zod'

import EmailAccountPasswordResetRequest from '../assets/emails/EmailAccountPasswordResetRequest.vue'
import EmailAccountRegistration from '../assets/emails/EmailAccountRegistration.vue'
import EmailEventInvitation from '../assets/emails/EmailEventInvitation.vue'

import {
  CHANNEL_NAME_ACCOUNT_PASSWORD_RESET as EMAIL_NAME_ACCOUNT_PASSWORD_RESET,
  CHANNEL_NAME_ACCOUNT_REGISTRATION as EMAIL_NAME_ACCOUNT_REGISTRATION,
  CHANNEL_NAME_EVENT_INVITATION as EMAIL_NAME_EVENT_INVITATION,
} from './notification'
import { transporter } from './dependencies/nodemailer'
import {
  LOGO,
  LOGO_CID,
  PROFILE_PICTURE_JONAS,
  PROFILE_PICTURE_JONAS_CID,
} from './assets'
import { getMailsSentLast24Hours } from './dependencies/aws'

const emailConfig = {
  [EMAIL_NAME_ACCOUNT_PASSWORD_RESET]: {
    component: EmailAccountPasswordResetRequest,
    props: {} as ExtractComponentProps<typeof EmailAccountPasswordResetRequest>,
  },
  [EMAIL_NAME_ACCOUNT_REGISTRATION]: {
    component: EmailAccountRegistration,
    props: {} as ExtractComponentProps<typeof EmailAccountRegistration>,
  },
  [EMAIL_NAME_EVENT_INVITATION]: {
    component: EmailEventInvitation,
    props: {} as ExtractComponentProps<typeof EmailEventInvitation>,
  },
} as const
type EmailConfig = typeof emailConfig
export type EmailProps<T extends keyof EmailConfig> = EmailConfig[T]['props']

export const EMAIL_NAMES = z.enum([
  EMAIL_NAME_ACCOUNT_PASSWORD_RESET,
  EMAIL_NAME_ACCOUNT_REGISTRATION,
  EMAIL_NAME_EVENT_INVITATION,
])
export type EmailName = z.infer<typeof EMAIL_NAMES>

export const getEmail = async <T extends EmailName>({
  name,
  props,
}: {
  name: T
  props: EmailProps<T>
}) =>
  await getHtmlAndText({
    name,
    props,
  })

export const sendEmail = async <T extends EmailName>({
  limit24h,
  mailOptions,
  name,
  props,
}: {
  limit24h: number
  mailOptions: {
    fromName?: string
    icalEvent?: Record<string, unknown> // https://nodemailer.com/message/calendar-events/
    subject: string
    to: string
  }
  name: T
  props: EmailProps<T>
}) => {
  const { html, text } = await getHtmlAndText({
    name,
    props,
  })

  const developerMail = undefined

  if (import.meta.dev && !developerMail) {
    throw new Error(
      'Email not sent as `developerMail` must be defined in development!',
    )
  }

  const mailOptionsWithDefaults = {
    from: `"${mailOptions.fromName || SITE_NAME}" <noreply@maev.si>`,
    to: developerMail ? `Developer <${developerMail}>` : mailOptions.to,
    subject: mailOptions.subject,
    text,
    html,
    headers: {
      // // TODO: add https link (https://github.com/maevsi/vibetype/issues/326)
      // 'List-Unsubscribe-Post': 'List-Unsubscribe=One-Click',
      'List-Unsubscribe': {
        prepared: true,
        value: `mailto:contact+unsubscribe@maev.si?subject=Unsubscribe%20${mailOptions.to}`,
      },
    },
    // // TODO: wait for long line fix (https://github.com/nodemailer/nodemailer/issues/1694)
    // list: {
    //   // TODO: add https link (https://github.com/maevsi/vibetype/issues/326)
    //   unsubscribe: `mailto:contact+unsubscribe@maev.si?subject=Unsubscribe%20${mailOptions.to}`,
    // },
    attachments: [
      {
        filename: `${LOGO_CID}.png`,
        content: LOGO,
        cid: LOGO_CID,
      },
      ...([
        EMAIL_NAME_ACCOUNT_PASSWORD_RESET,
        CHANNEL_NAME_ACCOUNT_REGISTRATION,
      ].includes(name)
        ? [
            {
              filename: `${PROFILE_PICTURE_JONAS_CID}.png`,
              content: PROFILE_PICTURE_JONAS,
              cid: PROFILE_PICTURE_JONAS_CID,
            },
          ]
        : []),
    ],
  }

  if (
    process.env.NODE_ENV !== 'production' &&
    mailOptions.to.startsWith('mail+sqitch-')
  ) {
    console.debug(
      'Skipping mail sending for test data email accounts ("mail+sqitch-...").',
    )
    return
  }

  // TODO: implement proper rate limiting
  const sentLast24Hours = await getMailsSentLast24Hours()
  if (sentLast24Hours && sentLast24Hours > limit24h) {
    // TODO: notify admin
    throw new Error(
      `More than ${limit24h} mails sent in the last 24 hours, not sending any more for now to prevent spamming.`,
    )
  }

  transporter.sendMail(mailOptionsWithDefaults, (err, info) => {
    if (err) {
      console.error('Error sending email:', err)
    } else {
      console.log('Email sent:', info.response)
    }
  })
}

export const getHtmlAndText = async <T extends EmailName>({
  name,
  props,
}: {
  name: T
  props: EmailProps<T>
}) => {
  const component = emailConfig[name].component

  const html = await render(component, props, {
    pretty: import.meta.dev,
  })
  const text = await render(component, props, {
    plainText: true,
  })

  return {
    html,
    text,
  }
}
