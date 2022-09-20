import { defineComponent } from 'vue'
import MaevsiHr from './Hr.vue'

export default {
  component: MaevsiHr,
  title: 'Hr',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { MaevsiHr },
    props: Object.keys(argTypes),
    template: '<Hr v-bind="$props">Hr</Hr>',
  })

export const Default = Template.bind({})
