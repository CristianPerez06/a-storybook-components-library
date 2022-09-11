import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Input } from './Input'

const Template: ComponentStory<typeof Input> = ({ ...args }) => <Input {...args}></Input>

export default {
  title: 'Components/Input',
  component: Input,
} as ComponentMeta<typeof Input>

// Default
export const ADefault = Template.bind({})

ADefault.storyName = 'Default with no text'

ADefault.args = {
  name: 'default-no-text',
  placeholder: 'A placeholder',
}

// Default with Text
export const BWithText = Template.bind({})

BWithText.storyName = 'Default with text'

BWithText.args = {
  name: 'default-with-text',
  placeholder: 'A placeholder',
  defaultValue: 'A text',
}

// Success
export const CSuccess = Template.bind({})

CSuccess.storyName = 'Success'

CSuccess.args = {
  ...ADefault.args,
  name: 'success',
  isSuccess: true,
}

// Fail
export const DFail = Template.bind({})

DFail.storyName = 'Error'

DFail.args = {
  ...ADefault.args,
  name: 'error',
  isError: true,
}

// Disabled
export const EDisabled = Template.bind({})

EDisabled.storyName = 'Disabled'

EDisabled.args = {
  name: 'disabled',
  defaultValue: 'A text',
  isDisabled: true,
}

// With max length
export const FWithMaxLength = Template.bind({})

FWithMaxLength.storyName = 'With max length (30)'

FWithMaxLength.args = {
  name: 'with-max-length',
  placeholder: 'A placeholder',
  defaultValue: 'A text',
  maxLength: 30,
}
