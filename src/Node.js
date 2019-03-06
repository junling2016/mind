import defaultOptions from './options'
import * as Tooltip from './Tooltip'
import * as Events from './events'
import { createElement, setElementStyle, addClass } from './utils/dom'
import { deepMerge } from './utils/util'

class Node {
  // dom对象
  $el = null

  // 伸缩句柄对象
  $expandBox = null

  // 配置项
  options = {
    nodeType: 'normal',
    data: null,
    showTooltip: false,
    formatTooltip: null,
    tooltipDelay: 0
  }

  constructor(options) {
    this.options = deepMerge(this.options, options)
    this.create()
    this.setStyle()
    this.initEvents()
  }

  // 创建dom
  create() {
    const { title } = this.options.data
    this.$el = createElement('div', { class: 'mind-node' })
    const $title = createElement('div', { class: 'mind-node-inner' }, this.$el)
    $title.innerText = title
  }

  // 设置主节点样式
  setStyle() {
    const { nodeType, data } = this.options
    // const style = deepMerge(defaultOptions[`${nodeType}NodeStyle`], data.style)
    setElementStyle(this.$el, data.style)

    if (data.className) {
      addClass(this.$el, data.className)
    }
  }

  initEvents() {
    Events.on(this.$el, 'mouseenter.nodehover', this.onMouseEnter.bind(this))
    Events.on(this.$el, 'mouseleave.nodehover', this.onMouseLeave.bind(this))
  }

  onMouseEnter() {
    const { data, showTooltip, formatTooltip, tooltipDelay } = this.options
    if (!showTooltip) return
    const content = formatTooltip ? formatTooltip(data, this) : data.title
    if (!content) return

    const { width, left, top } = this.getSize()
    Tooltip.setContent(content)
    Tooltip.setPosition(left + width / 2, top)
    Tooltip.show(tooltipDelay)
  }

  onMouseLeave() {
    Tooltip.hide()
  }

  getSize() {
    return this.$el.getBoundingClientRect()
  }

  getData() {
    return this.options.data
  }

  // 设置节点位置
  setPosition(left, top) {
    setElementStyle(this.$el, {
      left,
      top
    })
  }

  // 移除节点
  remove() {
    this.container && this.container.removeChild(this.el)
  }
}

export default Node
