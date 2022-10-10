import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import MaevsiHr from './Hr.vue'

export default {
  component: MaevsiHr,
  title: 'Hr',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { MaevsiHr },
    props: Object.keys(argTypes),
    template: '<Hr v-bind="$props">Hr</Hr>',
  })

export const Default = Template.bind({})
