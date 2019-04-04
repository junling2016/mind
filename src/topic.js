import Node from './Node'
import TopicLine from './connections/topicLine'
import {
  createElement,
  setElementStyle,
  addClass,
  removeClass
} from './utils/dom'

class Topic {
  // 配置项
  options = {
    // 根实例
    mind: null,
    // 父主题
    parent: null,
    // root, left, right
    structure: 'right',
    // 数据
    data: null
  }

  // 根实例
  mind = null

  // dom对象
  $el = null

  $topicBox = null

  $expandBox = null

  $pathBox = null

  // 路径组
  $pathGroup = null

  // 当前节点
  node = null

  // 父主题
  parent = null

  // 子主题
  children = []

  // 当前节点是否展开
  isExpand = true

  constructor(options) {
    Object.assign(this.options, options)

    this.parent = this.options.parent
    this.mind = this.options.mind

    this.isExpand = options.data.expand !== false

    this.create()
  }

  render() {
    const { children } = this

    if (children.length) {
      this.isExpand && this.drawLines()
      children.forEach(child => {
        child.render()
      })
    }
  }

  // 创建
  create() {
    const { data, structure } = this.options

    this.$el = createElement('div', {
      class: `mind-topic-container mind-topic-${structure} ${
        this.isExpand ? 'is-expand' : ''
      }`
    })

    this.createNode()

    if (data.children && data.children.length) {
      this.createChildren()
      this.createPaths()
      this.createExpand()
    }
  }

  // 创建主题节点
  createNode() {
    const { parent, options } = this
    let nodeType = 'normal'

    const $topicBox = (this.$topicBox = createElement(
      'div',
      {
        class: 'mind-topic-box'
      },
      this.$el
    ))

    if (options.structure === 'root') {
      nodeType = 'root'
    } else if (parent && parent.options.structure === 'root') {
      nodeType = 'branch'
    }

    this.node = new Node(this.getNodeConfig(options.data))

    $topicBox.appendChild(this.node.$el)
  }

  // 创建伸缩句柄
  createExpand() {
    this.$expandBox = createElement(
      'span',
      {
        class: 'mind-expand-box'
      },
      this.$topicBox
    )
  }

  // 创建子主题
  createChildren() {
    const { data, structure } = this.options
    const { children } = data
    const $child = createElement('div', { class: 'mind-topic-children' })

    this.children = children.map(child => {
      const childTopic = new Topic({
        mind: this.mind,
        parent: this,
        structure,
        data: child
      })
      $child.appendChild(childTopic.$el)

      return childTopic
    })

    if (structure === 'left') {
      this.$el.insertBefore($child, this.$topicBox)
    } else {
      this.$el.appendChild($child)
    }
  }

  // 创建路径
  createPaths() {
    const svg = (this.$pathBox = createElement(
      'svg',
      {
        width: '100%',
        height: '100%',
        xmlns: 'http://www.w3.org/2000/svg',
        'xmlns:xlink': 'http://www.w3.org/1999/xlink'
      },
      this.$el
    ))

    this.$pathGroup = createElement('g', null, svg)
  }

  getNodeConfig(nodeData) {
    const {
      draggable,
      showTooltip,
      tooltipFormat,
      tooltipDelay
    } = this.options.mind.options

    return Object.assign(
      {
        draggable,
        showTooltip,
        tooltipFormat,
        tooltipDelay
      },
      nodeData
    )
  }

  // 设置定位
  setPosition(left, top) {
    setElementStyle(this.$el, {
      left,
      top
    })
  }

  // 获取定位位置
  getPosition() {
    const left = parseInt(this.$el.style.left, 10)
    const top = parseInt(this.$el.style.top, 10)

    return {
      left,
      top
    }
  }

  // 获取尺寸
  getSize() {
    return this.$el.getBoundingClientRect()
  }

  // 绘制连接线
  drawLines() {
    const zoom = this.mind.getZoom()
    const { structure } = this.options
    const topicRect = this.getSize()
    const startPos = this.getLineStartPos()

    this.children.forEach(child => {
      const subTopicRect = child.getSize()
      const endPosY =
        (subTopicRect.top - topicRect.top + subTopicRect.height / 2) / zoom
      const endPosX =
        (structure === 'left'
          ? subTopicRect.right - topicRect.left
          : subTopicRect.left - topicRect.left) / zoom
      const topicLine = new TopicLine({
        start: [startPos.left / zoom, startPos.top / zoom],
        end: [endPosX, endPosY]
      })

      this.$pathGroup.appendChild(topicLine.$el)
    })
  }

  // 更新当前节点的连接路径
  updateConnections() {
    if (!this.children.length) return

    this.$pathGroup.innerHTML = ''

    if (this.isExpand) {
      this.drawLines()
    }
  }

  // 更新父节点的连接关系，并层层往上更新
  updateParentConnections() {
    let parentTopic = this.parent

    if (parentTopic) {
      parentTopic.updateConnections()
      parentTopic.updateParentConnections()
    }
  }

  // 更新子节点的连接关系，并层层往下更新
  updateChildConnections() {
    this.children.forEach(child => {
      child.updateConnections()
      child.updateChildConnections()
    })
  }

  // 获取连线起始位置
  getLineStartPos() {
    const { structure } = this.options
    const topicRect = this.getSize()
    const nodeRect = this.node.getBoundRect()
    const top = nodeRect.top - topicRect.top + nodeRect.height / 2
    const left =
      structure === 'left'
        ? nodeRect.left - topicRect.left
        : nodeRect.left - topicRect.left + nodeRect.width

    return {
      left,
      top
    }
  }

  triggerExpand() {
    this.isExpand = !this.isExpand

    if (this.isExpand) {
      addClass(this.$el, 'is-expand')
    } else {
      removeClass(this.$el, 'is-expand')
    }

    const rootTopic = this.getRootTopic()
    rootTopic.resetPosToCenter()

    this.updateParentConnections()
    this.updateConnections()
    this.updateChildConnections()
  }

  // 获取根主题
  getRootTopic() {
    let topic = this

    while (topic.parent) {
      topic = topic.parent
    }

    return topic
  }
}

export default Topic
