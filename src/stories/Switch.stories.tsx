import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Switch } from '../components/switch/Switch'

const optionA = { label: 'Option A', value: 'label-a' }
const optionB = { label: 'Option B', value: 'label-b' }
const optionC = { label: 'Option C', value: 'label-c' }
const optionLongA = { label: 'This is a really long text that I want to show', value: 'label-long-a' }
const optionLongB = { label: 'This is also a really long text that I want to show here', value: 'label-long-b' }

const Template: ComponentStory<typeof Switch> = ({ ...args }) => <Switch {...args}></Switch>

export default {
  title: 'Components/Switch',
  component: Switch,
} as ComponentMeta<typeof Switch>

// Default
export const ADefault = Template.bind({})
ADefault.decorators = [
  (Story) => (
    <div style={{ width: 210 + 'px' }}>
      <Story />
    </div>
  ),
]

ADefault.storyName = 'Default'

ADefault.args = {
  name: 'default',
  options: [{ ...optionA, isSelected: true }, optionB],
}

// Long text
export const BLongText = Template.bind({})
BLongText.decorators = [
  (Story) => (
    <div style={{ width: 400 + 'px' }}>
      <Story />
    </div>
  ),
]

BLongText.storyName = 'Long text'

BLongText.args = {
  name: 'long-text',
  options: [{ ...optionLongA, isSelected: true }, optionLongB],
}

// Disabled
export const CDisabled = Template.bind({})
CDisabled.decorators = [
  (Story) => (
    <div style={{ width: 210 + 'px' }}>
      <Story />
    </div>
  ),
]

CDisabled.storyName = 'Disabled'

CDisabled.args = {
  name: 'disabled',
  options: [{ ...optionA, isSelected: true }, optionB],
  isDisabled: true,
}

// More options
export const DMoreOptions = Template.bind({})
DMoreOptions.decorators = [
  (Story) => (
    <div style={{ width: 400 + 'px' }}>
      <Story />
    </div>
  ),
]

DMoreOptions.storyName = 'More than 2 options'

DMoreOptions.args = {
  name: 'more-options',
  options: [optionA, { ...optionB, isSelected: true }, optionC],
}
