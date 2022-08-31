import { defineComponent } from '#app'
import MaevsiHeader from './Header.vue'

export default {
  component: MaevsiHeader,
  title: 'Header',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiHeader },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Header v-bind="$props">Header</Header>',
  })

export const Default = Template.bind({})
