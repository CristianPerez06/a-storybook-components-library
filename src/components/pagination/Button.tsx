import cn from 'classnames'

import styles from './Button.module.scss'

export enum Types {
  PAGE_NUMBER = 'number',
  SEPARATOR = 'separator',
  ICON = 'icon',
}

export interface ButtonProps {
  type?: Types.PAGE_NUMBER | Types.SEPARATOR | Types.ICON
  content: string
  isDisabled?: boolean
  isSelected?: boolean
  dataTestId?: string
  onClick: () => void
  className?: string
}

type Button = (props: ButtonProps) => JSX.Element

export const Button = (props: ButtonProps) => {
  const {
    type = Types.PAGE_NUMBER,
    content,
    isDisabled = false,
    isSelected = false,
    onClick,
    className,
    dataTestId,
  } = props

  return (
    <button
      className={cn(styles.button, className, isSelected && styles.selected, styles[type])}
      type="button"
      disabled={isDisabled}
      onClick={onClick}
      data-testid={dataTestId}
    >
      <div className={styles.content}>{content}</div>
    </button>
  )
}

export default Button
