import {useEffect, useState} from 'react'
import {useHistory, useLocation} from 'react-router-dom'
import {of} from 'rxjs'
import {filter, map, switchMap, tap} from 'rxjs/operators'
import {Projects$} from '../services/projects.service'
import {qs} from './qs'

export function useProjectId() {
  const [projectId, setProjectId] = useState<string>()
  const history = useHistory()
  const location = useLocation()

  useEffect(() => {
    const sub = of(location)
      .pipe(
        filter(() => location.pathname === '/dashboard'),
        map(location => qs(location.search).projectId),
        switchMap(pId =>
          pId && pId !== 'undefined'
            ? of(pId)
            : Projects$.get().pipe(
                map(projects => projects[0]?.id),
                tap(projectId => {
                  if (projectId) {
                    history.push('/dashboard?projectId=' + projectId)
                  }
                })
              )
        )
      )
      .subscribe(pId => setProjectId(pId))

    return () => sub.unsubscribe()
  }, [location, history])

  return projectId
}
