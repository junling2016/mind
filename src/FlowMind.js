import Mind from './Mind'
import Node from './Node'
import LinkLine from './connections/LinkLine'
import Gator from './EventDeletage'
import { createElement, addClass, hasClass, setElementStyle } from './utils/dom'

const doc = document

class FlowMind extends Mind {
  // 节点列表
  nodes = []

  nodeTree = null

  $pathBox = null

  $pathGroup = null

  constructor(el, options) {
    super(el, options)

    addClass(this.$el, 'mind-flow')

    this.nodeTree = this.createNode(options.data, 0)

    this.nodes.forEach(({ node }) => {
      this.viewport.$el.appendChild(node.$el)
    })

    this.createPaths()
    this.createLabels()

    this.setPosition()
    this.createConnections(this.nodeTree)

    this.initEvents()
  }

  // 创建节点
  createNode(nodeData, axis) {
    if (!nodeData) return

    if (nodeData instanceof Array) {
      return nodeData.map(data => {
        const parents = this.createNode(data.parents, axis - 1)
        const children = this.createNode(data.children, axis + 1)

        const node = {
          node: new Node({
            nodeType: 'flow',
            data,
            showTooltip: this.options.showTooltip,
            formatTooltip: this.options.formatTooltip,
            tooltipDelay: this.options.tooltipDelay
          }),
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
        node: new Node({
          nodeType: 'root',
          data: nodeData,
          showTooltip: this.options.showTooltip,
          formatTooltip: this.options.formatTooltip,
          tooltipDelay: this.options.tooltipDelay
        }),
        axis,
        parents: this.createNode(nodeData.parents, axis - 1),
        children: this.createNode(nodeData.children, axis + 1)
      }

      this.nodes.push(node)
      return node
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
      this.viewport.$el
    ))

    this.$pathGroup = createElement('g', null, svg)
  }

  createLabels() {
    this.$labelContainer = createElement(
      'div',
      {
        class: 'mind-label-container'
      },
      this.viewport.$el
    )
  }

  // 设置节点的定位
  setPosition() {
    const { width: vw, height: vh } = this.options
    const rootNode = this.nodeTree.node
    const { width: rootW, height: rootH } = rootNode.getSize()
    const centerPosX = vw / 2
    const centerPosY = vh / 2

    rootNode.setPosition(centerPosX - rootW / 2, centerPosY - rootH / 2)

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
      const { width: rootW } = this.nodeTree.node.getSize()
      const { width, height } = nodeObj.node.getSize()
      const subNodeObjList =
        structure === 'left' ? nodeObj.parents : nodeObj.children

      let posX
      let posY =
        centerPosY -
        (totalLeaf / 2 - nodeObj.leaf / 2 - leafs) * flowNodeMarginH -
        height / 2

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

      nodeObj.node.setPosition(posX, posY)

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
        const { connectionLabel } = subNodeObj.node.options.data
        const subNodeBound = this.getNodeBound(subNodeObj)
        this.drawLink(nodeBound, subNodeBound, connectionLabel)
        this.createConnections(subNodeObj)
      })
    parents &&
      parents.forEach(subNodeObj => {
        const { connectionLabel } = nodeObj.node.options.data
        const subNodeBound = this.getNodeBound(subNodeObj)
        this.drawLink(subNodeBound, nodeBound, connectionLabel)
        this.createConnections(subNodeObj)
      })
  }

  // 绘制箭头连线
  drawLink(parentBound, childBound, label) {
    const { linkLineStyle, showConnectionLabel } = this.options
    const from = [
      parentBound.left + parentBound.width,
      parentBound.top + parentBound.height / 2
    ]
    const to = [childBound.left, childBound.top + childBound.height / 2]

    const line = new LinkLine(from, to, linkLineStyle)
    this.$pathGroup.appendChild(line.$path)

    if (showConnectionLabel && label) {
      this.drawLabel(parentBound, childBound, label)
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
  }

  initEvents() {
    Gator(doc).on('click.node', '.mind-node', this.onNodeClick.bind(this))
  }

  // 节点点击事件
  onNodeClick(e) {
    const { onNodeClick } = this.options

    let $node = e.target

    while (!hasClass($node, 'mind-node')) {
      $node = $node.parentNode
    }

    const node = this.getNodeByElement($node)
    if (node && onNodeClick) {
      onNodeClick(node.options.data, node)
    }
  }

  // 获取节点位置和尺寸信息
  getNodeBound(nodeObj) {
    const { node } = nodeObj
    const { width, height } = node.getSize()
    const { left, top } = node.$el.style

    return {
      width,
      height,
      left: parseInt(left, 10),
      top: parseInt(top, 10)
    }
  }

  // 根据dom获取节点
  getNodeByElement(el) {
    const nodeObj = this.nodes.find(({ node }) => node.$el === el)

    return nodeObj && nodeObj.node
  }
}

export default FlowMind
