import FormAccountPasswordResetRequest from './FormAccountPasswordResetRequest.vue'

export default {
  component: FormAccountPasswordResetRequest,
  title: 'form/account/password/FormAccountPasswordResetRequest',
}

const Template = (_, { argTypes }) => ({
  components: { FormAccountPasswordResetRequest },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<FormAccountPasswordResetRequest v-bind="$props">FormAccountPasswordResetRequest</FormAccountPasswordResetRequest>',
})

export const Default = Template.bind({})
