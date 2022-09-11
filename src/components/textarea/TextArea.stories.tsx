import { ComponentStory, ComponentMeta } from '@storybook/react'

import { TextArea } from './TextArea'

const Template: ComponentStory<typeof TextArea> = ({ ...args }) => <TextArea {...args}></TextArea>

export default {
  title: 'Components/TextArea',
  component: TextArea,
} as ComponentMeta<typeof TextArea>

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

// With defined rows
export const GWithDefinedRows = Template.bind({})

GWithDefinedRows.storyName = 'With defined rows (10)'

GWithDefinedRows.args = {
  name: 'with-defined-rows',
  placeholder: 'A placeholder',
  defaultValue: 'A text',
  rows: 10,
}
