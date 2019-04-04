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
    this.$line = createElement('path', pathStyle, $path)
    this.$arrow = createElement('path', pathStyle, $path)

    this.$line.setAttribute('d', this.getPath())
    this.$arrow.setAttribute('d', this.getArrowPath())
  }

  update({ from, to, direction }) {
    this.from = from
    this.to = to
    this.direction = direction

    this.$line.setAttribute('d', this.getPath())
    this.$arrow.setAttribute('d', this.getArrowPath())
  }

  clear() {
    this.$line.setAttribute('d', '')
    this.$arrow.setAttribute('d', '')
  }

  getPath() {
    const fromX = this.from[0]
    const fromY = this.from[1]
    const toX = this.to[0]
    const toY = this.to[1]

    if (this.direction === 'horizontal') {
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
    } else {
      const handleOffset = Math.abs(fromY - toY) * 0.4
      const handlePointY1 =
        fromY > toY ? fromY - handleOffset : fromY + handleOffset
      const handlePointY2 =
        fromY > toY ? toY + handleOffset : toY - handleOffset

      return [
        'M',
        fromX,
        fromY,
        'C',
        fromX,
        handlePointY1,
        toX,
        handlePointY2,
        toX,
        fromY > toY ? toY + 10 : toY - 10,
        'L',
        toX,
        toY
      ].join(' ')
    }
  }

  getArrowPath() {
    const fromX = this.from[0]
    const fromY = this.from[1]
    const toX = this.to[0]
    const toY = this.to[1]

    let vertex1
    let vertex2

    if (this.direction === 'horizontal') {
      if (fromX > toX) {
        vertex1 = [toX + 6, toY - 4]
        vertex2 = [toX + 6, toY + 4]
      } else {
        vertex1 = [toX - 6, toY - 4]
        vertex2 = [toX - 6, toY + 4]
      }
    } else {
      if (fromY > toY) {
        vertex1 = [toX - 4, toY + 6]
        vertex2 = [toX + 4, toY + 6]
      } else {
        vertex1 = [toX - 4, toY - 6]
        vertex2 = [toX + 4, toY - 6]
      }
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
