import { defineComponent } from 'vue'
import ContactListItem from './ContactListItem.vue'

export default {
  component: ContactListItem,
  title: 'contact/ContactListItem',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { ContactListItem },
    props: Object.keys(argTypes),
    template:
      '<ContactListItem v-bind="$props">ContactListItem</ContactListItem>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
    nodeId: 'WyJldmVudHMiLDFd',
  },
}
