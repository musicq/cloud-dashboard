const defaultHeaders = {}

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
