import { useState, FC } from 'react'

import cn from 'classnames'

import styles from './Switch.module.scss'

export type SwitchOption = {
  label: string
  value: string
  isSelected?: boolean
}

export interface SwitchProps {
  /**
    Name that will identify the component.
  */
  name: string
  /**
    Enables/disables the component's interactions with the user.
  */
  isDisabled?: boolean
  /**
    Option list.
  */
  options: SwitchOption[]
  /**
    Handler that will be triggered every time a user changes the value.
  */
  onChange?: (value: string) => void
}

export const Switch: FC<SwitchProps> = (props) => {
  const { name, isDisabled = false, options: switchOptions, onChange } = props

  const [optionsList, setOptionsList] = useState<SwitchOption[]>(switchOptions)

  const handleClick = (value: string) => {
    onChange?.(value)
    const mappedOptions = optionsList.map((option) => ({ ...option, isSelected: value === option.value }))
    setOptionsList(mappedOptions)
  }

  return (
    <div tabIndex={0} className={cn(styles.container, isDisabled && styles.disabled)}>
      {optionsList.map(({ label, value, isSelected }) => {
        return (
          <label
            htmlFor={value}
            className={cn(styles.option, isSelected && styles.optionSelected, isDisabled && styles.disabled)}
            onClick={() => !isDisabled && handleClick(value)}
            key={value}
          >
            <input
              readOnly
              type="radio"
              id={value}
              name={name}
              className={styles.radioButton}
              value={value}
              checked={isSelected || false}
            />
            <span className={styles.text}>{label}</span>
          </label>
        )
      })}
    </div>
  )
}

export default Switch
