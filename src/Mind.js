import Viewport from './viewport'
import options from './options'
import { deepMerge } from './utils/util'
import { createElement } from './utils/dom'
import * as Tooltip from './Tooltip'

const doc = document

class Mind {
  // 容器
  $container = null

  // dom对象
  $el = null

  // 配置项
  options = options

  // 视图画布
  viewport = null

  constructor(el, options) {
    this.$container = typeof el === 'string' ? doc.querySelector(el) : el
    this.options = deepMerge(this.options, options)
    this.create()
    this.createViewport()
  }

  // 创建组件容器
  create() {
    this.$el = createElement(
      'div',
      {
        class: 'mind-container'
      },
      this.$container
    )
  }

  // 创建画布容器
  createViewport() {
    this.viewport = new Viewport(this)
  }

  // 获取画布尺寸
  getViewportSize() {
    const { width, height } = this.options
    return { width, height }
  }

  // 获取当前画布缩放比例
  getZoom() {
    return this.viewport.getZoom()
  }

  // 移除dom并注销事件
  destroy() {
    this.$container.removeChild(this.$el)
    Tooltip.destroy()
  }
}

export default Mind
