import Connection from './connection'

class Line extends Connection {
  constructor(from, to, options) {
    super(from, to, options)
  }

  getPath() {
    const { from, to } = this
    const fromX = from[0]
    const fromY = from[1]
    const toX = to[0]
    const toY = to[2]
    const sweepFlag =
      (toX > fromX && toY < fromY) || (fromX > toX && fromY < toY) ? 1 : 0
    const turnX1 = (fromX + toX) / 2
    const turnX2 =
      toX > fromX
        ? Math.min(turnX1 + radius, toX)
        : Math.max(turnX1 - radius, toX)
    const turnY1 =
      toY > fromY
        ? Math.max(fromY, toY - radius)
        : Math.min(fromY, toY + radius)

    pathD = [
      'M',
      fromX,
      fromY,
      'L',
      turnX1,
      fromY,
      'L',
      turnX1,
      turnY1,
      'A',
      radius,
      radius,
      0,
      0,
      sweepFlag,
      turnX2,
      toY,
      'L',
      toX,
      toY
    ]

    return pathD.join(' ')
  }
}

export default Line
