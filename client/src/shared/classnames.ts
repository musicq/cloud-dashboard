export function classnames(
  ...cls: Array<string | string[] | {[key: string]: boolean}>
): string {
  const args = Array.from(cls)

  const r: string[] = []

  composeCls(args, r)

  return r.join(' ')
}

function composeCls(args: any[], result: string[]) {
  if (args.length === 0) {
    return
  }

  const [cls, ...restArgs] = args

  if (typeof cls === 'string') {
    result.push(cls)
  } else if (Array.isArray(cls)) {
    const c = cls.filter(Boolean).join(' ')
    result.push(c)
  } else {
    const c = Object.entries<boolean>(cls)
      .reduce((acc, [key, val]) => [...acc, val ? key : ''], [] as any)
      .filter(Boolean)
      .join(' ')

    result.push(c)
  }

  composeCls(restArgs, result)
}
