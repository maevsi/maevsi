import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import MaevsiFooter from './Footer.vue'

export default {
  component: MaevsiFooter,
  title: 'Footer',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { MaevsiFooter },
    props: Object.keys(argTypes),
    template: '<Footer v-bind="$props">Footer</Footer>',
  })

export const Default = Template.bind({})
