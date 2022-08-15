import { defineComponent } from '#app'
import TipTap from './TipTap.vue'

export default {
  component: TipTap,
  title: 'TipTap',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { TipTap },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<TipTap v-bind="$props">TipTap</TipTap>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  value:
    '<p>Test <strong>strong</strong> <a href="https://example.com" target="_blank" rel="noopener noreferrer nofollow">link</a></p>',
}
