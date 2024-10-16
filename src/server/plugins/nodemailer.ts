import { transporter } from '../utils/dependencies/nodemailer'

export default defineNitroPlugin((nitroApp) => {
  nitroApp.hooks.hookOnce('close', () => {
    transporter.close()
  })
})
