export class Err {
  constructor(public e: any) {
    console.error(e)
  }
}

export function go<T>(promise: Promise<T>): Promise<T | Err> {
  return promise.catch(e => new Err(e))
}
