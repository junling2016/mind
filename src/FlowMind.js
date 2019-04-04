import Mind from './Mind'
import Node from './Node'
import LinkLine from './connections/LinkLine'
import Gator from './EventDeletage'
import {
  createElement,
  addClass,
  removeClass,
  hasClass,
  setElementStyle
} from './utils/dom'
import {
  isRectOverlap,
  isRectVertOverlap,
  isRectHoriOverlap
} from './utils/util'

const doc = document

/**
 * 获取两个矩形连线的方向
 * @param {Object} fromBound
 * @param {Object} toBound
 */
const getLinkDirection = (fromBound, toBound) => {
  const isVertOverlap = isRectVertOverlap(fromBound, toBound)
  const isHoriOverlap = isRectHoriOverlap(fromBound, toBound)

  if (isVertOverlap && isHoriOverlap) return

  if (isVertOverlap) {
    return 'horizontal'
  } else if (isHoriOverlap) {
    return 'vertical'
  } else {
    const vertInstance = Math.min(
      Math.abs(fromBound.top - toBound.bottom),
      Math.abs(fromBound.bottom - toBound.top)
    )
    const horiInstance = Math.min(
      Math.abs(fromBound.left - toBound.right),
      Math.abs(fromBound.right - toBound.left)
    )

    return vertInstance > horiInstance ? 'vertical' : 'horizontal'
  }
}

class FlowMind extends Mind {
  // 节点列表
  nodes = []

  nodeTree = null

  $pathBox = null

  $pathGroup = null

  connections = []

  constructor(el, options) {
    super(el, options)

    this.$viewport = this.viewport.$view

    addClass(this.$el, 'mind-flow')

    this.nodeTree = this.createNode(options.data)

    this.nodes.forEach(({ node }) => {
      this.$viewport.appendChild(node.$el)
    })

    this.createPaths()
    this.createLabels()

    this.setPosition()

    this.createConnections(this.nodeTree)

    if (!this.options.showConnectionLabel) {
      this.hideLabel()
    }

    this.initEvents()
  }

  // 创建节点
  createNode(nodeData, axis = 0, key, node) {
    if (!nodeData) return

    if (nodeData instanceof Array) {
      return nodeData.map(data => {
        const parents = this.createNode(data.parents, axis - 1)
        const children = this.createNode(data.children, axis + 1)

        const node = {
          node: new Node(this.getNodeConfig(data)),
          axis,
          parents,
          children
        }

        if (parents && parents.length) {
          node.leaf = parents.reduce((total, parent) => total + parent.leaf, 0)
        } else if (children && children.length) {
          node.leaf = children.reduce((total, child) => total + child.leaf, 0)
        } else {
          node.leaf = 1
        }

        this.nodes.push(node)

        return node
      })
    } else {
      const node = {
        node: new Node(this.getNodeConfig(nodeData)),
        axis,
        parents: this.createNode(nodeData.parents, axis - 1, 'children', node),
        children: this.createNode(nodeData.children, axis + 1, 'parents', node)
      }

      this.nodes.push(node)
      return node
    }
  }

  getNodeConfig(nodeData) {
    const { draggable, showTooltip, tooltipFormat, tooltipDelay } = this.options

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

  getChildNode(node) {
    console.log(this.nodeTree)
    const { id } = node
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
      this.$viewport
    ))

