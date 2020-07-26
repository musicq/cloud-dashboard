import * as jsonwebtoken from 'jsonwebtoken'
import fetch from 'node-fetch'
import {promisify} from 'util'

const jwkToPem = require('jwk-to-pem')

export interface ClaimVerifyRequest {
  readonly token?: string
}

export interface ClaimVerifyResult {
  readonly userName: string
  readonly email: string
  readonly emailVerified: boolean
  readonly isValid: boolean
  readonly error?: any
}

interface TokenHeader {
  kid: string
  alg: string
}

interface PublicKey {
  alg: string
  e: string
  kid: string
  kty: string
  n: string
  use: string
}

interface PublicKeyMeta {
  instance: PublicKey
  pem: string
}

interface PublicKeys {
  keys: PublicKey[]
}

interface MapOfKidToPublicKey {
  [key: string]: PublicKeyMeta
}

interface Claim {
  origin_jti: string
  sub: string
  aud: string
  email_verified: boolean
  event_id: string
  token_use: string
  auth_time: number
  iss: string
  'cognito:username': string
  exp: number
  iat: number
  email: string
}

const userPoolId = process.env.USER_POOL_ID || ''
const region = process.env.REGION || ''

if (!userPoolId) {
  throw new Error('env var required for USER_POOL_ID')
}

if (!region) {
  throw new Error('env var required for REGION')
}

const cognitoIssuer = `https://cognito-idp.${region}.amazonaws.com/${userPoolId}`

let cacheKeys: MapOfKidToPublicKey | undefined
const getPublicKeys = async (): Promise<MapOfKidToPublicKey> => {
  if (!cacheKeys) {
    const url = `${cognitoIssuer}/.well-known/jwks.json`
    const res = await fetch(url)
    const publicKeys: PublicKeys = await res.json()

    cacheKeys = publicKeys.keys.reduce((agg, current) => {
      const pem = jwkToPem(current)
      agg[current.kid] = {instance: current, pem}
      return agg
    }, {} as MapOfKidToPublicKey)
    return cacheKeys
  } else {
    return cacheKeys
  }
}

const verifyPromised = promisify(jsonwebtoken.verify.bind(jsonwebtoken))

export async function decodeVerifyJWT(
  request: ClaimVerifyRequest
): Promise<ClaimVerifyResult> {
  let result: ClaimVerifyResult
  try {
    console.log(`user claim verfiy invoked for ${JSON.stringify(request)}`)
    const token = request.token

    const tokenSections = (token || '').split('.')
    if (!token || tokenSections.length < 2) {
      throw new Error('requested token is invalid')
    }
    const headerJSON = Buffer.from(tokenSections[0], 'base64').toString('utf8')
    const header = JSON.parse(headerJSON) as TokenHeader
    const keys = await getPublicKeys()
    const key = keys[header.kid]
    if (key === undefined) {
      throw new Error('claim made for unknown kid')
    }
    const claim = (await verifyPromised(token, key.pem)) as Claim

    console.log('Claim resolved:', claim)

    const currentSeconds = Math.floor(new Date().valueOf() / 1000)
    if (currentSeconds > claim.exp || currentSeconds < claim.auth_time) {
      throw new Error('claim is expired or invalid')
    }
    if (claim.iss !== cognitoIssuer) {
      throw new Error('claim issuer is invalid')
    }

    console.log(`claim confirmed for ${claim['cognito:username']}`)

    result = {
      userName: claim['cognito:username'],
      email: claim.email,
      emailVerified: claim.email_verified,
      isValid: true
    }
  } catch (error) {
    result = {
      userName: '',
      email: '',
      emailVerified: false,
      error,
      isValid: false
    }
  }

  return result
}
