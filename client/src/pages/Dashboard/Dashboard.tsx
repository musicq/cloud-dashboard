import React, {Fragment, MouseEvent, useState} from 'react'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'
import {DetectionArea} from '../../components/DetectionArea'

const item = (i: number) => ({
  // @ts-ignore
  id: Math.random().toString().substr(3).toString(16),
  title: i.toString(),
  config: {link: 'https://google.com', name: 'Browse all lessons'},
  data: {
    a: 1,
    b: 2,
    c: 3,
    e: 'fake'
  }
})

type OperateItemIndex = [number, number] | null

const list = [[item(1), item(2)], [item(3), item(4), item(5)], [item(6)]]

export const Dashboard = () => {
  const [data, setData] = useState(list)
  const [isDragging, setDragging] = useState(false)
  const [operateItemIndex, setOperateItemIndex] = useState<OperateItemIndex>(
    null
  )
  const [position, setPosition] = useState<[number, number]>([0, 0])
  const [targetIndex, setTargetIndex] = useState<OperateItemIndex>(null)

  const onPositionChange = (position: [number, number]) => {
    setPosition(position)
  }

  const onMouseDown = (
    e: MouseEvent<HTMLDivElement>,
    index: [number, number]
  ) => {
    console.log(index)

    setDragging(true)
    setOperateItemIndex(index)
  }

  const onMouseUp = () => {
    setDragging(false)

    if (!operateItemIndex || !targetIndex) {
      return
    }

    const [oldCol, oldIndex] = operateItemIndex
    const [newCol, newIndex] = targetIndex

    // change position
    const oldColCopy = data[oldCol].slice()
    const item = oldColCopy[oldIndex]
    oldColCopy.splice(oldIndex, 1)
    const newColCopy = data[newCol].slice()
    newColCopy.splice(newIndex, 0, item)

    const newData = data.slice()
    newData[oldCol] = oldColCopy
    newData[newCol] = newColCopy

    setData(newData)
    setOperateItemIndex(null)
  }

  const onIndexChange = (index: [number, number]) => {
    console.log('new index:', index)
    setTargetIndex(index)
  }

  return (
    <AppBar>
      <div className="px-8 py-6">
        <div className="flex">
          {data.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 px-2">
              {col.map((item, index) => (
                <Fragment key={item.id}>
                  {isDragging && index === 0 && (
                    <DetectionArea
                      first
                      left={colIndex === 0}
                      right={colIndex === data.length - 1}
                      index={[colIndex, 0]}
                      position={position}
                      onChange={onIndexChange}
                    />
                  )}

                  <Card
                    className="mb-3"
                    isDragging={
                      isDragging && isEqual(operateItemIndex, [colIndex, index])
                    }
                    collapse={isDragging}
                    title={item.title}
                    footer={{link: item.config.link, title: item.config.name}}
                    onMouseDown={e => onMouseDown(e, [colIndex, index])}
                    onMouseUp={onMouseUp}
                    onPositionChange={onPositionChange}
                  >
                    {colIndex} - {index}
                    <span>{JSON.stringify(item.data)}</span>
                  </Card>

                  {isDragging && (
                    <DetectionArea
                      last={index === col.length - 1}
                      left={colIndex === 0}
                      right={colIndex === data.length - 1}
                      index={[colIndex, index]}
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
    </AppBar>
  )
}

function isEqual(a: OperateItemIndex, b: [number, number]): boolean {
  if (a === null) {
    return false
  }

  return a[0] === b[0] && a[1] === b[1]
}
