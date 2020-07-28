import {RefObject, useMemo} from 'react'
import {Pos} from '../../types'

const EDGE_DETECTION_V = 33 + 11
const EDGE_DETECTION_H = 8

export function useActive(
  ref: RefObject<HTMLDivElement>,
  position: Pos
): boolean {
  return useMemo<boolean>(() => {
    if (!ref.current) {
      return false
    }

    const [x, y] = position

    const el = ref.current
    const offsetTop = el.offsetTop
    const offsetLeft = el.offsetLeft
    const width = el.offsetWidth
    const height = el.offsetHeight

    // check width
    const left = offsetLeft - EDGE_DETECTION_H
    const right = offsetLeft + width + EDGE_DETECTION_H
    let inHorizontalRange = left <= x && x < right

    // check height
    const top = offsetTop - EDGE_DETECTION_V
    const bottom = offsetTop + height + EDGE_DETECTION_V
    let inVerticalRange = top <= y && y < bottom

    return inHorizontalRange && inVerticalRange
  }, [ref, position])
}
