import Clipboard from 'clipboard'

export function copyText(text: string) {
  return new Promise(function (resolve, reject) {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: function () {
        return text
      },
      action: function () {
        return 'copy'
      },
      container: document.body,
    })
    clipboard.on('success', function (e) {
      clipboard.destroy()
      resolve(e)
    })
    clipboard.on('error', function (e) {
      clipboard.destroy()
      reject(e)
    })
    fakeElement.click()
  })
}
