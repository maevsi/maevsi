import { Story } from '@storybook/vue3'
import { defineComponent } from 'vue'

import IconImages from './IconImages.vue'

const argTypes = { click: { action: 'click' } }

export default {
  component: IconImages,
  title: 'icon/IconImages',
  argTypes,
}

const Template: Story = (_, { argTypes }) =>
  defineComponent({
    components: { IconImages },
    props: Object.keys(argTypes),
    template:
      '<IconImages v-bind="$props" @click="click">IconImages</IconImages>',
  })

export const Default = Template.bind({})
