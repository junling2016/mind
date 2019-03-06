import { createElement } from '../utils/dom'

class TopicLine {
  // 路径的dom对象
  $el = null

  options = {
    // 起点位置
    start: [],
    // 终点位置
    end: [],
    // 弯曲半径
    radius: 4,
    // 线条颜色
    stroke: '#43a9ff',
    // 线条粗细
    strokeWidth: 1,
    // 线条填充色
    fill: 'none',
    // 路径终结类型
    strokeLinecap: 'square'
  }

  constructor(options) {
    Object.assign(this.options, options)
    this.create()
  }

  // 创建曲线
  create() {
    const {
      start,
      end,
      radius,
      stroke,
      strokeWidth,
      strokeLinecap,
      fill
    } = this.options

    const startX = start[0]
    const startY = start[1]
    const endX = end[0]
    const endY = end[1]

    let pathD

    if (Math.abs(startY - endY) < radius) {
      pathD = ['M', startX, startY, 'L', endX, endY]
    } else {
      let sweepFlag =
        (endX > startX && endY < startY) || (startX > endX && startY < endY)
          ? 1
          : 0
      const turnX1 = (startX + endX) / 2
      const turnX2 =
        endX > startX
          ? Math.min(turnX1 + radius, endX)
          : Math.max(turnX1 - radius, endX)
      const turnY1 =
        endY > startY
          ? Math.max(startY, endY - radius)
          : Math.min(startY, endY + radius)

      pathD = [
        'M',
        startX,
        startY,
        'L',
        turnX1,
        startY,
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
        endY,
        'L',
        endX,
        endY
      ]
    }

    this.$el = createElement('path', {
      d: pathD.join(' '),
      stroke,
      'stroke-width': strokeWidth,
      'stroke-linecap': strokeLinecap,
      fill
    })
  }
}

export default TopicLine
