import { useQuery } from '@urql/vue'
import { graphql } from '~~/gql/generated'
import type { AllAchievementsQueryVariables } from '~~/gql/generated/graphql'

export const useAllAchievementsQuery = (
  variables: AllAchievementsQueryVariables,
) =>
  useQuery({
    query: graphql(`
      query allAchievements($accountId: UUID) {
        allAchievements(condition: { accountId: $accountId }) {
          nodes {
            ...AchievementItem
          }
        }
      }
    `),
    variables,
  })
