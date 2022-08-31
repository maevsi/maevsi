import { defineComponent } from '#app'
import MaevsiFooter from './Footer.vue'

export default {
  component: MaevsiFooter,
  title: 'Footer',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiFooter },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Footer v-bind="$props">Footer</Footer>',
  })

export const Default = Template.bind({})
