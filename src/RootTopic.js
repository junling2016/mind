import Topic from './topic'
import Curve from './connections/curve'
import { createElement, setElementStyle } from './utils/dom'

class RootTopic extends Topic {
  // 中心点横坐标位置
  centerPosX = null

  // 中心点纵坐标位置
  centerPosY = null

  constructor(options) {
    super(options)
  }

  createChildren() {
    const { children, leftChildren } = this.options.data
    const $child = createElement('div', { class: 'mind-topic-children' })
    const rightChildrenTopic = this.createChildrenByStructure(
      children,
      'right',
      $child
    )
    const leftChildrenTopic = this.createChildrenByStructure(
      leftChildren,
      'left',
      $child
    )

    this.children = rightChildrenTopic.concat(leftChildrenTopic)
    this.$el.appendChild($child)
  }

  createChildrenByStructure(children, structure, $child) {
    if (!children) return []

    return children.map(child => {
      const childTopic = new Topic({
        mind: this.mind,
        parent: this,
        structure,
        data: child
      })
      $child.appendChild(childTopic.$el)

      return childTopic
    })
  }

  render() {
    this.mind.viewport.$el.appendChild(this.$el)
    this.resetPosToCenter()
    this.drawLines()

    this.children.forEach(child => {
      child.render()
    })
  }

  // 将结构定位到画布中心
  resetPosToCenter() {
    this.resetNodePos()
    this.resetChildTopicPos('left')
    this.resetChildTopicPos('right')
  }

  // 定位根节点
  resetNodePos() {
    const zoom = this.mind.getZoom()
    const { width, height } = this.node.getSize()
    const { width: vw, height: vh } = this.mind.getViewportSize()
    const left = (vw - width / zoom) / 2
    const top = (vh - height / zoom) / 2

    this.centerPosX = vw / 2
    this.centerPosY = vh / 2

    setElementStyle(this.$topicBox, {
      left,
      top
    })
  }

  // 定位分支主题
  resetChildTopicPos(structure) {
    const zoom = this.mind.getZoom()
    const { width: nodeW } = this.node.getSize()
    const { rootMargin, branchMargin } = this.mind.options
    const topics = this.children.filter(
      child => child.options.structure === structure
    )
    const topicSizes = topics.map(child => child.getSize())

    let totalHeight = topicSizes.reduce((total, current) => {
      return total + current.height / zoom
    }, 0)

    totalHeight += (topics.length - 1) * branchMargin

    let posTop = this.centerPosY - totalHeight / 2

    topicSizes.forEach((size, index) => {
      const topic = topics[index]
      const posLeft =
        structure === 'left'
          ? this.centerPosX - nodeW / zoom / 2 - rootMargin - size.width / zoom
          : this.centerPosX + nodeW / zoom / 2 + rootMargin

      topic.setPosition(posLeft, posTop)
      posTop += size.height / zoom + branchMargin
    })
  }

  drawLines() {
    const zoom = this.mind.getZoom()
    const { centerPosX, centerPosY } = this
    const { lineColor } = this.mind.options

    this.children.forEach((child, index) => {
      const { width, height } = child.getSize()
      const { left, top } = child.getPosition()
      const endX =
        child.options.structure === 'left' ? left + width / zoom : left
      const endY = top + height / zoom / 2

      const curve = new Curve({
        type: 'gradient',
        start: [centerPosX, centerPosY],
        end: [endX, endY],
        stroke: lineColor[index],
        fill: lineColor[index]
      })

      this.$pathGroup.appendChild(curve.$el)
    })
  }
}

export default RootTopic
