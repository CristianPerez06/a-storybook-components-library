import { MutableRefObject, useCallback } from 'react'

export const useElementPosition = (ref: MutableRefObject<HTMLElement>) => {
  const getElementYPosition = useCallback(() => {
    return ref.current?.getBoundingClientRect().top + document.documentElement.scrollTop
  }, [ref])

  const getDocumentHeight = useCallback(() => {
    return document.body.offsetHeight
  }, [])

  return {
    getElementYPosition,
    getDocumentHeight,
  }
}
