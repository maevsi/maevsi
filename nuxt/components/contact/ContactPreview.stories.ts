import { defineComponent } from 'vue'
import ContactPreview from './ContactPreview.vue'

export default {
  component: ContactPreview,
  title: 'contact/ContactPreview',
}

const Template = (_: never, { argTypes }: { argTypes: any }) =>
  defineComponent({
    components: { ContactPreview },
    props: Object.keys(argTypes),
    template: '<ContactPreview v-bind="$props">ContactPreview</ContactPreview>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
}
