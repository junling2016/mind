import * as Events from './events'
import {
  createElement,
  setElementStyle,
  addClass,
  removeClass
} from './utils/dom'

const doc = document

class Viewport {
  // 顶层实例
  root = null

  // 上层容器
  $container = null

  // 视图dom节点
  $el = null

  // 配置项
  options = null

  // 当前视图缩放比例
  scale = 1

  dragingFlag = false

  constructor(root) {
    this.root = root
    this.$container = root.$el
    this.options = root.options

    this.create()
    this.setStyle()
    this.moveToCenter()
    this.initEvents()
  }

  // 创建画布
  create() {
    this.$el = createElement('div', { class: 'mind-designer' }, this.$container)
    this.$view = createElement('div', { class: 'mind-viewport' }, this.$el)
  }

  // 设置视图样式
  setStyle() {
    const { width, height, backgroundColor } = this.options
    setElementStyle(this.$el, {
      width,
      height,
      backgroundColor
    })
  }

  // 移动到指定位置
  moveTo(left, top) {
    this.$container.scrollLeft = left
    this.$container.scrollTop = top
  }

  // 将画布移动至中心位置
  moveToCenter() {
    const {
      width: wrapW,
      height: wrapH
    } = this.$container.getBoundingClientRect()
    const { width, height } = this.options

    this.moveTo((width - wrapW) / 2, (height - wrapH) / 2)
  }

  // 注册事件
  initEvents() {
    Events.on(this.$el, 'mousedown.dragmove', this.onDragStart.bind(this))
  }

  // 拖动开始
  onDragStart(event) {
    event.stopPropagation()

    const { pageX, pageY } = event
    const { scrollLeft, scrollTop } = this.$container
    this.dragStartMousePosition = {
      pageX,
      pageY
    }
    this.dragStartScroll = {
      scrollLeft,
      scrollTop
    }

    Events.on(doc, 'mousemove.dragmove', this.onDraging.bind(this))
    Events.on(doc, 'mouseup.dragmove', this.onDragEnd.bind(this))
  }

  // 拖动中
  onDraging(event) {
    event.stopPropagation()

    const { scrollLeft, scrollTop } = this.dragStartScroll
    const { pageX, pageY } = this.dragStartMousePosition
    const curScrollLeft = scrollLeft - event.pageX + pageX
    const curScrollTop = scrollTop - event.pageY + pageY

    this.moveTo(curScrollLeft, curScrollTop)

    if (!this.dragingFlag) {
      addClass(this.$el, 'mind-no-event')
      this.dragingFlag = true
    }
  }

  // 结束拖动
  onDragEnd(e) {
    Events.off(doc, 'mousemove.dragmove')
    Events.off(doc, 'mouseup.dragmove')
    this.dragingFlag = false
    removeClass(this.$el, 'mind-no-event')
  }

  // 缩放
  zoom(scale) {
    this.scale = scale || 1
    setElementStyle(this.$el, { transform: `scale(${this.scale})` })
  }

  // 放大
  zoomIn() {
    const { zoomMax, zoomStep } = this.options
    this.zoom(Math.min(this.scale + zoomStep, zoomMax))
  }

  // 缩小
  zoomOut() {
    const { zoomMin, zoomStep } = this.options
    this.zoom(Math.max(this.scale - zoomStep, zoomMin))
  }

  getZoom() {
    return this.scale
  }
}

export default Viewport
