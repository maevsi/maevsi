import Button from './Button.vue'
import ButtonList from './ButtonList.vue'

export default {
  component: ButtonList,
  title: 'button/ButtonList',
  argTypes: { click: { action: 'click' } },
}

const Template = (_, { argTypes }) => ({
  components: { Button, ButtonList },
  props: Object.keys(argTypes),
  template:
    // eslint-disable-next-line @intlify/vue-i18n/no-raw-text
    '<ButtonList v-bind="$props" @click="click"><Button>ButtonList</Button><Button>ButtonList</Button><Button>ButtonList</Button><Button>ButtonList</Button><Button>ButtonList</Button></ButtonList>',
})

export const Default = Template.bind({})
