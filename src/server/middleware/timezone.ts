export default defineEventHandler(async (event) => {
  event.context.$timezone = await getTimezone(event)
})
