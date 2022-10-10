import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import MaevsiButton from './Button.vue'
import ButtonList from './ButtonList.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: ButtonList,
  title: 'button/ButtonList',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { MaevsiButton, ButtonList },
    props: Object.keys(argTypes),
    template:
      '<ButtonList v-bind="$props" @click="click"><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored><ButtonColored aria-label="ButtonColored">ButtonList</ButtonColored></ButtonList>',
  })

export const Default = Template.bind({})
