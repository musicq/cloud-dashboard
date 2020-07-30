import React from 'react'
import {MdCloud} from 'react-icons/md'
import {Link} from 'react-router-dom'
import {classnames} from '../../shared/classnames'
import {CProps} from '../../types'

interface LogoProps {
  reverse?: boolean
}

export const Logo = ({reverse = false, className = ''}: CProps<LogoProps>) => {
  const cls = classnames(
    'flex items-center text-3xl cursor-pointer',
    reverse ? 'text-white' : 'text-blue-500',
    className
  )

  return (
    <Link to="/">
      <h1 className={cls}>
        <MdCloud className="mr-2" />
        Cloud dashboard
      </h1>
    </Link>
  )
}
