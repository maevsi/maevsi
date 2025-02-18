export const useOpenAi = () => {
  const event = useEvent()

  if (!event.context.$openAi) throw createError('openai')

  return event.context.$openAi
}
