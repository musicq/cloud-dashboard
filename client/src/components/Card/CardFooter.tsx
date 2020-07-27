import React from 'react'
import {MdArrowForward} from 'react-icons/md'
import {CProps} from '../../types'

interface CardFooterProps {
  link: string
}

export const CardFooter = ({link, children}: CProps<CardFooterProps>) => {
  return (
    <a
      href={link}
      className="block border-t h-full w-full p-4 hover:bg-gray-100 transition-colors duration-300 ease-in-out"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="flex items-center">
        <MdArrowForward className="mr-4 text-2xl"/>
        {children}
      </div>
    </a>
  )
}
