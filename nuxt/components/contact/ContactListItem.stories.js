import ContactListItem from './ContactListItem.vue'

export default {
  component: ContactListItem,
  title: 'contact/ContactListItem',
}

const Template = (_, { argTypes }) => ({
  components: { ContactListItem },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ContactListItem v-bind="$props">ContactListItem</ContactListItem>',
})

export const Default = Template.bind({})
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
    nodeId: 'WyJldmVudHMiLDFd',
  },
}
