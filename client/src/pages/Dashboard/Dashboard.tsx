import React from 'react'
import {AppBar} from '../../components/AppBar'
import {Card} from '../../components/Card'
import {useProjectId} from './Dashboard.service'

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

export const Dashboard = () => {
  const projectId = useProjectId()
  // const project = useProject(projectId)

  const data = [[item(), item()], [item(), item(), item()], [item()]]

  return (
    <AppBar>
      <div className="px-8 py-6">
        <div className="flex">
          {data.map((col, index) => (
            <div key={index} className="flex-1 px-2">
              {col.map((item, i) => (
                <Card
                  key={item.id}
                  className="mb-3"
                  draggable
                  title={item.title}
                  footer={{link: item.config.link, title: item.config.name}}
                >
                  {index} - {i}
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
