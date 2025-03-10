# Contributing to Our Project

First off, thank you for considering contributing to our project! 🎉 We’re excited to have you on board and appreciate the effort you're putting into making our project better. Whether you’re a seasoned developer or a newbie, we believe every contribution counts, and this guide will help you get started.

We put continuous effort into making the contribution process as simple as possible. Please follow the steps below, and if you ever get stuck, don’t hesitate to ask questions – we're here to help!


## Guidelines

### Git & GitHub

To get started with open-source contributions and to ensure a structured approach, check out [@dargmuesli's Contributing Guidelines](https://gist.github.com/dargmuesli/430b7d902a22df02d88d1969a22a81b5#contribution-workflow).

Whenever switching branches, it makes sense to run `pnpm install` while the development server is stopped. This prevents issues with dependencies as they tend to differ between all branches.

### Semantic Versioning

Read [@dargmuesli's guide on Semantic Versioning](https://gist.github.com/dargmuesli/430b7d902a22df02d88d1969a22a81b5#file-semantic-versioning-md) to find out how to correctly format pull request, issue and commit titles and how this necessity speeds up our development.

### Vue

To allow you and other developers to quickly navigate through Vue Single-File Components many `pages` and `components` in this repository share a common structure in `script setup` that's inspired by [Vue's Options API](https://vueschool.io/articles/vuejs-tutorials/options-api-vs-composition-api/).
Such structure should be migrated to use [`composable`s](https://nuxt.com/docs/guide/directory-structure/composables) as explained in [this video by Alexander Lichter](https://www.youtube.com/watch?v=iKaDFAxzJyw).

1. import-like and meta elements have to be added first without preceding comments
    1. `import`: like `import { x } from 'y'`
    1. `definePageMeta`
    1. `use`: like `const { x } = useNuxtApp()`

1. below, elements that define the data structure of a component **require separation by comments**
    1. `// refs`: like `const x = ref<HTMLElement>()`
    1. `// api data`: like `const x = useXMutation()`
    1. `// data`: like `const x = ref(...)`
    1. `// computations`: like `const x = computed(() => y)`
    1. `// vuelidate`: rules and `const v$ = useVuelidate(rules, form)`
    1. `// methods`: use `const x = () => ...` instead of `function x() {...}`
    1. `// lifecycle`: like `onMounted()`, `watch()`, ... (in that order)
    1. `// initialization`: like `init()`, `useHeadDefault()`, ... (in that order)

If you find yourself adding empty lines to a Vue component's template to add structure to it, you should extract the separated parts into individual components.

### Playwright

We use [Playwright](https://playwright.dev/docs/intro) for end-to-end testing.
If your CI pipeline is failing because of incorrect test snapshots, `pnpm build` the application, update the snapshots using `pnpm test:e2e:docker:server:node:update` and commit the resulting changes if they match your expectation.

### Tailwind CSS

1. Follow [Tailwind's core concepts](https://tailwindcss.com/docs)
1. Use `flex` as spacing strategy, not `space-*` or `m-*` (except where this really doesn't make sense)

### TypeScript

1. Use `const` to define variables, not `let` (except where this really doesn't make sense)

### dargstack

Always do either frontend-only development using `pnpm dev` or fullstack development running [`maevsi/stack`](https://github.com/maevsi/stack).
You cannot run both at the same time as each development server writes different content to the `node_modules` directory.

When switching back from fullstack development to frontend-only development, `pnpm` will ask for permission to take back control of the dependency linking.
You can allow that.
