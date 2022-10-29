import { ChangeEvent } from 'react'

import cn from 'classnames'

import styles from './TextArea.module.scss'

export interface TextAreaProps {
  /**
    Name that will identify the component.
  */
  name: string
  /**
    Default value that the TextArea will display.
  */
  defaultValue?: string | number
  /**
    Values that temporarily take the place of the final data.
  */
  placeholder?: string
  /**
    Sets whether an element is resizable.
  */
  isResizable?: number
  /**
    Specifies the visible height of a text area, in lines.
  */
  rows?: number
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
  onChange?: (e: ChangeEvent<HTMLTextAreaElement>) => void
}

type Comp = (props: TextAreaProps) => JSX.Element

export const TextArea: Comp = (props: TextAreaProps) => {
  const {
    name,
    defaultValue,
    placeholder,
    rows,
    isResizable,
    maxLength,
    isDisabled = false,
    isSuccess,
    isError,
    onChange,
  } = props

  return (
    <div className={styles.container}>
      <textarea
        name={name}
        defaultValue={defaultValue}
        placeholder={placeholder}
        maxLength={maxLength}
        disabled={isDisabled}
        rows={rows}
        className={cn(
          styles.textArea,
          !isResizable && styles.notResizable,
          isSuccess && styles.success,
          isError && styles.error
        )}
        onChange={onChange}
      />
    </div>
  )
}

export default TextArea
