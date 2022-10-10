import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Owner from './Owner.vue'

export default {
  component: Owner,
  title: 'Owner',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Owner },
    props: Object.keys(argTypes),
    template: '<Owner v-bind="$props">Owner</Owner>',
  })

export const Default = Template.bind({})
Default.args = {
  username: 'Owner',
}

export const Linked = Template.bind({})
Linked.args = {
  ...Default.args,
  link: true,
}
