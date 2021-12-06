import FormInput from './FormInput.vue'

import { defineComponent } from '#app'

export default {
  component: FormInput,
  title: 'form/input/FormInput',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormInput },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<FormInput v-bind="$props">FormInput</FormInput>',
  })

export const Default = Template.bind({})
