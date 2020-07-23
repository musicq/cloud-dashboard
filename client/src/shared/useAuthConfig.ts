import Amplify from 'aws-amplify'
import {useEffect} from 'react'
import {CONFIG} from '../config'

export function useAuthConfig() {
  useEffect(() => {
    Amplify.configure({
      Auth: {
        mandatorySignIn: true,
        region: CONFIG.cognito.REGION,
        userPoolId: CONFIG.cognito.USER_POOL_ID,
        userPoolWebClientId: CONFIG.cognito.APP_CLIENT_ID
      }
    })
  }, [])
}
