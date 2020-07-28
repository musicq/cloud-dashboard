import {Widget} from './Widget'
import {WidgetTypes} from './widgetTypes'

export class API extends Widget {
  constructor(data?: any) {
    super(WidgetTypes.API, 'API', {name: 'Redirect to API overview'}, data)
  }
}
