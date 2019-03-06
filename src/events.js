// 获取对象的所有事件记录表
export function getListenerMap(target, create) {
  let listenerMap = target.listenerMap
  if (!listenerMap && create) {
    listenerMap = target.listenerMap = {}
  }

  return listenerMap
}

// 获取对象单一事件类型的记录
export function getListeners(target, type) {
  const listenerMap = getListenerMap(target)
  return listenerMap && listenerMap[type]
}

// 清空对象的所有事件记录
export function cleanListenerMap(target) {
  delete target.listenerMap
}

// 清空对象的单一事件类型的所有记录
export function cleanListeners(target, type) {
  const listenerMap = getListenerMap(target)
  listenerMap && delete listenerMap[type]
}

// 获取事件类型
export function getEventName(type) {
  return type.split('.')[0]
}

// 移除单一事件绑定
export function removeListener(target, type, callback) {
  const eventName = getEventName(type)
  target.removeEventListener(eventName, callback)

  const listeners = getListeners(target, type)

  if (listeners) {
    const index = listeners.findIndex(listener => listener === callback)

    if (index !== -1) {
      listeners.splice(index, 1)
    }

    if (!listeners.length) {
      cleanListeners(target, type)
    }
  }
}

// 移除对象单一事件类型的所有事件绑定
export function removeListeners(target, type) {
  const listeners = getListeners(target, type)
  const eventName = getEventName(type)

  if (listeners) {
    listeners.forEach(listener => {
      target.removeEventListener(eventName, listener)
    })

    cleanListeners(target, type)

    const listenerMap = getListenerMap(target)

    if (!Object.keys(listenerMap).length) {
      cleanListenerMap(target)
    }
  }
}

// 移除对象所有的事件绑定
export function removeAllListeners(target) {
  const listenerMap = getListenerMap(target)

  if (listenerMap) {
    for (const type in listenerMap) {
      removeListeners(target, type)
    }
  }
}

// 事件绑定
export function on(target, type, callback) {
  const eventName = getEventName(type)

  target.addEventListener(eventName, callback)

  const listenerMap = getListenerMap(target, true)
  let listeners = listenerMap[type]

  if (!listeners) {
    listeners = listenerMap[type] = []
  }

  listeners.push(callback)
}

// 事件解绑
export function off(target, type, callback) {
  const listenerMap = getListenerMap(target)

  if (!listenerMap) return

  if (callback) {
    removeListener(target, type, callback)
  } else if (type) {
    removeListeners(target, type)
  } else {
    removeAllListeners(target)
  }
}
