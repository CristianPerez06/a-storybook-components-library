import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Button } from '../components/button/Button'

const Template: ComponentStory<typeof Button> = ({ ...args }) => <Button {...args}></Button>

export default {
  title: 'Components/Button',
  component: Button,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Button>

// Default
export const ADefault = Template.bind({})

ADefault.storyName = 'Default'

ADefault.args = {
  content: 'Click me!',
}
