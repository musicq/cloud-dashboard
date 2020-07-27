import React, {
  MouseEventHandler,
  RefObject,
  MouseEvent,
  useEffect,
  useLayoutEffect,
  useRef,
  useState
} from 'react'
import {classnames} from '../../shared/classnames'
import {noop} from '../../shared/noop'
import {CProps} from '../../types'
import {CardFooter} from './CardFooter'

interface CardProps {
  title: string
  footer?: {link: string; title: string}
  isDragging?: boolean
  collapse?: boolean
  onPositionChange?: (position: [number, number]) => void
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
}

const cardContainerCls =
  'bg-white border duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow select-none'

const Placeholder = () => (
  <div className="border bg-white w-full h-16 shadow-inner mb-3" />
)

function usePosition(
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

export const Card = React.memo(
  ({
    title,
    footer,
    isDragging = false,
    collapse = false,
    className = '',
    onPositionChange = noop,
    onMouseDown = noop,
    onMouseUp = noop,
    children
  }: CProps<CardProps>) => {
    const ref = useRef<HTMLDivElement>(null)
    const position = usePosition(ref, isDragging)

    useEffect(() => {
      onPositionChange(position)
    }, [position, onPositionChange])

    return (
      <>
        {isDragging && <Placeholder />}

        <div
          ref={ref}
          className={classnames(cardContainerCls, className, {
            'absolute w-1/3 z-10 opacity-75': isDragging
          })}
        >
          <div
            onMouseDown={onMouseDown}
            onMouseUp={onMouseUp}
            className={classnames(
              'text-2xl p-4 h-16 overflow-hidden',
              isDragging ? 'cursor-grabbing' : 'cursor-grab'
            )}
          >
            {title}
          </div>

          {!collapse && (
            <>
              <div className="px-4 pb-4">{children}</div>

              {footer && (
                <CardFooter link={footer.link}>{footer.title}</CardFooter>
              )}
            </>
          )}
        </div>
      </>
    )
  }
)
