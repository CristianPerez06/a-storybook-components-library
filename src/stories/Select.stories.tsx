import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Select } from '../components/select/Select'

const Template: ComponentStory<typeof Select> = ({ ...args }) => <Select {...args}></Select>

export default {
  title: 'Components/Select',
  component: Select,
} as ComponentMeta<typeof Select>

const SELECTED_OPTION = { value: '2', label: 'This one is the second option.' }

const OPTIONS = [
  {
    value: '1',
    label: 'Here you can find the first option.',
  },
  SELECTED_OPTION,
  { value: '3', label: 'Last but not least, you have here the third option.' },
]

// Default
export const ADefault = Template.bind({})

ADefault.storyName = 'Default'

ADefault.args = {
  name: 'field_name',
  options: OPTIONS,
}

// With option selected
export const BSelectedOption = Template.bind({})

BSelectedOption.storyName = 'With option selected'

BSelectedOption.args = {
  name: 'field_name',
  options: OPTIONS,
  defaultValue: SELECTED_OPTION.value,
  isOptional: true,
}

// With filtering
export const CFilter = Template.bind({})

CFilter.storyName = 'With filtering'

CFilter.args = {
  name: 'field_name',
  options: OPTIONS,
  isFilteringEnabled: true,
  isOptional: true,
}

// Disabled
export const DDisabled = Template.bind({})

DDisabled.storyName = 'Disabled'

DDisabled.args = {
  name: 'field_name',
  options: OPTIONS,
  disabled: true,
}

// No options
export const ENoOptions = Template.bind({})

ENoOptions.storyName = 'No options'

ENoOptions.args = {
  name: 'field_name',
  options: [],
}

// Required
export const FRequired = Template.bind({})

FRequired.storyName = 'Required'

FRequired.args = {
  name: 'field_name',
  options: OPTIONS,
}
