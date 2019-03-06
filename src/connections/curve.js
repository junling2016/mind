import { createElement } from '../utils/dom'

class Curve {
  // 路径的dom对象
  $el = null

  options = {
    // gradient, quadratic, cubic
    type: 'quadratic',
    // 起点位置
    start: [],
    // 终点位置
    end: [],
    // 渐变线起点宽度
    quadraticWidth: 10,
    // 线条颜色
    stroke: '#43a9ff',
    // 线条粗细
    strokeWidth: 2,
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
    const { type } = this.options

    switch (type) {
      case 'gradient':
        this.createGradientCurve()
        break
    }
  }

  // 创建宽度渐变的二次贝塞尔曲线
  createGradientCurve() {
    const {
      start,
      end,
      quadraticWidth,
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

    if (Math.abs(endY - startY) < quadraticWidth) {
      const tan = Math.atan((endY - startY) / (endX - startX))
      const offsetX = (Math.sin(tan) * quadraticWidth) / 2
      const offsetY = (Math.cos(tan) * quadraticWidth) / 2
      const realStartX1 = startX + offsetX
      const realStartY1 = startY - offsetY
      const realStartX2 = startX - offsetX
      const realStartY2 = startY + offsetY

      pathD = [
        'M',
        realStartX1,
        realStartY1,
        'L',
        endX,
        endY,
        'L',
        realStartX2,
        realStartY2,
        'L',
        realStartX1,
        realStartY1
      ]
    } else {
      const handleX = (endX - startX) * 0.2 + startX
      const handleY = endY
      const handleOffestX =
        (endX > startX && endY > startY) || (endX < startX && endY < startY)
          ? -quadraticWidth
          : quadraticWidth
      const tan = Math.atan((handleY - startY) / (handleX - startX))
      const offsetX = (Math.sin(tan) * quadraticWidth) / 2
      const offsetY = (Math.cos(tan) * quadraticWidth) / 2
      const realStartX1 = startX + offsetX
      const realStartY1 = startY - offsetY
      const realStartX2 = startX - offsetX
      const realStartY2 = startY + offsetY

      pathD = [
        'M',
        realStartX1,
        realStartY1,
        'C',
        realStartX1,
        realStartY1,
        handleX,
        handleY,
        endX,
        endY,
        'C',
        handleX + handleOffestX,
        handleY,
        realStartX2,
        realStartY2,
        realStartX2,
        realStartY2,
        'L',
        realStartX1,
        realStartY1,
        'Z'
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

export default Curve
