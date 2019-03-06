const parseNodeData = node => {
  if (!node) return

  if (node instanceof Array) {
    node.forEach(childNode => {
      parseNodeData(childNode)
    })
  } else {
    node.title = node.name || node.ename

    if (node.nodeType) {
      node.className = `mind-node-${node.nodeType}`
    }

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
          title: '特征',
          children: fields,
          style: {
            color: '#333',
            backgroundColor: '#fff',
            borderColor: '#FDB813',
            borderWidth: 1,
            borderStyle: 'solid'
          }
        })
      }

      if (actions.length) {
        node.children.push({
          id: 'strategy_action',
          title: '处罚动作',
          children: actions,
          style: {
            color: '#333',
            backgroundColor: '#fff',
            borderColor: 'rgb(255, 83, 92)',
            borderWidth: 1,
            borderStyle: 'solid'
          }
        })
      }
    } else {
      node.children = node.childenDiagramNodes
      parseNodeData(node.children)
    }
  }
}

const parseData = data => {
  data.title = data.name || data.ename
  parseNodeData(data.childenDiagramNodes)
  parseNodeData(data.parentsDiagramNodes)

  data.leftChildren = [
    {
      title: '特征',
      id: 'field',
      children: data.parentsDiagramNodes
    }
  ]

  data.children = [
    {
      title: '策略',
      id: 'strategy',
      children: data.childenDiagramNodes
    }
  ]
}
