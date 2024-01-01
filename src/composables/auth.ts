import type { User } from '@auth/core/types'

export interface MaevsiUser extends User {
  maevsiUserId: string
}

export function useSignedInUser() {
  const { session } = useAuth()
  return computed(() => session.value?.user as MaevsiUser | undefined)
}
