export const zalgo = async <T>(maybePromise: T) =>
  import.meta.server ? await maybePromise : maybePromise
