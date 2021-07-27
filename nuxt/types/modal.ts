export interface Modal {
  id: string
  contentBody?: string
  isVisible: boolean
  onSubmit?: () => void
}
