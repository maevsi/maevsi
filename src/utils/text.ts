import clipboard from 'clipboardy'

export const copyText = async (text: string) => await clipboard.write(text)
