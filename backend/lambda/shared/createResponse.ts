const defaultHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'OPTIONS,GET,PUT,POST,DELETE,PATCH,HEAD',
  'Access-Control-Allow-Headers': '*',
  'Content-Type': 'application/json'
}

export function createResponse(
  body: any,
  statusCode: number = 200,
  headers: {[key: string]: string} = defaultHeaders
) {
  const resBody = typeof body === 'string' ? {msg: body} : body

  return {
    statusCode,
    headers,
    body: JSON.stringify(resBody)
  }
}
