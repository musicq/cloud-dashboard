import {Widget} from './Widget'
import {WidgetTypes} from './widgetTypes'

export class SQL extends Widget {
  constructor(data?: any) {
    super(WidgetTypes.SQL, 'SQL', {name: 'Redirect to SQL center'}, data)
  }
}
