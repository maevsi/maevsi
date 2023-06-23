export const isTesting = () => process.client && window.Cypress

declare global {
  interface Window {
    Cypress: any
  }
}
