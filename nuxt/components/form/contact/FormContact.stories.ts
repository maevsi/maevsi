import FormContact from './FormContact.vue'

import { defineComponent } from '#app'

export default {
  component: FormContact,
  title: 'form/contact/FormContact',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormContact },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormContact v-bind="$props">FormContact</FormContact>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  contact: {},
}
