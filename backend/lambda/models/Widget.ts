import {v4} from 'uuid'
import {WidgetTypes} from './widgetTypes'

interface WidgetConfig {
  link?: string
  name?: string
}

export class Widget {
  id = v4()

  constructor(
    public type: WidgetTypes,
    public title: string,
    public config: WidgetConfig | null = null,
    public data: {[key: string]: any}
  ) {}
}

export type WidgetsLayout = Array<Widget[]>
