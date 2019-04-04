const parseFlowData = (data, nodes = [], parent) => {
  if (!data) return

  if (data instanceof Array) {
    data.forEach(item => {
      parseFlowData(item, nodes)
    })
  } else {
    data.pid = parent.id
    nodes.push(data)

    parseFlowData(data.childenDiagramNodes, nodes)
    parseFlowData(data.parentsDiagramNodes, nodes)
  }

  return nodes
}
