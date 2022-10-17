import { H3Event } from 'h3'

export default function (event: H3Event) {
  const { res } = event

  res.setHeader('Content-Type', 'text/plain')
  res.end('OK')
}
