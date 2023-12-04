export type NotificationType =
  | 'mention'
  | 'status'
  | 'reblog'
  | 'follow'
  | 'follow_request'
  | 'favourite'
  | 'poll'
  | 'update'
  | 'admin.sign_up'
  | 'admin.report'

export interface PushPayload {
  access_token: string
  notification_id: string
  notification_type: NotificationType
  preferred_locale: string
  title: string
  body: string
  icon: string
}
