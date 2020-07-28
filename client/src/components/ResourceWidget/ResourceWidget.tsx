import React from 'react'
import {CProps, WidgetProps} from '../../types'

interface ResourceWidget extends WidgetProps {}

export const ResourceWidget = (props: CProps<ResourceWidget>) => {
  return <div className="text-gray-600">No more resources for now.</div>
}
