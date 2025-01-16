import { exec } from 'node:child_process'
import { promisify } from 'node:util'

const execPromise = promisify(exec)

export const RELEASE_NAME = async () =>
  process.env.RELEASE_NAME ||
  (await execPromise('git describe --tags')).stdout.trim()
