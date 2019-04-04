import tooltip from './tooltip'
import * as Events from './events'
import {
  createElement,
  setElementStyle,
  addClass,
  removeClass
} from './utils/dom'
import { deepMerge } from './utils/util'

const NodeConfig = {
  /**
   * 节点文字
   * @type {String}
   */
  name: null,

  /**
   * 自定义类名
   * @type {String}
   */
  className: null,

  /**
   * 节点图标
   * @type {String}
   */
  icon: null,

  /**
   * 节点超链接
   * @type {String}
   */
  href: null,

  /**
   * 是否允许拖拽
   * @type {Boolean}
   */
  draggable: false,

  /**
   * 鼠标移到节点上是否展示tooltip
   * @type {Boolean}
   */
  showTooltip: false,

  /**
   * tooltip延迟出现的毫秒数
   * @type {Number}
   */
  tooltipDelay: 500,

  /**
   * 返回的html片段作为tooltip内容展示
   * @type {Function}
   */
  tooltipFormat: node => {
    return node.config.name
  }
}

class Node {
  constructor(config) {
    this.config = deepMerge(NodeConfig, config)
    this.init()
    this.initEvents()
  }

  init() {
    const { name, className, icon, href, draggable } = this.config
    let nodeClassName = 'mind-node'
    nodeClassName += className ? ' ' + className : ''
    nodeClassName += draggable ? ' draggable' : ''

    const $el = createElement('div', { class: nodeClassName })
    let temp = ''

    if (icon) {
      temp += `<i class="${icon}"></i>`
    }
    temp += `<span class="mind-node-inner">${name}</span>`
    if (href) {
      temp += `<a href="${href}" class="mind-link iconfont icon-link" target="_blank"></a>`
    }
    $el.innerHTML = temp
    this.$el = $el
  }

  initEvents() {
    Events.on(this.$el, 'mouseenter.nodehover', this.onMouseEnter.bind(this))
    Events.on(this.$el, 'mouseleave.nodehover', this.onMouseLeave.bind(this))
  }

  render(container, position) {
    this.setPosition(position)
    container.appendChild(this.$el)
  }

  /**
   * 鼠标移入节点
   */
  onMouseEnter() {
    const { showTooltip, tooltipFormat, tooltipDelay } = this.config

    if (!showTooltip || !tooltipFormat || this.isDragging) return

    const content = tooltipFormat(this)

    if (content) {
      const { width, left, top } = this.$el.getBoundingClientRect()
      tooltip.setContent(content)
      tooltip.setPosition(left + width / 2, top)
      tooltip.show(tooltipDelay)
    }
  }

  /**
   * 鼠标移出节点
   */
  onMouseLeave() {
    tooltip.hide()
  }

  /**
   * 获取节点位置尺寸信息
   */
  getBoundRect() {
    return this.$el.getBoundingClientRect()
  }

  /**
   * 设置节点位置
   * @param {Object} param 包含定位的left和top属性
   */
  setPosition({ left, top }) {
    setElementStyle(this.$el, { left, top })
  }

  setStyle(style) {
    setElementStyle(this.$el, style)
  }

  /**
   * 更新节点的拖动状态
   * @param {Boolean} isDragging
   */
  setDrag(isDragging) {
    this.isDragging = isDragging

    if (isDragging) {
      tooltip.hide()
    }
  }

  /**
   * 获取节点的定位
   */
  getPosition() {
    return {
      left: parseInt(this.$el.style.left, 10),
      top: parseInt(this.$el.style.top, 10)
    }
  }

  /**
   * 更改节点类名
   * @param {String} addClassName 添加的类名
   * @param {String} removeClassName 移除的类名
   */
  changeClass(addClassName, removeClassName) {
    addClass(this.$el, addClassName)
    removeClass(this.$el, removeClassName)
  }

  /** 移除节点和事件绑定 */
  destroy() {
    const $parent = this.$el.parentNode

    Events.off(this.$el, 'mouseenter.nodehover')
    Events.off(this.$el, 'mouseleave.nodehover')

    $parent && $parent.removeChild(this.$el)
  }
}

export default Node
