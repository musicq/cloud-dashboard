import React, {Fragment, MouseEvent, useCallback, useState} from 'react'
import {Button} from '../../components/Button'
import {Card} from '../../components/Card'
import {DetectionArea} from '../../components/DetectionArea'
import {Spinner} from '../../components/Spinner'
import {Projects$, useLoadingProjects} from '../../services/projects.service'
import {useProjectId} from '../../shared/useProjectId'
import {Pos} from '../../types'
import {
  exchange,
  isEqual,
  OperateItemIndex,
  useListenMouseUpEvent,
  useProject,
  useResources,
} from './Dashboard.service'
import {WidgetSwitcher} from './WidgetSwitcher'

export const Dashboard = () => {
  const loading = useLoadingProjects()
  const projectId = useProjectId()
  const project = useProject(projectId)
  const [resources, setResources] = useResources(project)
  const [isDragging, setDragging] = useState(false)
  const [position, setPosition] = useState<Pos>([0, 0])
  const [edit, setEdit] = useState(false)
  const [targetIndex, setTargetIndex] = useState<OperateItemIndex>(null)
  const [operateItemIndex, setOperateItemIndex] = useState<OperateItemIndex>(
    null
  )

  const cancelDragging = useCallback(() => {
    setDragging(false)

    if (!operateItemIndex || !targetIndex) {
      return
    }

    const newResources = exchange(resources, operateItemIndex, targetIndex)

    setResources(newResources)
    setOperateItemIndex(null)
    setTargetIndex(null)

    Projects$.updateById(projectId, newResources).subscribe({
      error: e => console.error('Update project resources failed.', e),
    })
  }, [
    operateItemIndex,
    targetIndex,
    projectId,
    resources,
    setDragging,
    setResources,
    setOperateItemIndex,
    setTargetIndex,
  ])

  useListenMouseUpEvent(cancelDragging)

  const onPositionChange = useCallback(
    (position: Pos) => setPosition(position),
    [setPosition]
  )

  const onMouseDown = (e: MouseEvent<HTMLDivElement>, index: Pos) => {
    setDragging(true)
    setOperateItemIndex(index)
  }

  const onIndexChange = useCallback(
    (index: Pos) => {
      if (!isEqual(targetIndex, index)) {
        setTargetIndex(index)
      }
    },
    [targetIndex, setTargetIndex]
  )

  const onEdit = () => setEdit(true)

  const onSave = () => {
    setEdit(false)

    Projects$.updateById(projectId, resources).subscribe(
      () => console.log('Saved successfully.'),
      e => console.error('Save failed.')
    )
  }

  const onDataChange = ({id, data}: {id: string; data: any}) => {
    const newResources = resources.slice().map(resource =>
      resource.map(r => {
        if (r.id === id) {
          return {...r, data}
        }

        return r
      })
    )

    setResources(newResources)
  }

  return (
    <div>
      {loading ? (
        <div className="flex justify-center mt-40 h-full w-full">
          <Spinner className="w-16 h-16" />
        </div>
      ) : (
        <>
          {project?.projectName && (
            <div className="flex justify-between border-b p-4 ">
              <div className="text-3xl">{project.projectName}</div>

              <Button onClick={edit ? onSave : onEdit}>
                {edit ? 'Save' : 'Customize'}
              </Button>
            </div>
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
                        <WidgetSwitcher
                          id={item.id}
                          edit={edit}
                          type={item.type}
                          data={item.data}
                          onChange={onDataChange}
                        />
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
    </div>
  )
}
