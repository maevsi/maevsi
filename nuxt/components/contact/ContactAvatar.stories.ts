import { defineComponent } from 'vue'
import ContactAvatar from './ContactAvatar.vue'

export default {
  component: ContactAvatar,
  title: 'contact/ContactAvatar',
}

const Template = (_: never, { argTypes }: any) =>
  defineComponent({
    components: { ContactAvatar },
    props: Object.keys(argTypes),
    template:
      '<ContactAvatar v-bind="$props" class="h-12 w-12">ContactAvatar</ContactAvatar>',
  })

export const Default = Template.bind({})
// @ts-ignore
Default.args = {
  size: '48',
}
