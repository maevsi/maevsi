import AppLink from './AppLink.vue'

export default {
  component: AppLink,
  title: 'AppLink',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { AppLink },
  props: Object.keys(argTypes),
  template: '<AppLink v-bind="$props" @click="click">AppLink</AppLink>',
})

export const Default = Template.bind({})
Default.args = {
  to: '/',
}

export const External = Template.bind({})
External.args = {
  to: 'https://example.com',
}
