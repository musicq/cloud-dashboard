const defaultHeaders = {
  'Content-Type': 'application/json',
  'Access-Control-Allow-Headers': 'Content-Type',
  // TODO: replace origin with online domain
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': '*'
}

export function createResponse(
  body: any,
  statusCode: number = 200,
  headers: {[key: string]: string} = defaultHeaders
) {
  return {
    statusCode,
    headers,
    body: typeof body === 'string' ? body : JSON.stringify(body)
  }
}
