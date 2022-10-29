import { useState, useCallback, useEffect, useRef } from 'react'

import { ChevronDownIcon } from '@heroicons/react/outline'
import cn from 'classnames'

import styles from './Select.module.scss'

export type Option = {
  value: string
  label: string
}

enum Positions {
  TOP = 'top',
  BOTTOM = 'BOTTOM',
}

const EMPTY_OPTION = { value: '', label: '' }

type SelectProps = {
  name: string
  options: Option[]
  defaultValue?: string
  placeholder?: string
  isOptional?: boolean
  disabled?: boolean
  isFilteringEnabled?: boolean
  onChange?: (value: string) => void
  hasError?: boolean
}

type Comp = (props: SelectProps) => JSX.Element

export const Select: Comp = (props: SelectProps) => {
  const {
    name,
    options,
    defaultValue = '',
    placeholder = 'Select an option',
    disabled = false,
    isOptional = false,
    isFilteringEnabled = false,
    onChange,
    hasError = false,
  } = props

  const [isOpen, setIsOpen] = useState(false)
  const [inputText, setInputText] = useState(defaultValue)
  const [selectedOption, setSelectedOption] = useState<Option>(EMPTY_OPTION)
  const [inputPlaceholder, setInputPlaceholder] = useState(placeholder)
  const [optionsList, setOptionsList] = useState(options)

  const wrapperRef = useRef<HTMLDivElement>(null)

  const getFilteredOptions = (value: string, options: Option[]) => {
    const regex = new RegExp(value, 'i')
    const filteredOptions = options.filter((o) => o.label.match(regex))

    return filteredOptions
  }

  useEffect(() => {
    if (defaultValue) {
      const opt = options.find((o) => o.value === defaultValue) || EMPTY_OPTION
      setInputText(opt.label)
      setInputPlaceholder(opt.label)
      setSelectedOption(opt)
    }
  }, [defaultValue, options])

  useEffect(() => {
    if (!isOpen) {
      // Refresh input value with selected one in case the user has changed it but didn't select a new one
      setInputText(selectedOption.label)
      return
    }

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node | null
      if (wrapperRef.current && !wrapperRef.current.contains(target)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, selectedOption])

  const handleInputClick = () => {
    if (isFilteringEnabled) {
      // When filtering is enabled we have to:
      // - Show the input placeholder (containing the selected option)
      setInputText('')
      // - Keep the Select component opened (if it's clicked)
      setIsOpen(true)
    } else {
      setIsOpen((prev) => !prev)
    }

    setOptionsList(options)
  }

  const handleOptionClick = useCallback(
    (option: Option) => {
      setInputText(option.label)
      setInputPlaceholder(option.label || 'Select an option')
      setSelectedOption(option)
      setIsOpen(false)

      onChange && onChange(option.value)
    },
    [onChange]
  )

  const handleInputChange = useCallback(
    (value: string) => {
      setInputText(value)

      const filteredOptions = !value ? options : getFilteredOptions(value, options)
      setOptionsList(filteredOptions)

      setIsOpen(true)
    },
    [options]
  )

  return (
    <div ref={wrapperRef} className={styles.wrapper}>
      <div className={styles.inputContainer}>
        <input
          name={name}
          readOnly={!isFilteringEnabled}
          className={cn(
            styles.input,
            styles.inputContent,
            !isFilteringEnabled && styles.noFiltering,
            !inputText && styles.placeholder,
            hasError && styles.error
          )}
          value={inputText}
          disabled={disabled}
          placeholder={inputPlaceholder}
          {...(!isFilteringEnabled &&
            !disabled && {
              onClick: () => handleInputClick(),
            })}
          {...(isFilteringEnabled &&
            !disabled && {
              onChange: (e) => handleInputChange(e.currentTarget.value),
              onFocus: () => handleInputClick(),
            })}
        />
        <ChevronDownIcon
          className={cn(styles.chevron, isOpen && styles.rotate, disabled && styles.disabled)}
          onClick={() => {
            if (disabled) return
            setIsOpen((prev) => !prev)
          }}
        />
      </div>
      {isOpen && (
        <div className={cn(styles.outerWrapper, styles[Positions.BOTTOM])}>
          <div className={styles.innerWrapper}>
            <ul className={styles.options}>
              {optionsList.length === 0 ? (
                <li className={styles.noOptions} onClick={() => setIsOpen(false)}>
                  No options
                </li>
              ) : (
                <>
                  {isOptional && (
                    <li
                      className={cn(styles.option, styles.placeholder)}
                      onClick={() => handleOptionClick(EMPTY_OPTION)}
                    >
                      Select an option
                    </li>
                  )}
                  {optionsList.map((option) => (
                    <li
                      key={option.value}
                      className={cn(styles.option, selectedOption.value === option.value && styles.isSelected)}
                      onClick={() => !disabled && handleOptionClick(option)}
                    >
                      {option.label}
                    </li>
                  ))}
                </>
              )}
            </ul>
          </div>
        </div>
      )}
    </div>
  )
}

export default Select
