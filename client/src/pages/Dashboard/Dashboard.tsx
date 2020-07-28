import React, {Fragment, MouseEvent, useCallback, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'
import {DetectionArea} from '../../components/DetectionArea'
import {Spinner} from '../../components/Spinner'
import {updateProjectResourcesById} from '../../services/projects.service'
import {Pos} from '../../types'
import {
  exchange,
  isEqual,
  OperateItemIndex,
  useListenMouseUpEvent,
  useProject,
  useProjectId,
  useResources
} from './Dashboard.service'

export const Dashboard = () => {
  const projectId = useProjectId()
  const history = useHistory()
  const [loading, project] = useProject(projectId)
  const [isDragging, setDragging] = useState(false)
  const [operateItemIndex, setOperateItemIndex] = useState<OperateItemIndex>(
    null
  )
  const [position, setPosition] = useState<Pos>([0, 0])
  const [targetIndex, setTargetIndex] = useState<OperateItemIndex>(null)
  const [resources, setResources] = useResources(project)

  const cancelDragging = useCallback(() => {
    setDragging(false)

    if (!operateItemIndex || !targetIndex) {
      return
    }

    const newResources = exchange(resources, operateItemIndex, targetIndex)

    setResources(newResources)
    setOperateItemIndex(null)
    setTargetIndex(null)

    updateProjectResourcesById(projectId, newResources).subscribe({
      error: e => console.error('Update project resources failed.', e)
    })
  }, [
    operateItemIndex,
    targetIndex,
    resources,
    setDragging,
    setResources,
    setOperateItemIndex,
    setTargetIndex
  ])

  useListenMouseUpEvent(cancelDragging)

  const onPositionChange = (position: Pos) => setPosition(position)

  const onMouseDown = (e: MouseEvent<HTMLDivElement>, index: Pos) => {
    setDragging(true)
    setOperateItemIndex(index)
  }

  const onIndexChange = (index: Pos) => setTargetIndex(index)

  const onProjectChange = (id: string) =>
    history.push('/dashboard?projectId=' + id)

  return (
    <AppBar projectId={projectId} onProjectChange={onProjectChange}>
      {loading ? (
        <div className="flex justify-center mt-40 h-full w-full">
          <Spinner className="w-16 h-16" />
        </div>
      ) : (
        <>
          {project?.projectName && (
            <div className="border-b p-4 text-3xl">{project.projectName}</div>
          )}

          <div className="px-8 py-6">
            <div className="flex">
              {resources.map((col, colIndex) => (
                <div key={colIndex} className="flex-1 px-2">
                  {isDragging && (
                    <DetectionArea
                      index={[colIndex, 0]}
                      position={position}
                      onChange={onIndexChange}
                    />
                  )}

                  {col.map((item, index: number) => (
                    <Fragment key={item.id}>
                      <Card
                        className="mb-3"
                        isDragging={
                          isDragging &&
                          isEqual(operateItemIndex, [colIndex, index])
                        }
                        collapse={isDragging}
                        title={item.title}
                        footer={item.config}
                        onMouseDown={e => onMouseDown(e, [colIndex, index])}
                        onPositionChange={onPositionChange}
                      >
                        <span>{JSON.stringify(item.data)}</span>
                      </Card>

                      {isDragging && (
                        <DetectionArea
                          index={[colIndex, index + 1]}
                          position={position}
                          onChange={onIndexChange}
                        />
                      )}
                    </Fragment>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </AppBar>
  )
}
