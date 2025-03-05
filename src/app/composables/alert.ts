import { consola } from 'consola'
import type { SweetAlertIcon, SweetAlertOptions } from 'sweetalert2'

export const useFireAlert = () => {
  const { t } = useI18n()

  return async (
    options: SweetAlertOptions & {
      error?: unknown
      level: SweetAlertIcon
    },
  ) => {
    const Swal = (await import('sweetalert2')).default
    const { error, title, level } = options

    if (error) {
      consola.error(error)
    }

    const iconTitleMapping = {
      error: {
        icon: 'error',
        title: title || t('globalStatusError'),
      },
      info: { icon: 'info' },
      question: { icon: 'question' },
      success: { icon: 'success' },
      warning: {
        icon: 'warning',
        title: title || t('globalStatusWarning'),
      },
    } as Record<SweetAlertIcon, { icon: SweetAlertIcon; title?: string }>

    return Swal.fire({
      ...options,
      ...iconTitleMapping[level],
    })
  }
}
