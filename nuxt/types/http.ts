import { IncomingMessage } from 'http'

export class IncomingMessageWithBody extends IncomingMessage {
  body?: any
}
