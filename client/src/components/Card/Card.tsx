import React from 'react'
import {MdArrowForward} from 'react-icons/md'
import {CProps} from '../../types'

interface CardProps {
  title: string
  footer?: {link: string; title: string}
}

export const Card = ({title, footer, children}: CProps<CardProps>) => {
  return (
    <div className="border duration-300 ease-in-out hover:shadow-lg overflow-hidden shadow-md transition-shadow">
      <div className="p-4">
        <div className="cursor-pointer text-2xl">{title}</div>

        {children}
      </div>

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
