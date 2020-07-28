import {useEffect, useLayoutEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {
  getProjectById,
  getProjects,
  Project,
  WidgetsLayout
} from '../../services/projects.service'
import {qs} from '../../shared/qs'
import {Pos} from '../../types'

export type OperateItemIndex = Pos | null

export function useProjectId(projects: Project[]) {
  const history = useHistory()
  const location = useLocation()
  const {search} = location
  const projectId = qs(search).projectId

  useEffect(() => {
    if (!projectId && projects.length > 0) {
      history.push('/dashboard?projectId=' + projects[0].id)
    }
  }, [projects])

  return qs(search).projectId
}

export function useProject(id: string): [boolean, Project?] {
  const [loading, setLoading] = useState(false)
  const [project, setProject] = useState<Project>()

  useEffect(() => {
    setLoading(true)
    const sub = getProjectById(id).subscribe(
      res => setProject(res),
      e => {
      },
      () => setLoading(false)
    )

    return () => sub.unsubscribe()
  }, [id])

  return [loading, project]
}

export function exchange<T>(
  list: Array<T[]>,
  srcIndex: OperateItemIndex,
  targetIndex: OperateItemIndex
): Array<T[]> {
  if (!srcIndex || !targetIndex) {
    return list
  }

  const listCopy = list.slice()

  const [srcCol, srcIdx] = srcIndex
  const [targetCol, targetIdx] = targetIndex

  if (srcCol === targetCol) {
    const col = listCopy[srcCol].slice()
    const item = col[srcIdx]
    col.splice(srcIdx, 1)
    col.splice(targetIdx, 0, item)

    listCopy[srcCol] = col
  } else {
    const srcCols = listCopy[srcCol].slice()
    const item = srcCols[srcIdx]

    const targetCols = listCopy[targetCol].slice()

    srcCols.splice(srcIdx, 1)
    targetCols.splice(targetIdx, 0, item)

    listCopy[srcCol] = srcCols
    listCopy[targetCol] = targetCols
  }

  return listCopy
}

export function isEqual(a: OperateItemIndex, b: Pos): boolean {
  if (a === null) {
    return false
  }

  return a[0] === b[0] && a[1] === b[1]
}

export function useListenMouseUpEvent(cb: Function) {
  useLayoutEffect(() => {
    document.addEventListener('mouseup', cb as any)

    return () => document.removeEventListener('mouseup', cb as any)
  }, [cb])
}

export function useResources(project?: Project): [WidgetsLayout, Function] {
  const [resources, setResources] = useState(project?.resources || [])

  useEffect(() => {
    setResources(project?.resources || [])
  }, [project])

  return [resources, setResources]
}

export function useProjects(): [boolean, Project[]] {
  const [loading, setLoading] = useState(false)
  const [projects, setProjects] = useState<Project[]>([])

  useEffect(() => {
    setLoading(true)
    const sub = getProjects().subscribe(projects => {
      setProjects(projects)
      setLoading(false)
    })

    return () => sub.unsubscribe()
  }, [])

  return [loading, projects]
}
