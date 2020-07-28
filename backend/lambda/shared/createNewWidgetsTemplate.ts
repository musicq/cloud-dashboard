import {API} from '../models/API'
import {ProjectInfo} from '../models/ProjectInfo'
import {Resource} from '../models/Resource'
import {SQL} from '../models/SQL'
import {WidgetsLayout} from '../models/Widget'

export function createNewWidgetsTemplate({
  projectInfoData,
  APIData,
  SQLData
}: {
  projectInfoData: any
  APIData: any
  SQLData: any
}) {
  const widgets: WidgetsLayout = []

  const ResourceWidget = new Resource()
  const ProjectInfoWidget = new ProjectInfo(projectInfoData)
  const APIWidget = new API(APIData)
  const SQLWidget = new SQL(SQLData)

  widgets.push([ResourceWidget])
  widgets.push([APIWidget, SQLWidget])
  widgets.push([ProjectInfoWidget])

  return widgets
}
