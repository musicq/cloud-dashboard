import React, {useEffect, useRef} from 'react'
import {classnames} from '../../shared/classnames'
import {CProps, Pos} from '../../types'
import {useActive} from './DetectionArea.service'

interface DetectionAreaProps {
  index: Pos
  position: Pos
  onChange: (index: Pos) => void
}

export function DetectionArea({
  index,
  position,
  onChange,
}: CProps<DetectionAreaProps>) {
  const ref = useRef<HTMLDivElement>(null)

  const active = useActive(ref, position)

  useEffect(() => {
    // only pass the active one index
    if (active) {
      onChange(index)
    }
  }, [active, index, onChange])

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
