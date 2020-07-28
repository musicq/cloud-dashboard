import React from 'react'
import {Project} from '../../services/projects.service'
import {CProps, WidgetProps} from '../../types'

interface ProjectInfoProps extends WidgetProps {
  data: Project
}

export const ProjectInfo = ({data}: CProps<ProjectInfoProps>) => {
  if (!data) {
    return (
      <div className="text-gray-700">Project info is not available now.</div>
    )
  }

  return (
    <div>
      <div className="mb-3">
        <h3>Project name</h3>
        <div className="text-gray-600">{data.projectName}</div>
      </div>

      <div className="mb-3">
        <h3>Project ID</h3>
        <div className="text-gray-600">{data.id}</div>
      </div>

      <div>
        <h3>Created at</h3>
        <div className="text-gray-600">
          {new Date(data.createdAt).toDateString()}
        </div>
      </div>
    </div>
  )
}
