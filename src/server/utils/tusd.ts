import { type H3Event, send } from 'h3'

export const deleteUpload = async (event: H3Event, uploadId: string) => {
  await executeQuery(
    sql`DELETE FROM maevsi.profile_picture WHERE upload_id = ${uploadId}`,
  )
  await executeQuery(sql`DELETE FROM maevsi.upload WHERE id = ${uploadId}`)

  event.node.res.statusCode = 204
  await send(event)
}

export const useTusdFilesUrl = () => {
  const { siteUrlTyped: siteUrl } = useSiteUrl()

  return getTusdFilesUrl({ siteUrl })
}
