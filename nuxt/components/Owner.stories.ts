import Owner from './Owner.vue'
import { defineComponent } from '#app'

export default {
  component: Owner,
  title: 'Owner',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { Owner },
    props: Object.keys(argTypes),
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    template: '<Owner v-bind="$props">Owner</Owner>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  username: 'Owner',
}

export const Linked = Template.bind({})
// @ts-ignore
Linked.args = {
  // @ts-ignore
  ...Default.args,
  link: true,
}
