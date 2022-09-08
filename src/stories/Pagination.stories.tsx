import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Pagination } from '../components/pagination/Pagination'

const Template: ComponentStory<typeof Pagination> = ({ ...args }) => <Pagination {...args}></Pagination>

export default {
  title: 'Components/Pagination',
  component: Pagination,
  parameters: {
    layout: 'centered',
  },
} as ComponentMeta<typeof Pagination>

// Default
export const ADefault = Template.bind({})

ADefault.storyName = 'Default (7 pages)'

ADefault.args = {
  pageCount: 7,
}

// Custom
export const BCustom = Template.bind({})

BCustom.storyName = 'Custom (More than 7 pages)'

BCustom.args = {
  pageCount: 20,
}

// Custom
export const CDisabled = Template.bind({})

CDisabled.storyName = 'Disabled'

CDisabled.args = {
  pageCount: 20,
  selectedPage: 10,
  isDisabled: true,
}
