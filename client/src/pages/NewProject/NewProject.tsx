import React, {SyntheticEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {Alert} from '../../components/Alert'
import {AppBar} from '../../components/AppBar'
import {Button} from '../../components/Button'
import {TextInput} from '../../components/TextInput'
import {createProject} from '../../services/projects.service'
import {Err} from '../../shared/go'

export const NewProject = () => {
  const [projectName, setProjectName] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(false)
  const [errMsg, setErrMsg] = useState('')
  const history = useHistory()

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()

    if (!projectName || !projectName.trim()) {
      return
    }

    setLoading(true)
    createProject(projectName).subscribe(res => {
      setLoading(false)

      if (res instanceof Err) {
        setErrMsg(res.e.msg || 'Create project failed!')
        setError(true)
        return
      }

      setError(false)
      setErrMsg('')
      history.push(`/dashboard?projectId=${res.id}`)
    })
  }

  return (
    <AppBar>
      <div>
        <h1 className="text-2xl border-b p-4">New project</h1>

        <div className="p-4">
          {error && <Alert className="mb-4">{errMsg}</Alert>}

          <form onSubmit={onSubmit}>
            <div className="w-1/3">
              <TextInput
                label="Project name"
                placeholder="Project name"
                value={projectName}
                onChange={e => setProjectName(e.target.value)}
              />
            </div>

            <div className="flex items-center mt-8">
              <Button
                type="submit"
                className="mr-4"
                primary
                loading={loading}
                onClick={onSubmit}
              >
                Create
              </Button>

              <Button onClick={history.goBack}>Cancel</Button>
            </div>
          </form>
        </div>
      </div>
    </AppBar>
  )
}
