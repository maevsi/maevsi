# Contributing

Here are some guidelines to ensure a quick merge of your submissions!

## `script setup` order

To allow you and other developers to quickly navigate through Vue Single-File Components all `pages` and `components` in this repository share a common structure.

1. import-like and meta elements have to be added first without preceding comments
    1. `import`: like `import { x } from 'y'`
    1. `use`: like `const { x } = useNuxtApp()`
    1. `definePageMeta`

1. below, elements that define the data structure of a component **require separation by comments**
    1. `// refs`: like `const x = ref<HTMLElement>()`
    1. `// api data`: like `const x = useXMutation()`
    1. `// data`: like `const x = ref(...)`
    1. `// computations`: like `const x = computed(() => y)`
    1. `// vuelidate`: rules and `const v$ = useVuelidate(rules, form)`
    1. `// methods`: use `const x = () => ...` instead of `function x() {...}`
    1. `// lifecycle`: like `onMounted()`, `watch()`, ... (in that order)
    1. `// initialization`: like `init()`, `useHeadDefault()`, ... (in that order)
