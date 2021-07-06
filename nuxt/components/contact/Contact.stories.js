import Contact from './Contact.vue'

export default {
  component: Contact,
  title: 'contact/Contact',
}

const Template = (_, { argTypes }) => ({
  components: { Contact },
  props: Object.keys(argTypes),
  // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
  template: '<Contact v-bind="$props">Contact</Contact>',
})

export const Default = Template.bind({})
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
    nodeId: 'WyJldmVudHMiLDFd',
  },
}
