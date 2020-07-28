import {Widget} from './Widget'
import {WidgetTypes} from './widgetTypes'

export class Resource extends Widget {
  constructor(data?: any) {
    super(WidgetTypes.Resource, 'Resource', null, data)
  }
}
