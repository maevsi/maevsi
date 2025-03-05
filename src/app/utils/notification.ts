import type { SweetAlertIcon } from 'sweetalert2'
import colors from 'tailwindcss/colors'

export const showToast = async ({
  confirmButtonText,
  icon = 'success',
  showCancelButton = false,
  showConfirmButton = false,
  timer = 3000,
  text,
  title,
}: {
  confirmButtonText?: string
  icon?: SweetAlertIcon
  showCancelButton?: boolean
  showConfirmButton?: boolean
  timer?: number
  text?: string
  title: string
}) => {
  const Swal = (await import('sweetalert2')).default

  return Swal.fire({
    confirmButtonText,
    confirmButtonColor: colors.gray['800'],
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    },
    icon,
    position: 'bottom',
    showConfirmButton,
    showCancelButton,
    text,
    timer,
    timerProgressBar: true,
    title,
    toast: true,
  })
}
