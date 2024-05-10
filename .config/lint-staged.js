export default {
  '*.{js,json,ts,vue}': 'pnpm --dir src run lint:js',
  '*.{css,vue}': 'pnpm --dir src run lint:style',
}
