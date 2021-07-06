import ContactAvatar from './ContactAvatar.vue'

export default {
  component: ContactAvatar,
  title: 'contact/ContactAvatar',
}

const Template = (_, { argTypes }) => ({
  components: { ContactAvatar },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ContactAvatar v-bind="$props" class="h-12 w-12">ContactAvatar</ContactAvatar>',
})

export const Default = Template.bind({})
Default.args = {
  size: '48',
}
