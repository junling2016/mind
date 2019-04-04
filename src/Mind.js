import Viewport from './Viewport'
import defaultConfig from './options'
import { deepMerge } from './utils/util'
import { createElement } from './utils/dom'
import tooltip from './tooltip'

const doc = document

class Mind {
  // 容器
  $container = null

  // dom对象
  $el = null

  // 视图画布
  viewport = null

  constructor(el, options) {
    this.$container = typeof el === 'string' ? doc.querySelector(el) : el
    this.options = deepMerge(defaultConfig, options)
    this.create()
    this.createViewport()
    tooltip.destroy()
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
    const parentNode = this.$el.parentNode
    if (parentNode) {
      parentNode.removeChild(this.$el)
    }
  }
}

export default Mind
