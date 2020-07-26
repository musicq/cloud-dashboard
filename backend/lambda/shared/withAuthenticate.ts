import {createResponse} from './createResponse'
import {ClaimVerifyResult, decodeVerifyJWT} from './decodeVerifyJWT'
import {Err, go} from './go'

interface TokenContext {
  raw: string
  data: ClaimVerifyResult
}

export interface SythenAPIGatewayEvent extends AWSLambda.APIGatewayEvent {
  token: TokenContext
}

export interface ResponseData {
  statusCode: number
  body: string
  headers: {[key: string]: string}
}

type handlerType = (
  event: SythenAPIGatewayEvent,
  context: AWSLambda.Context
) => Promise<ResponseData>

export function withAuthenticate(handler: handlerType) {
  return async (
    event: AWSLambda.APIGatewayEvent,
    context: AWSLambda.Context
  ) => {
    console.log(event)

    const JWTToken = event.headers.Authorization

    const tokenData = await go(decodeVerifyJWT({token: JWTToken}))

    if (tokenData instanceof Err) {
      return createResponse('Invalid token.', 400)
    }

    const tokenContext: TokenContext = {
      raw: JWTToken,
      data: tokenData
    }

    const sythenEvent = {...event, token: tokenContext}

    return handler(sythenEvent, context)
  }
}
