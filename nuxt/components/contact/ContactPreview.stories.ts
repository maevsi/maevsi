import ContactPreview from './ContactPreview.vue'
import { defineComponent } from '#app'

export default {
  component: ContactPreview,
  title: 'contact/ContactPreview',
}

const Template = (_: never, { argTypes }: { argTypes: any }) =>
  defineComponent({
    components: { ContactPreview },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<ContactPreview v-bind="$props">ContactPreview</ContactPreview>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  contact: {
    firstName: 'firstName',
    lastName: 'lastName',
  },
}
