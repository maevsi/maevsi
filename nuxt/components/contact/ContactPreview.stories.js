import ContactPreview from './ContactPreview.vue'

export default {
  component: ContactPreview,
  title: 'contact/ContactPreview',
}

const Template = (_, { argTypes }) => ({
  components: { ContactPreview },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ContactPreview v-bind="$props">ContactPreview</ContactPreview>',
})

export const Default = Template.bind({})
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
}
