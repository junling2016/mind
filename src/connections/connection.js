import { createElement } from '../utils/dom'

class Connection {
  // 路径dom
  $path = null

  // 起点
  from = null

  // 终点
  to = null

  options = {
    stroke: '#43a9ff',
    strokeWidth: 1,
    strokeLinecap: 'square',
    fill: 'none'
  }

  constructor(from, to, options) {
    this.from = from
    this.to = to
    Object.assign(this.options, options)
    this.create()
  }

  create() {
    const { stroke, strokeWidth, strokeLinecap, fill } = this.options

    const $path = (this.$path = createElement('path', {
      stroke,
      'stroke-width': strokeWidth,
      'stroke-linecap': strokeLinecap,
      fill
    }))

    if (this.getPath) {
      $path.setAttribute('d', this.getPath())
    }
  }
}

export default Connection
