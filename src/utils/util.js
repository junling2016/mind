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

/**
 * 判读两个矩形是否相交
 * @param {Object} rect1
 * @param {Object} rect2
 */
export const isRectOverlap = (rect1, rect2) => {
  return !(
    rect1.left > rect2.right ||
    rect1.top > rect2.bottom ||
    rect2.left > rect1.right ||
    rect2.top > rect1.bottom
  )
}

/**
 * 判断两个矩形垂直方向是否存在相交可能
 * @param {Object} rect1
 * @param {Object} rect2
 */
export const isRectVertOverlap = (rect1, rect2) => {
  return (
    Math.max(
      Math.abs(rect1.top - rect2.bottom),
      Math.abs(rect2.top - rect1.bottom)
    ) <
    rect1.height + rect2.height
  )
}

/**
 * 判断两个矩形水平方向是否存在相交可能
 * @param {Object} rect1
 * @param {Object} rect2
 */
export const isRectHoriOverlap = (rect1, rect2) => {
  return (
    Math.max(
      Math.abs(rect1.left - rect2.right),
      Math.abs(rect2.left - rect1.right)
    ) <
    rect1.width + rect2.width
  )
}
