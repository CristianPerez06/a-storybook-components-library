import { useState } from 'react'
import { useMediaQuery } from '@react-hook/media-query'

import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/outline'
import cn from 'classnames'

import Button, { Types } from './Button'
import styles from './Pagination.module.scss'

const ICON_SIZE = 10
const DEFAULT_FIRST_PAGE = 1

interface Settings {
  firstPage: number
  count: number
  limit: number
}

export interface PaginationConfig {
  pageNumbers: number[]
  showCollapsedFirstRange: boolean
  showCollapsedLastRange: boolean
  initialSettings: Settings
}

const getPaginationConfig = (count: number, selectedPage: number, initialSettings?: Settings) => {
  const settings: Settings = {
    firstPage: 1,
    count: 7,
    limit: 4,
    ...initialSettings,
  }

  const firstRange = []
  for (let i = settings.firstPage; i <= settings.limit; i++) {
    firstRange.push(i)
  }

  const lastRange = []
  for (let i = count; i > count - settings.limit; i--) {
    lastRange.push(i)
  }

  const paginationConfig: PaginationConfig = {
    pageNumbers: [],
    showCollapsedFirstRange: false,
    showCollapsedLastRange: false,
    initialSettings: settings,
  }

  let from = 0
  let to = 0

  // Page number: Included in First range - Included in Last range - Default pagination
  if (count <= settings.count) {
    from = settings.firstPage
    to = count
  }
  // Page number: Included in First range - Not included in Last range
  else if (firstRange.includes(selectedPage) && !lastRange.includes(selectedPage)) {
    from = settings.firstPage
    to = settings.limit + 1
    paginationConfig.showCollapsedLastRange = true
  }
  // Page number: Not included in First range - Included in Last range
  else if (!firstRange.includes(selectedPage) && lastRange.includes(selectedPage)) {
    from = count - settings.limit
    to = count
    paginationConfig.showCollapsedFirstRange = true
  }
  // Page number: Not included in First range - Not included in Last range
  else if (!firstRange.includes(selectedPage) && !lastRange.includes(selectedPage)) {
    from = selectedPage - 1
    to = selectedPage + 1
    paginationConfig.showCollapsedFirstRange = true
    paginationConfig.showCollapsedLastRange = true
  }

  for (let i = from; i <= to; i++) {
    paginationConfig.pageNumbers.push(i)
  }

  return paginationConfig
}

export interface PaginationProps {
  pageCount: number
  selectedPage?: number
  isDisabled?: boolean
  onChange: (pageNumber: number) => void
  className?: string
}

type Pagination = (props: PaginationProps) => JSX.Element

export const Pagination = (props: PaginationProps) => {
  const { className, pageCount, selectedPage = DEFAULT_FIRST_PAGE, isDisabled = false, onChange } = props

  const [currentPage, setCurrentPage] = useState<number>(selectedPage)

  const config = getPaginationConfig(pageCount, currentPage)

  const handleClick = (value: number) => {
    window.scrollTo(0, 0)
    setCurrentPage(value)
    onChange?.(value)
  }

  const isExtraSmallAndUp = useMediaQuery(`(min-width: 480px)`)

  return (
    <div className={cn(styles.container, className)} data-testid="pagination-container">
      <Button
        type={Types.ICON}
        content={<ChevronLeftIcon height={ICON_SIZE} width={ICON_SIZE} />}
        isDisabled={currentPage === config.initialSettings.firstPage || isDisabled}
        onClick={() => handleClick(currentPage - 1)}
        dataTestId="pagination-previous-button"
      />
      {isExtraSmallAndUp && (
        <div className={styles.desktopButtons}>
          {config.showCollapsedFirstRange && (
            <>
              <Button
                content={config.initialSettings.firstPage.toString()}
                isDisabled={isDisabled}
                onClick={() => handleClick(config.initialSettings.firstPage)}
                dataTestId="pagination-first-page-number-button"
              />
              <Button
                type={Types.SEPARATOR}
                content={'...'}
                isDisabled={isDisabled}
                className={styles.collapsedRange}
                dataTestId="pagination-collapsed-range"
              />
            </>
          )}
          {config.pageNumbers.map((pageNumber) => (
            <Button
              key={`page_` + pageNumber}
              content={pageNumber.toString()}
              isDisabled={isDisabled}
              isSelected={currentPage === pageNumber}
              onClick={() => {
                if (currentPage === pageNumber) return
                handleClick(pageNumber)
              }}
              dataTestId={'pagination-page-number-button'}
            />
          ))}
          {config.showCollapsedLastRange && (
            <>
              <Button
                type={Types.SEPARATOR}
                content={'...'}
                isDisabled={isDisabled}
                className={styles.collapsedRange}
                dataTestId="pagination-collapsed-range"
              />
              <Button
                content={pageCount.toString()}
                isDisabled={isDisabled}
                onClick={() => handleClick(pageCount)}
                dataTestId="pagination-last-page-number-button"
              />
            </>
          )}
        </div>
      )}
      <Button
        type={Types.ICON}
        content={<ChevronRightIcon height={ICON_SIZE} width={ICON_SIZE} />}
        isDisabled={currentPage === pageCount || isDisabled}
        onClick={() => handleClick(currentPage + 1)}
        dataTestId="pagination-next-button"
      />
    </div>
  )
}

export default Pagination
