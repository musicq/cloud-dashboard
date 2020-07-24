import React from 'react'
import {Spinner} from '../Spinner'

export const Launch = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="h-64 w-64">
        <Spinner />
      </div>
    </div>
  )
}
