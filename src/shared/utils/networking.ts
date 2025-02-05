import type { H3Event } from 'h3'

export const getSiteAndPort = (host: string) => {
  const hostParts = host.split('.')
  const hostPartsLast = hostParts[hostParts.length - 1]

  if (hostPartsLast && /^localhost(:[0-9]+)?$/.test(hostPartsLast))
    return hostPartsLast

  if (hostParts.length === 1) return hostParts[0]

  return `${hostParts[hostParts.length - 2]}.${hostPartsLast}`
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
    return `https://${nameSubdomainString}${getSiteAndPort(host)}`
  }
}
