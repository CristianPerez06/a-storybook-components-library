import cn from 'classnames'

import styles from './Button.module.scss'

export enum Types {
  PAGE_NUMBER = 'number',
  SEPARATOR = 'separator',
  ICON = 'icon',
}

export interface ButtonProps {
  type?: Types.PAGE_NUMBER | Types.SEPARATOR | Types.ICON
  content: string | JSX.Element
  isDisabled?: boolean
  isSelected?: boolean
  onClick?: () => void
  className?: string
}

type Comp = (props: ButtonProps) => JSX.Element

export const Button: Comp = (props: ButtonProps) => {
  const { type = Types.PAGE_NUMBER, content, isDisabled = false, isSelected = false, onClick, className } = props

  return (
    <button
      className={cn(styles.button, className, isSelected && styles.selected, styles[type])}
      type="button"
      disabled={isDisabled}
      onClick={onClick}
    >
      <div className={styles.content}>{content}</div>
    </button>
  )
}

export default Button
