import { defineComponent } from 'vue'
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
      '<FormAccountRegistration v-bind="$props">FormAccountRegistration</FormAccountRegistration>',
  })

export const Default = Template.bind({})
