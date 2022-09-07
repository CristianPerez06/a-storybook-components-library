import React from 'react'
import { ComponentMeta, Story } from '@storybook/react'

import { Button, Sizes } from './Button'

const Def: ComponentMeta<typeof Button> = {
  title: 'Example/Button',
  component: Button,
}

export default Def

const PrimaryArgs = {
  label: 'Button',
  primary: true,
}
export const Primary: Story = () => <Button {...PrimaryArgs}></Button>

const SecondaryArgs = {
  label: 'Button',
}
export const Secondary: Story = () => <Button {...SecondaryArgs}></Button>

const LargeArgs = {
  size: Sizes.LARGE,
  label: 'Button',
}
export const Large: Story = () => <Button {...LargeArgs}></Button>

const SmallArgs = {
  size: Sizes.SMALL,
  label: 'Button',
}
export const Small: Story = () => <Button {...SmallArgs}></Button>
