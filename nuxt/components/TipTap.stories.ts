import TipTap from './TipTap.vue'
import { defineComponent } from '#app'

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
  value: '<p>Test <strong>strong</strong></p>',
}
