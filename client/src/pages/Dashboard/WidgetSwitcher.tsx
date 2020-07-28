import React from 'react'
import {APIWidget} from '../../components/APIWidget'
import {ProjectInfo} from '../../components/ProjectInfo'
import {ResourceWidget} from '../../components/ResourceWidget'
import {SQLWidget} from '../../components/SQLWidget'
import {WidgetTypes} from '../../services/projects.service'
import {CProps, WidgetProps} from '../../types'

interface WidgetSwitcherProps extends WidgetProps {
  type: WidgetTypes
}

export const WidgetSwitcher = ({
  id,
  edit,
  type,
  data,
  onChange
}: CProps<WidgetSwitcherProps>) => {
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

  return <View id={id} edit={edit} data={data} onChange={onChange}/>
}
