import { defineComponent } from 'vue'
import Hr from './Hr.vue'

export default {
  component: Hr,
  title: 'Hr',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Hr },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Hr v-bind="$props">Hr</Hr>',
  })

export const Default = Template.bind({})
