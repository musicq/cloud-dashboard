import {createStore} from './RXStore'

const storeInstance = createStore()

storeInstance.state$.subscribe(state => {
  console.group('Store')
  console.log(state)
  console.groupEnd()
})

export const store = storeInstance
