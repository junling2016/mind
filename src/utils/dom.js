const doc = document

export const isDOM =
  typeof HTMLElement === 'object'
    ? obj => obj instanceof HTMLElement
    : obj =>
        obj &&
        typeof obj === 'object' &&
        obj.nodeType === 1 &&
        typeof obj.nodeName === 'string'

const attrsWithPixel = [
  'width',
  'height',
  'fontSize',
  'borderRadius',
  'padding',
  'left',
  'right',
  'top',
  'bottom',
  'borderWidth',
  'maxWidth'
]

export const setElementStyle = (el, style) => {
  for (const attr in style) {
    if (attr === 'padding') {
      el.style.padding = `${style.padding[0]}px ${style.padding[1]}px`
    } else {
      el.style[attr] = attrsWithPixel.includes(attr)
        ? `${style[attr]}px`
        : style[attr]
    }
  }
}

const svgTags = ['svg', 'g', 'path']

export const createElement = (tag, attrs, parent) => {
  let el

  if (svgTags.includes(tag)) {
    el = doc.createElementNS('http://www.w3.org/2000/svg', tag)
  } else {
    el = doc.createElement(tag)
  }

  for (const attr in attrs) {
    el.setAttribute(attr, attrs[attr])
  }

  if (parent) {
    parent.appendChild(el)
  }

  return el
}

export const hasClass = (el, clsName) => {
  const classes = el.className.split(' ')
  return classes.includes(clsName)
}

// 为dom添加class类名
export const addClass = (el, cls) => {
  if (!el || !cls) return

  let curClass = el.className
  const classes = cls.split(' ')

  classes.forEach(clsName => {
    if (!clsName) return

    if (el.classList) {
      el.classList.add(clsName)
    } else if (!hasClass(el, clsName)) {
      curClass += ' ' + clsName
    }
  })

  if (!el.classList) {
    el.className = curClass
  }
}

// 移除dom的class类名
export const removeClass = (el, cls) => {
  if (!el || !cls) return
  var classes = cls.split(' ')
  var curClass = ' ' + el.className + ' '

  for (var i = 0, j = classes.length; i < j; i++) {
    var clsName = classes[i]
    if (!clsName) continue

    if (el.classList) {
      el.classList.remove(clsName)
    } else if (hasClass(el, clsName)) {
      curClass = curClass.replace(' ' + clsName + ' ', ' ')
    }
  }
  if (!el.classList) {
    el.className = trim(curClass)
  }
}
