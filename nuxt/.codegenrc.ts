import type { CodegenConfig } from '@graphql-codegen/cli'

export default {
  schema: 'https://postgraphile.localhost/graphql',
  documents: ['gql/documents/**/*.ts'],
  hooks: { afterAllFileWrite: ['prettier --write', 'eslint --fix'] },
  // ignoreNoDocuments: true,
  generates: {
    './gql/generated/': {
      preset: 'client',
      config: {
        useTypeImports: true,
      },
    },
    'gql/generated/graphcache.ts': {
      plugins: ['typescript', 'typescript-urql-graphcache'],
    },
    'gql/generated/introspection.ts': {
      plugins: ['urql-introspection'],
    },
  },
} as CodegenConfig