    this.$pathGroup = createElement('g', null, svg)
  }

  createLabels() {
    this.$labelContainer = createElement(
      'div',
      {
        class: 'mind-label-container'
      },
      this.$viewport
    )
  }

  // 设置节点的定位
  setPosition() {
    const { width: vw, height: vh } = this.options
    const rootNode = this.nodeTree.node
    const { width: rootW, height: rootH } = rootNode.getBoundRect()
    const centerPosX = vw / 2
    const centerPosY = vh / 2

    rootNode.setPosition({
      left: centerPosX - rootW / 2,
      top: centerPosY - rootH / 2
    })

    this.setNodePosition(this.nodeTree.parents, 'left', centerPosY)
    this.setNodePosition(this.nodeTree.children, 'right', centerPosY)
  }

  // 计算并设置各个节点的定位
  setNodePosition(nodeObjList, structure, centerPosY) {
    const {
      width: vw,
      flowRootMargin,
      flowNodeMarginW,
      flowNodeMarginH
    } = this.options

    if (!nodeObjList || !nodeObjList.length) return

    const centerPosX = vw / 2

    const totalLeaf = nodeObjList.reduce(
      (total, nodeObj) => nodeObj.leaf + total,
      0
    )

    let leafs = 0

    nodeObjList.forEach(nodeObj => {
      const { width: rootW } = this.nodeTree.node.getBoundRect()
      const { width, height } = nodeObj.node.getBoundRect()
      const subNodeObjList =
        structure === 'left' ? nodeObj.parents : nodeObj.children

      let posX
      let posY =
        centerPosY -
        (totalLeaf / 2 - nodeObj.leaf / 2 - leafs) * flowNodeMarginH -
        height / 2

      // console.log(nodeObj)

      if (structure === 'left') {
        posX =
          centerPosX -
          ((Math.abs(nodeObj.axis) - 1) * flowNodeMarginW +
            flowRootMargin +
            width / 2) -
          rootW / 2
      } else {
        posX =
          centerPosX +
          ((Math.abs(nodeObj.axis) - 1) * flowNodeMarginW +
            flowRootMargin -
            width / 2) +
          rootW / 2
      }

      nodeObj.node.setPosition({
        left: posX,
        top: posY
      })

      leafs += nodeObj.leaf

      this.setNodePosition(subNodeObjList, structure, posY + height / 2)
    })
  }

  // 创建连接关系
  createConnections(nodeObj) {
    const { children, parents } = nodeObj
    const nodeBound = this.getNodeBound(nodeObj)

    children &&
      children.forEach(subNodeObj => {
        const { connectionLabel } = subNodeObj.node.config
        const subNodeBound = this.getNodeBound(subNodeObj)
        const { line, labelEl } = this.drawLink(
          nodeBound,
          subNodeBound,
          connectionLabel
        )
        this.connections.push({
          fromNode: nodeObj.node,
          toNode: subNodeObj.node,
          line,
          labelEl
        })
        this.createConnections(subNodeObj)
      })
    parents &&
      parents.forEach(subNodeObj => {
        const { connectionLabel } = nodeObj.node.config
        const subNodeBound = this.getNodeBound(subNodeObj)
        const { line, labelEl } = this.drawLink(
          subNodeBound,
          nodeBound,
          connectionLabel
        )
        this.connections.push({
          fromNode: subNodeObj.node,
          toNode: nodeObj.node,
          line,
          labelEl
        })
        this.createConnections(subNodeObj)
      })
  }

  // 绘制箭头连线
  drawLink(parentBound, childBound, label) {
    let labelEl
    const { linkLineStyle } = this.options
    const from = [
      parentBound.left + parentBound.width,
      parentBound.top + parentBound.height / 2
    ]
    const to = [childBound.left, childBound.top + childBound.height / 2]

    const line = new LinkLine(from, to, linkLineStyle)
    this.$pathGroup.appendChild(line.$path)

    if (label) {
      labelEl = this.drawLabel(parentBound, childBound, label)
    }

    return {
      line,
      labelEl
    }
  }

  drawLabel(parentBound, childBound, label) {
    const posX = (parentBound.left + parentBound.width + childBound.left) / 2
    const posY =
      (parentBound.top +
        parentBound.height / 2 +
        childBound.top +
        childBound.height / 2) /
      2
    const $label = createElement(
      'div',
      {
        class: 'mind-label'
      },
      this.$labelContainer
    )
    $label.innerText = label

    const { width, height } = $label.getBoundingClientRect()

    setElementStyle($label, {
      left: posX - width / 2,
      top: posY - height / 2
    })

    return $label
  }

  updateLink(node) {
    const connections = this.connections.filter(({ fromNode, toNode }) => {
      return fromNode === node || toNode === node
    })

    connections.forEach(connection => {
      const { fromNode, toNode, line, labelEl } = connection
      const fromBoundRect = this.getNodeBound(fromNode)
      const toBoundRect = this.getNodeBound(toNode)
      const {
        left: fromLeft,
        right: fromRight,
        top: fromTop,
        bottom: fromBottom,
        width: fromWidth,
        height: fromHeight
      } = fromBoundRect
      const {
        left: toLeft,
        right: toRight,
        top: toTop,
        bottom: toBottom,
        width: toWidth,
        height: toHeight
      } = toBoundRect

      const direction = getLinkDirection(fromBoundRect, toBoundRect)
      let from
      let to

      if (!direction) {
        line.clear()
        addClass(labelEl, 'mind-hidden')
        return
      }

      if (direction === 'horizontal') {
        from =
          fromLeft > toRight
            ? [fromLeft, fromTop + fromHeight / 2]
            : [fromRight, fromTop + fromHeight / 2]
        to =
          fromLeft > toRight
            ? [toRight, toTop + toHeight / 2]
            : [toLeft, toTop + toHeight / 2]
        line.update({
          from,
          to,
          direction
        })
      } else {
        from =
          fromTop > toBottom
            ? [fromLeft + fromWidth / 2, fromTop]
            : [fromLeft + fromWidth / 2, fromBottom]
        to =
          fromTop > toBottom
            ? [toLeft + toWidth / 2, toBottom]
            : [toLeft + toWidth / 2, toTop]
        line.update({
          from,
          to,
          direction
        })
      }

      labelEl && this.updateLabel(labelEl, from, to)
    })
  }

  updateLabel(labelEl, from, to) {
    const { width, height } = labelEl.getBoundingClientRect()

    removeClass(labelEl, 'mind-hidden')

    setElementStyle(labelEl, {
      left: (from[0] + to[0] - width) / 2,
      top: (from[1] + to[1] - height) / 2
    })
  }

  updateAllLabelPosition() {
    this.connections.forEach(connection => {
      const { labelEl, line } = connection

      if (!labelEl) return

      this.updateLabel(labelEl, line.from, line.to)
    })
  }

  initEvents() {
    Gator(doc).on('click.node', '.mind-node', this.onNodeClick.bind(this))

    if (this.options.draggable) {
      Gator(this.$viewport).on(
        'mousedown.nodedrag',
        '.mind-node.draggable',
        this.onNodeDragStart.bind(this)
      )
    }
  }

  // 节点点击事件
  onNodeClick(e) {
    if (this.isNodeDragging) return

    const { onNodeClick } = this.options
    const node = this.getNodeByChildElement(e.target)

    if (node && onNodeClick) {
      onNodeClick(node.config, node)
    }
  }

  /**
   * 节点开始拖动
   * @param {Event} event
   */
  onNodeDragStart(event) {
    event.stopPropagation()

    const node = (this.draggingNode = this.getNodeByChildElement(event.target))
    node.setDrag(true)
    this.originNodePos = node.getPosition()
    this.dragStartPos = {
      x: event.pageX,
      y: event.pageY
    }

    Gator(this.$viewport).on(
      'mousemove.nodedrag',
      this.onNodeDragging.bind(this)
    )

    Gator(doc).on('mouseup.nodedrag', this.onNodeDragEnd.bind(this))
  }

  /**
   * 节点拖动过程中
   * @param {Event} event
   */
  onNodeDragging(event) {
    event.stopPropagation()

    if (!this.draggingNode) return

    this.isNodeDragging = true

    this.draggingNode.setStyle({
      left: this.originNodePos.left + event.pageX - this.dragStartPos.x,
      top: this.originNodePos.top + event.pageY - this.dragStartPos.y,
      zIndex: 1
    })

    this.updateLink(this.draggingNode)
  }

  /**
   * 节点停止拖动
   */
  onNodeDragEnd() {
    if (!this.draggingNode) return

    this.draggingNode.setDrag(false)
    this.draggingNode = null

    Gator(this.$viewport).off('mousemove.nodedrag')
    Gator(doc).off('mouseup.nodedrag')

    setTimeout(() => {
      this.isNodeDragging = false
    })
  }

  // 获取节点位置和尺寸信息
  getNodeBound(nodeObj) {
    const node = nodeObj.node || nodeObj
    const { width, height } = node.getBoundRect()
    const left = parseInt(node.$el.style.left, 10)
    const top = parseInt(node.$el.style.top, 10)

    return {
      width,
      height,
      left,
      top,
      right: left + width,
      bottom: top + height
    }
  }

  // 通过node子节点获取node实例
  getNodeByChildElement(el) {
    while (!hasClass(el, 'mind-node')) {
      el = el.parentNode
    }

    return this.getNodeByElement(el)
  }

  // 根据dom获取节点
  getNodeByElement(el) {
    const nodeObj = this.nodes.find(({ node }) => node.$el === el)

    return nodeObj && nodeObj.node
  }

  showLabel() {
    removeClass(this.$el, 'mind-label-hide')
    if (this.options.draggable) {
      this.updateAllLabelPosition()
    }
  }

  hideLabel() {
    addClass(this.$el, 'mind-label-hide')
  }
}

export default FlowMind
