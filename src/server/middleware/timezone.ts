export default defineEventHandler(async (event) => {
  const timezone = await useTimezone()

  event.context.$timezone = timezone
})
