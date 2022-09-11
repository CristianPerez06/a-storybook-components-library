import { ChangeEvent, FC } from 'react'

import cn from 'classnames'

import styles from './Input.module.scss'

export interface InputProps {
  /**
    Name that will identify the component.
  */
  name: string
  /**
    Default value that the Input will display.
  */
  defaultValue?: string | number
  /**
    Values that temporarily take the place of the final data.
  */
  placeholder?: string
  /**
    Limits the length of the values that the component can contain.
  */
  maxLength?: number
  /**
    Enables/disables the component's interactions with the user.
  */
  isDisabled?: boolean
  /**
    Changes the styles to reflect a Success scenario.
  */
  isSuccess?: boolean
  /**
    Changes the styles to reflect an Error scenario.
  */
  isError?: boolean
  /**
    Handler that will be triggered every time a user changes the value.
  */
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input: FC<InputProps> = (props) => {
  const { name, defaultValue, placeholder, maxLength, isDisabled = false, isSuccess, isError, onChange } = props

  return (
    <div className={styles.container}>
      <input
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isDisabled}
        className={cn(styles.input, isSuccess && styles.success, isError && styles.error)}
        onChange={onChange}
      />
    </div>
  )
}

export default Input
