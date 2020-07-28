import {API} from '../models/API'
import {ProjectInfo} from '../models/ProjectInfo'
import {Resource} from '../models/Resource'
import {SQL} from '../models/SQL'
import {WidgetsLayout} from '../models/Widget'

export function createNewWidgetsTemplate() {
  const widgets: WidgetsLayout = []

  const ResourceWidget = new Resource()
  const ProjectInfoWidget = new ProjectInfo()
  const APIWidget = new API()
  const SQLWidget = new SQL()

  widgets.push([ResourceWidget])
  widgets.push([APIWidget, SQLWidget])
  widgets.push([ProjectInfoWidget])

  return widgets
}
