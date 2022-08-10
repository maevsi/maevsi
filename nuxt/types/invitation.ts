import { Contact } from './contact'
import { InvitationFeedback, InvitationFeedbackPaper } from '~/gql/generated'

export interface Invitation {
  contactByContactId?: Contact
  contactId: any
  eventId: any
  feedback?: InvitationFeedback
  feedbackPaper?: InvitationFeedbackPaper
  id: any
  nodeId: string
  uuid: string
}
