export class Upload {
  id: string
  sizeByte: number
  storageKey: string
  username: string
  uuid: string

  constructor(
    id: string,
    sizeByte: number,
    storageKey: string,
    username: string,
    uuid: string
  ) {
    this.id = id
    this.sizeByte = sizeByte
    this.storageKey = storageKey
    this.username = username
    this.uuid = uuid
  }
}
