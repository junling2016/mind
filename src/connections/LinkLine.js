import Connection from './connection'
import { createElement } from '../utils/dom'

class LinkLine extends Connection {
  constructor(from, to, options) {
    super(from, to, options)
  }

  create() {
    const {
      stroke,
      strokeWidth,
      strokeLinecap,
      strokeLinejoin,
      fill
    } = this.options
    const pathStyle = {
      stroke,
      'stroke-width': strokeWidth,
      'stroke-linecap': strokeLinecap,
      'stroke-linejoin': strokeLinejoin,
      fill
    }
    const $path = (this.$path = createElement('g'))
    const $line = createElement('path', pathStyle, $path)
    const $arrow = createElement('path', pathStyle, $path)

    $line.setAttribute('d', this.getPath())
    $arrow.setAttribute('d', this.getArrowPath())
  }

  getPath() {
    const fromX = this.from[0]
    const fromY = this.from[1]
    const toX = this.to[0]
    const toY = this.to[1]
    const handleOffsetX = Math.abs(fromX - toX) * 0.4
    const handlePointX1 =
      fromX > toX ? fromX - handleOffsetX : fromX + handleOffsetX
    const handlePointX2 =
      fromX > toX ? toX + handleOffsetX : toX - handleOffsetX

    return [
      'M',
      fromX,
      fromY,
      'C',
      handlePointX1,
      fromY,
      handlePointX2,
      toY,
      fromX > toX ? toX + 10 : toX - 10,
      toY,
      'L',
      toX,
      toY
    ].join(' ')
  }

  getArrowPath() {
    const fromX = this.from[0]
    const toX = this.to[0]
    const toY = this.to[1]

    let vertex1
    let vertex2

    if (fromX > toX) {
      vertex1 = [toX + 6, toY - 4]
      vertex2 = [toX + 6, toY + 4]
    } else {
      vertex1 = [toX - 6, toY - 4]
      vertex2 = [toX - 6, toY + 4]
    }

    return [
      'M',
      toX,
      toY,
      'L',
      vertex1[0],
      vertex1[1],
      'M',
      toX,
      toY,
      'L',
      vertex2[0],
      vertex2[1],
      'Z'
    ].join(' ')
  }
}

export default LinkLine
