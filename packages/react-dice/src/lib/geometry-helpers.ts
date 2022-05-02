import { Vector3 } from 'three'

export const getVertexByIndex = (
  vertices: Array<number>,
  index: number
): Vector3 => {
  const stride = index * 3

  return new Vector3(
    vertices[stride],
    vertices[stride + 1],
    vertices[stride + 2]
  )
}
