import React from 'react'
import {APIWidget} from '../../components/APIWidget'
import {ProjectInfo} from '../../components/ProjectInfo'
import {ResourceWidget} from '../../components/ResourceWidget'
import {SQLWidget} from '../../components/SQLWidget/SQLWidget'
import {WidgetTypes} from '../../services/projects.service'
import {CProps} from '../../types'

interface WidgetSwitcherProps {
  type: WidgetTypes
  data: any
}

export const WidgetSwitcher = ({type, data}: CProps<WidgetSwitcherProps>) => {
  let View = null

  switch (type) {
    case WidgetTypes.Resource:
      View = ResourceWidget
      break
    case WidgetTypes.ProjectInfo:
      View = ProjectInfo
      break
    case WidgetTypes.API:
      View = APIWidget
      break
    case WidgetTypes.SQL:
      View = SQLWidget
      break
    default:
      return null
  }

  // @ts-ignore
  return <View data={data} />
}
