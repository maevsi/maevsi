import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconParagraph from './IconParagraph.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconParagraph,
  title: 'icon/IconParagraph',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconParagraph },
    props: Object.keys(argTypes),
    template:
      '<IconParagraph v-bind="$props" @click="click">IconParagraph</IconParagraph>',
  })

export const Default = Template.bind({})
