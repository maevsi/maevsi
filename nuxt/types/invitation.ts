export type Feedback = 'ACCEPTED' | 'CANCELED' | null

export type FeedbackPaper = 'NONE' | 'PAPER' | 'DIGITAL' | null

export interface Invitation {
  id: any
  uuid: string

  feedback: Feedback
  feedbackPaper: FeedbackPaper
}
