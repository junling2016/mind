const parseNodeData = node => {
  if (!node) return

  if (node instanceof Array) {
    node.forEach(childNode => {
      parseNodeData(childNode)
    })
  } else {
    node.name = node.name || node.ename

    if (node.nodeType === 'STRATEGY' && node.childenDiagramNodes) {
      node.expand = false
      const fields = []
      const actions = []
      node.children = []
      node.childenDiagramNodes.forEach(childNode => {
        parseNodeData(childNode)
        if (childNode.nodeType === 'ACTION') {
          actions.push(childNode)
        } else {
          fields.push(childNode)
        }
      })

      if (fields.length) {
        node.children.push({
          id: 'strategy_field',
          name: '特征',
          children: fields
        })
      }

      if (actions.length) {
        node.children.push({
          id: 'strategy_action',
          name: '处罚动作',
          children: actions
        })
      }
    } else {
      node.children = node.childenDiagramNodes
      parseNodeData(node.children)
    }
  }
}

const parseData = data => {
  data.name = data.name || data.ename
  parseNodeData(data.childenDiagramNodes)
  parseNodeData(data.parentsDiagramNodes)

  data.leftChildren = [
    {
      name: '特征',
      id: 'field',
      children: data.parentsDiagramNodes
    }
  ]

  data.children = [
    {
      name: '策略',
      id: 'strategy',
      children: data.childenDiagramNodes
    }
  ]
}
