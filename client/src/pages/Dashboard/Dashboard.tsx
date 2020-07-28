import React, {
  Fragment,
  MouseEvent,
  PropsWithChildren,
  useCallback,
  useState
} from 'react'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'
import {DetectionArea} from '../../components/DetectionArea'
import {Pos} from '../../types'
import {
  exchange,
  isEqual,
  OperateItemIndex,
  useListenMouseUpEvent
} from './Dashboard.service'

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

const list = [[item(1), item(2)], [item(3), item(4), item(5)], [item(6)]]

const Container = ({children}: PropsWithChildren<any>) => (
  <AppBar>
    <div className="px-8 py-6">
      <div className="flex">{children}</div>
    </div>
  </AppBar>
)

export const Dashboard = () => {
  const [data, setData] = useState(list)
  const [isDragging, setDragging] = useState(false)
  const [operateItemIndex, setOperateItemIndex] = useState<OperateItemIndex>(
    null
  )
  const [position, setPosition] = useState<Pos>([0, 0])
  const [targetIndex, setTargetIndex] = useState<OperateItemIndex>(null)

  const cancelDragging = useCallback(() => {
    setDragging(false)

    if (!operateItemIndex || !targetIndex) {
      return
    }

    const newData = exchange(data, operateItemIndex, targetIndex)

    setData(newData)
    setOperateItemIndex(null)
    setTargetIndex(null)
  }, [
    operateItemIndex,
    targetIndex,
    data,
    setDragging,
    setData,
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

  return (
    <Container>
      {data.map((col, colIndex) => (
        <div key={colIndex} className="flex-1 px-2">
          {col.map((item, index) => (
            <Fragment key={item.id}>
              {isDragging && index === 0 && (
                <DetectionArea
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
                onPositionChange={onPositionChange}
              >
                {colIndex} - {index}
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
    </Container>
  )
}
