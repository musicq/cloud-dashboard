import React from 'react'
import {Spinner} from '../Spinner'

export const Launch = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <Spinner className="w-20 h-20" />
    </div>
  )
}
