import {MouseEvent, RefObject, useLayoutEffect, useState} from 'react'

export function usePosition(
  ref: RefObject<HTMLDivElement>,
  isDragging: boolean
): [number, number] {
  const [position, setPosition] = useState<[number, number]>([0, 0])

  useLayoutEffect(() => {
    if (!ref.current || !isDragging) {
      return
    }

    const move = (e: MouseEvent<any>) => {
      if (!ref.current || !isDragging) {
        return
      }

      const el = ref.current

      const x = el.offsetWidth >> 1
      const y = el.offsetHeight >> 1

      el.style.left = e.clientX - x + 'px'
      el.style.top = e.clientY - y + 'px'

      setPosition([e.clientX, e.clientY])
    }

    document.addEventListener('mousemove', move as any)

    return () => document.removeEventListener('mousemove', move as any)
  }, [ref, isDragging])

  return position
}
