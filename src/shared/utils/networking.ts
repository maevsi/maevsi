import type { H3Event } from 'h3'

export const getDomainTldPort = (host: string) => {
  const hostParts = host.split('.')

  if (/^localhost(:[0-9]+)?$/.test(hostParts[hostParts.length - 1]))
    return hostParts[hostParts.length - 1]

  if (hostParts.length === 1) return hostParts[0]

  return `${hostParts[hostParts.length - 2]}.${hostParts[hostParts.length - 1]}`
}

export const getHost = (event: H3Event) => {
  const host = event.node.req.headers.host

  if (!host) throw new Error('Host header is not given!')

  return host
}

export const getServiceHref = ({
  host,
  isSsr = true,
  name,
  port,
  stagingHost,
}: {
  host: string
  isSsr?: boolean
  name?: string
  port?: number
  stagingHost?: string
}) => {
  const nameSubdomain = name?.replaceAll('_', '-')
  const nameSubdomainString = nameSubdomain ? `${nameSubdomain}.` : ''
  const portString = port ? `:${port}` : ''

  if (stagingHost) {
    return `https://${nameSubdomainString}${stagingHost}`
    // TODO: remove disable below (https://github.com/nuxt/nuxt/issues/25323)
    // eslint-disable-next-line nuxt/prefer-import-meta
  } else if (isSsr && process.server) {
    return `http://${name}${portString}`
  } else {
    return `https://${nameSubdomainString}${getDomainTldPort(host)}`
  }
}
