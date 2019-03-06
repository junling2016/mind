import deepmerge from 'deepmerge'

export const deepMerge = (...source) => {
  source = source.filter(item => !!item)
  return deepmerge.all(source, {
    arrayMerge: (destinationArray, sourceArray) => sourceArray
  })
}

export const isDOM =
  typeof HTMLElement === 'object'
    ? obj => obj instanceof HTMLElement
    : obj =>
        obj &&
        typeof obj === 'object' &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === 'string'

export const treeToArray = (nodes, childKey = 'children') => {
  let list = []

  if (nodes instanceof Array) {
    nodes.forEach(node => {
      list.push(node)
      list = list.concat(treeToArray(node[childKey]))
    })
  } else {
    list.push(nodes)
    list = list.concat(treeToArray(nodes[childKey]))
  }

  return list
}
