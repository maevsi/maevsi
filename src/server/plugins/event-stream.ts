import { IS_IN_STACK } from '~~/node'

const TOPIC_NOTIFICATION = `${SITE_NAME}.${SITE_NAME}_private.notification`

export default defineNitroPlugin(async (nitroApp) => {
  if (!IS_IN_STACK) return

  const runtimeConfig = useRuntimeConfig()
  const { siteUrl } = useSiteUrl()
  const tusdFilesUrl = useTusdFilesUrl()

  const { Kafka } = await import('kafkajs')
  const kafka = new Kafka({
    clientId: SITE_NAME,
    brokers: ['redpanda:9092'],
    retry: {
      retries: Number.POSITIVE_INFINITY,
      initialRetryTime: 30000,
      factor: 0,
      multiplier: 1,
      maxRetryTime: 30000,
    },
  })

  const consumer = kafka.consumer({ groupId: SITE_NAME })

  await consumer.connect()
  await consumer.subscribe({
    topics: [TOPIC_NOTIFICATION],
    fromBeginning: true,
  })

  await consumer.run({
    eachMessage: async ({ topic, message }) => {
      if (!message.key) throw new Error(`Message without key.`)
      if (!message.value) throw new Error(`Message without value.`)

      const key = JSON.parse(message.key.toString())
      const value = JSON.parse(message.value.toString())

      switch (topic) {
        case TOPIC_NOTIFICATION:
          try {
            await processNotification({
              channelEvent: {
                channel: value.payload.after.channel,
                payload: JSON.parse(value.payload.after.payload),
              },
              id: key.payload.id,
              isAcknowledged: value.payload.after.is_acknowledged,
              runtimeConfig,
              siteUrl,
              tusdFilesUrl,
            })
          } catch (error) {
            console.error(`Failed to process notification: ${error}`)
          }
          break
        default:
          console.error(`Unexpected topic: ${topic}`)
      }
    },
  })

  nitroApp.hooks.hookOnce('close', async () => {
    await consumer.disconnect()
  })
})
