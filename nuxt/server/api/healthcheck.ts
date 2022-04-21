import { CompatibilityEvent } from 'h3'

export default function (event: CompatibilityEvent) {
  const { res } = event

  res.setHeader('Content-Type', 'text/plain')
  res.end('OK')
}
