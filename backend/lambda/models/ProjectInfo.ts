import {Widget} from './Widget'
import {WidgetTypes} from './widgetTypes'

export class ProjectInfo extends Widget {
  constructor(data?: any) {
    super(
      WidgetTypes.ProjectInfo,
      'Project Info',
      {name: 'Redirect to settings'},
      data
    )
  }
}
