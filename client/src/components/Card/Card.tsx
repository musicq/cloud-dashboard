import React, {MouseEventHandler, useState} from 'react'
import {MdArrowForward} from 'react-icons/md'
import {classnames} from '../../shared/classnames'
import {noop} from '../../shared/noop'
import {CProps} from '../../types'

interface CardProps {
  title: string
  footer?: {link: string; title: string}
  draggable?: boolean
  onMouseDown?: MouseEventHandler<HTMLDivElement>
  onMouseMove?: MouseEventHandler<HTMLDivElement>
  onMouseUp?: MouseEventHandler<HTMLDivElement>
}

export const Card = ({
  title,
  footer,
  className = '',
  draggable = false,
  onMouseDown = noop,
  onMouseMove = noop,
  onMouseUp = noop,
  children
}: CProps<CardProps>) => {
  const [isMouseDown, setMouseDown] = useState(false)

  const _onMouseDown: MouseEventHandler<HTMLDivElement> = e => {
    setMouseDown(true)
    onMouseDown(e)
  }

  const _onMouseUp: MouseEventHandler<HTMLDivElement> = e => {
    setMouseDown(false)
    onMouseUp(e)
  }

  return (
    <div
      className={classnames([
        'border duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow',
        className
      ])}
      onMouseDown={draggable ? _onMouseDown : noop}
      onMouseMove={draggable ? onMouseMove : noop}
      onMouseUp={draggable ? _onMouseUp : noop}
    >
      <div
        className={classnames('text-2xl', 'p-4', {
          'cursor-grab': draggable,
          'cursor-grabbing': isMouseDown
        })}
      >
        {title}
      </div>

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
    </div>
  )
}
