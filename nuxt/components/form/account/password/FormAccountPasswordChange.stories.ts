import FormAccountPasswordChange from './FormAccountPasswordChange.vue'

import { defineComponent } from '#app'

export default {
  component: FormAccountPasswordChange,
  title: 'form/account/password/FormAccountPasswordChange',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { FormAccountPasswordChange },
    props: Object.keys(argTypes),
    template:
      // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
      '<FormAccountPasswordChange v-bind="$props">FormAccountPasswordChange</FormAccountPasswordChange>',
  })

export const Default = Template.bind({})
