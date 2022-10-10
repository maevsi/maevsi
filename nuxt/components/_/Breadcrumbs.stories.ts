import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import Breadcrumbs from './Breadcrumbs.vue'

export default {
  component: Breadcrumbs,
  title: 'Breadcrumbs',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { Breadcrumbs },
    props: Object.keys(argTypes),
    template: '<Breadcrumbs v-bind="$props">Breadcrumbs</Breadcrumbs>',
  })

export const Default = Template.bind({})
