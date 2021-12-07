import { IncomingMessage, ServerResponse } from 'http'

export default function (_req: IncomingMessage, res: ServerResponse) {
  res.setHeader('Content-Type', 'text/plain')
  res.end('OK')
}
