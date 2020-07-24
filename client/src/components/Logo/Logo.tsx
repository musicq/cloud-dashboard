import React from 'react'
import {MdCloud} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {CProps} from '../../types'

interface LogoProps {
  reverse?: boolean
}

export const Logo = ({reverse = false}: CProps<LogoProps>) => {
  const cls = [
    'flex items-center text-3xl cursor-pointer',
    reverse ? 'text-white' : 'text-blue-500'
  ].join(' ')

  return (
    <Link to="/">
      <h1 className={cls}>
        <MdCloud className="mr-2" />
        Cloud dashboard
      </h1>
    </Link>
  )
}
