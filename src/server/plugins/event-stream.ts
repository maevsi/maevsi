import { IS_IN_STACK } from '../utils/constants'
import { processNotification } from '../utils/notification'

const TOPIC_NOTIFICATION = 'maevsi.maevsi_private.notification'

export default defineNitroPlugin(async (nitroApp) => {
  if (!IS_IN_STACK) return

  const { Kafka } = await import('kafkajs')
  const kafka = new Kafka({
    clientId: 'maevsi',
    brokers: ['redpanda:9092'],
  })

  const consumer = kafka.consumer({ groupId: 'maevsi' })

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
          // TODO: check why before is always null, even after updating a record
          // if (value.payload.before) return // only process newly inserted notifications

          try {
            await processNotification({
              channelEvent: {
                channel: value.payload.after.channel,
                payload: JSON.parse(value.payload.after.payload),
              },
              id: key.payload.id,
              is_acknowledged: value.payload.after.is_acknowledged,
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
