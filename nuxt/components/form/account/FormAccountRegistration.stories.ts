import FormAccountRegistration from './FormAccountRegistration.vue'
import { defineComponent } from '#app'

export default {
  component: FormAccountRegistration,
  title: 'form/account/FormAccountRegistration',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormAccountRegistration },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormAccountRegistration v-bind="$props">FormAccountRegistration</FormAccountRegistration>',
  })

export const Default = Template.bind({})
