import { Contact } from './contact'
import { InvitationFeedback, InvitationFeedbackPaper } from '~/gql/generated'

export interface Invitation {
  contactByContactId?: Contact | null
  contactId: any
  eventId: any
  feedback?: InvitationFeedback | null
  feedbackPaper?: InvitationFeedbackPaper | null
  id: any
  nodeId: string
  uuid: string
}
