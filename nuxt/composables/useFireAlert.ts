import consola from 'consola'
import Swal, { SweetAlertIcon } from 'sweetalert2'
import { Ref } from 'vue'

export const useFireAlert = () => {
  const { t } = useI18n()

  return ({
    error,
    level,
    text,
    title,
  }: {
    api?: Ref<any>
    error?: unknown
    level: SweetAlertIcon
    text?: string
    title?: string
  }) => {
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
      title,
      text,
      ...iconTitleMapping[level],
    })
  }
}
