import { defineComponent } from '@nuxtjs/composition-api'
import FormAccountRegistration from './FormAccountRegistration.vue'

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
