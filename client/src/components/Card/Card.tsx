import React, {MouseEventHandler} from 'react'
import {MdArrowForward} from 'react-icons/md'
import {classnames} from '../../shared/classnames'
import {noop} from '../../shared/noop'
import {CProps} from '../../types'

interface CardProps {
  title: string
  footer?: {link: string; title: string}
  isDragging?: boolean
  collapse?: boolean
  position?: [number, number]
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseMove?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
}

const cardContainerCls =
  'bg-white border duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow select-none'

const Placeholder = () => (
  <div className="border bg-white w-full h-16 shadow-inner mb-3" />
)

export const Card = ({
  title,
  footer,
  isDragging = false,
  collapse = false,
  position = [0, 0],
  className = '',
  onMouseDown = noop,
  onMouseMove = noop,
  onMouseUp = noop,
  children
}: CProps<CardProps>) => {
  const _onMouseMove: MouseEventHandler<HTMLDivElement> = e => {
    if (!isDragging) return

    onMouseMove(e)
  }

  const cardPosition = {
    left: isDragging ? position[0] : 0,
    top: isDragging ? position[1] : 0
  }

  return (
    <>
      {isDragging && <Placeholder />}

      <div
        className={classnames(cardContainerCls, className, {
          'absolute w-1/3 z-10 opacity-75': isDragging
        })}
        style={cardPosition}
        onMouseDown={onMouseDown}
        onMouseMove={_onMouseMove}
        onMouseUp={onMouseUp}
      >
        <div
          className={classnames('text-2xl', 'p-4', 'h-16', 'overflow-hidden', {
            'cursor-grab': !isDragging,
            'cursor-grabbing': isDragging
          })}
        >
          {title}
        </div>

        {!collapse && (
          <>
            <div className="px-4 pb-4">{children}</div>

            {footer && (
              <a
                href={footer.link}
                className="block border-t h-full w-full p-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
                target="_blank"
                rel="noopener noreferrer"
              >
                <div className="flex items-center">
                  <MdArrowForward className="mr-4 text-2xl" />
                  {footer.title}
                </div>
              </a>
            )}
          </>
        )}
      </div>
    </>
  )
}
