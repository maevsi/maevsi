import ButtonEventList from './ButtonEventList.vue'

export default {
  component: ButtonEventList,
  title: 'button/ButtonEventList',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonEventList },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonEventList v-bind="$props" @click="click">ButtonEventList</ButtonEventList>',
})

export const Default = Template.bind({})
