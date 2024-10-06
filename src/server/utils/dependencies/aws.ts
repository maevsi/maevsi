import { GetSendQuotaCommand, SESClient } from '@aws-sdk/client-ses'
import { fromIni } from '@aws-sdk/credential-providers'

export const sesClient = new SESClient({
  credentials: fromIni({ profile: 'stomper' }),
  region: process.env.AWS_REGION || 'eu-central-1',
})

export const getMailsSentLast24Hours = async () => {
  const getSendQuotaCommand = new GetSendQuotaCommand({})
  const { SentLast24Hours } = await sesClient.send(getSendQuotaCommand)

  return SentLast24Hours
}
