export function qs<T extends {[key: string]: string}>(q: string): T {
  if (q.startsWith('?')) {
    q = q.substr(1)
  }

  return q.split('&').reduce((acc, cur) => {
    const [key, val] = cur.split('=')

    return {...acc, [key]: val}
  }, {} as T)
}
