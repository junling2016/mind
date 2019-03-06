import { createElement } from './utils/dom'
import options from './options'

const { normalLineStyle } = options

const turnRadius = 4

export const createNormalLine = (
  sx,
  sy,
  ex,
  ey,
  parent,
  orientation = 'horz'
) => {
  let line

  if (
    (orientation === 'horz' && Math.abs(sy - ey) < turnRadius) ||
    (orientation === 'vert' && Math.abs(sx - yx) < turnRadius)
  ) {
    line = ['M', sx, sy, 'L', ex, ey]
  } else {
    const firstTurn = {}
    const secondTurn = {}
    const thirdTurn = {}

    if (orientation === 'horz') {
      firstTurn.x = secondTurn.x = (sx + ex) / 2
      firstTurn.y = sy
      secondTurn.y =
        ey > sy ? Math.max(sy, ey - turnRadius) : Math.min(sy, ey + turnRadius)
      thirdTurn.x =
        ex > sx
          ? Math.min(secondTurn.x + turnRadius, ex)
          : Math.max(secondTurn.x - turnRadius, ex)
      thirdTurn.y = ey
    } else {
      firstTurn.x = sx
      firstTurn.y = secondTurn.y = (sy + ey) / 2
      secondTurn.x =
        ex > sx ? Math.max(sx, ex - turnRadius) : Math.min(sx, ex + turnRadius)
      thirdTurn.x = ex
      thirdTurn.y =
        ey > sy
          ? Math.min(secondTurn.y + turnRadius, ey)
          : Math.max(secondTurn.y - turnRadius, ey)
    }

    let sweepFlag = (ex > sx && ey < sy) || (sx > ex && sy < ey) ? 1 : 0

    line = [
      'M',
      sx,
      sy,
      'L',
      firstTurn.x,
      firstTurn.y,
      'L',
      secondTurn.x,
      secondTurn.y,
      'A',
      turnRadius,
      turnRadius,
      0,
      0,
      sweepFlag,
      thirdTurn.x,
      thirdTurn.y,
      'L',
      ex,
      ey
    ]
  }

  const path = createElement('path', {
    d: line.join(' '),
    stroke: normalLineStyle.stroke,
    'stroke-width': normalLineStyle.strokeWidth,
    'stroke-linecap': normalLineStyle.strokeLinecap,
    fill: normalLineStyle.fill
  })

  if (parent) {
    parent.appendChild(path)
  }

  return path
}
