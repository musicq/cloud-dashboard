import React, {MouseEventHandler, useEffect, useRef} from 'react'
import {WidgetConfig} from '../../services/projects.service'
import {classnames} from '../../shared/classnames'
import {noop} from '../../shared/noop'
import {CProps, Pos} from '../../types'
import {usePosition} from './Card.service'
import {CardFooter} from './CardFooter'

interface CardProps {
  title: string
  footer?: WidgetConfig
  isDragging?: boolean
  collapse?: boolean
  onPositionChange?: (position: Pos) => void
  onMouseDown?: MouseEventHandler<HTMLDivElement>
}

const Placeholder = () => (
  <div className="border bg-white w-full h-16 shadow-inner mb-3" />
)

export const Card = React.memo(
  ({
    title,
    footer,
    isDragging = false,
    collapse = false,
    className = '',
    onPositionChange = noop,
    onMouseDown = noop,
    children
  }: CProps<CardProps>) => {
    const ref = useRef<HTMLDivElement>(null)
    const position = usePosition(ref, isDragging)

    useEffect(() => {
      onPositionChange(position)
    }, [position])

    return (
      <>
        {isDragging && <Placeholder />}

        <div
          ref={ref}
          className={classnames(
            'bg-white duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow select-none',
            className,
            {'absolute w-1/3 z-10 opacity-75': isDragging}
          )}
        >
          <div
            onMouseDown={onMouseDown}
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
                <CardFooter link={footer.link}>{footer.name}</CardFooter>
              )}
            </>
          )}
        </div>
      </>
    )
  }
)
