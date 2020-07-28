import React from 'react'
import {CProps, WidgetProps} from '../../types'

interface SQLWidgetProps extends WidgetProps {}

export const SQLWidget = ({data}: CProps<SQLWidgetProps>) => {
  if (!data) {
    return <div className="text-gray-700">SQL is not available now.</div>
  }

  return (
    <div>
      <div>SQL Source</div>
      <div className="text-gray-700">{data.source}</div>
    </div>
  )
}
