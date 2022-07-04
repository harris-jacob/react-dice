const isDefined = <T>(thing: T | undefined): thing is T => {
  return thing !== undefined
}

/**
 *  Function which asserts if a thing defined
 * @param thing thing which may be undefined
 * @throws if thing is undefined
 */
export function assertDefined<T>(
  thing: T | undefined,
  message = 'thing is undefined'
): asserts thing is T {
  if (!isDefined(thing)) {
    throw new Error(message)
  }
}
