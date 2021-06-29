import ButtonIcon from './ButtonIcon.vue'

export default {
  component: ButtonIcon,
  title: 'button/ButtonIcon',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { ButtonIcon },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonIcon v-bind="$props" @click="click">ButtonIcon</ButtonIcon>',
})

export const Default = Template.bind({})
Default.args = {
  ariaLabel: 'ButtonIcon',
  iconId: ['fas', 'home'],
}
