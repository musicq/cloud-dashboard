import {useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import {getProjectById} from '../../services/projects.service'
import {qs} from '../../shared/qs'

export type OperateItemIndex = [number, number] | null

export function useProjectId() {
  const location = useLocation()
  const {search} = location

  return qs(search).projectId
}

export function useProject(id: string) {
  const [project, setProject] = useState(null)

  useEffect(() => {
    const sub = getProjectById(id).subscribe(res => setProject(res))

    return () => sub.unsubscribe()
  }, [id])

  return project
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

export function isEqual(a: OperateItemIndex, b: [number, number]): boolean {
  if (a === null) {
    return false
  }

  return a[0] === b[0] && a[1] === b[1]
}
