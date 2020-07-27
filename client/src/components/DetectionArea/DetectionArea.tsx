import React, {useEffect, useMemo, useRef} from 'react'
import {classnames} from '../../shared/classnames'
import {CProps} from '../../types'

interface DetectionAreaProps {
  first?: boolean
  last?: boolean
  left?: boolean
  right?: boolean
  index: [number, number]
  position: [number, number]
  onChange: (index: [number, number]) => void
}

const EDGE_DETECTION_V = 33 + 11
const EDGE_DETECTION_H = 8

export function DetectionArea({
  first = false,
  last = false,
  left = false,
  right = false,
  index,
  position,
  onChange
}: CProps<DetectionAreaProps>) {
  const ref = useRef<HTMLDivElement>(null)

  const active = useMemo<boolean>(() => {
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

    // edge cases
    // if (first) {
    //   // vertical only need cursor position less than offset top
    //   inVerticalRange = y <= offsetTop
    // }
    // if (last) {
    //   // vertical only need cursor position greater than (offsetTop +
    //   // offsetHeight)
    //   inVerticalRange = y >= offsetTop + height
    // }
    //
    // if (left) {
    //   inHorizontalRange = x <= offsetLeft
    // }
    // if (right) {
    //   inHorizontalRange = x >= offsetLeft + width
    // }

    return inHorizontalRange && inVerticalRange
  }, [ref, position])

  useEffect(() => {
    // only pass the active one index
    if (active) {
      onChange(index)
    }
  }, [active])

  return (
    <div
      ref={ref}
      className={classnames(
        'w-full h-1 mb-3',
        active ? 'bg-blue-500' : 'bg-gray-200'
      )}
    />
  )
}
