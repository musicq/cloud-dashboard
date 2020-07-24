import React, {SyntheticEvent, useState} from 'react'
import {useHistory} from 'react-router-dom'
import {AppBar} from '../../components/AppBar'
import {Button} from '../../components/Button'
import {TextInput} from '../../components/TextInput'

export const NewProject = () => {
  const [loading, setLoading] = useState(false)
  const history = useHistory()

  const onSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
  }

  return (
    <AppBar>
      <div>
        <h1 className="text-2xl border-b p-4">New project</h1>

        <div className="p-4">
          <form onSubmit={onSubmit}>
            <div className="w-1/3">
              <TextInput label="Project name" placeholder="Project name" />
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
