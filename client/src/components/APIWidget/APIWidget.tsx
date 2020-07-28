import React from 'react'
import {CProps, WidgetProps} from '../../types'

interface APIWidgetProps extends WidgetProps {}

export const APIWidget = ({data}: CProps<APIWidgetProps>) => {
  if (!data) {
    return <div className="text-gray-700">API is not available now.</div>
  }

  return (
    <div>
      <div>API Source</div>
      <div className="text-gray-700">{data.source}</div>
    </div>
  )
}
