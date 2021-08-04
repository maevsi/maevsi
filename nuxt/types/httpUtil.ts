declare module '@http-util/status-i18n' {
  export default function status(
    statusCode: number | undefined,
    locale: string
  ): string | undefined
}
