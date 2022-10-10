import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import FooterCategory from './FooterCategory.vue'

export default {
  component: FooterCategory,
  title: 'FooterCategory',
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { FooterCategory },
    props: Object.keys(argTypes),
    template: '<FooterCategory v-bind="$props">FooterCategory</FooterCategory>',
  })

export const Default = Template.bind({})
Default.args = {
  heading: 'Heading',
}
