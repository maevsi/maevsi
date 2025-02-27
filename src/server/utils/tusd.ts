import { type H3Event, send } from 'h3'

export const deleteUpload = async (event: H3Event, uploadId: string) => {
  await executeQuery(profilePictureDelete({ uploadId }))
  await executeQuery(uploadDelete({ id: uploadId }))

  event.node.res.statusCode = 204
  await send(event)
}

export const useTusdFilesUrl = () => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()

  return getTusdFilesUrl({ siteUrl })
}
