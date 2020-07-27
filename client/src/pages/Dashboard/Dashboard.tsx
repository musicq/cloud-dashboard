import React, {MouseEvent, useState} from 'react'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'

const item = () => ({
  // @ts-ignore
  id: Math.random().toString().substr(3).toString(16),
  title: 'Introduce guide',
  config: {link: 'https://google.com', name: 'Browse all lessons'},
  data: {
    a: 1,
    b: 2,
    c: 3,
    e: 'fake'
  }
})

type OperateItemIndex = [number, number] | null

function isEqual(a: OperateItemIndex, b: [number, number]): boolean {
  if (a === null) {
    return false
  }

  return a[0] === b[0] && a[1] === b[1]
}

const data = [[item(), item()], [item(), item(), item()], [item()]]

export const Dashboard = () => {
  const [isDragging, setDragging] = useState(false)
  const [operateItemIndex, setOperateItemIndex] = useState<OperateItemIndex>(
    null
  )
  const [position, setPosition] = useState([0, 0])

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
    setOperateItemIndex(null)
  }

  console.log(position)

  return (
    <AppBar>
      <div className="px-8 py-6">
        <div className="flex">
          {data.map((col, colIndex) => (
            <div key={colIndex} className="flex-1 px-2">
              {col.map((item, index) => (
                <Card
                  key={item.id}
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
              ))}
            </div>
          ))}
        </div>
      </div>
    </AppBar>
  )
}
