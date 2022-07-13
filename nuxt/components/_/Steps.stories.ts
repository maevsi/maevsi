import { defineComponent } from '#app'
import Steps from './Steps.vue'

export default {
  component: Steps,
  title: 'Steps',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Steps },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Steps v-bind="$props">Steps</Steps>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {}
