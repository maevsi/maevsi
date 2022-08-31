import { defineComponent } from '#app'
import MaevsiHr from './Hr.vue'

export default {
  component: MaevsiHr,
  title: 'Hr',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiHr },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Hr v-bind="$props">Hr</Hr>',
  })

export const Default = Template.bind({})
