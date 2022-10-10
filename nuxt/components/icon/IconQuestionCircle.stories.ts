import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconQuestionCircle from './IconQuestionCircle.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconQuestionCircle,
  title: 'icon/IconQuestionCircle',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconQuestionCircle },
    props: Object.keys(argTypes),
    template:
      '<IconQuestionCircle v-bind="$props" @click="click">IconQuestionCircle</IconQuestionCircle>',
  })

export const Default = Template.bind({})
