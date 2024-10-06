import { SendRawEmailCommand } from '@aws-sdk/client-ses'
import nodemailer from 'nodemailer'

import { sesClient } from './aws'

export const transporter = nodemailer.createTransport({
  SES: { ses: sesClient, aws: { SendRawEmailCommand } },
  sendingRate: 1, // one mail per second limit
})
