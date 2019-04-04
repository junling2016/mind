import {
  createElement,
  setElementStyle,
  addClass,
  removeClass
} from './utils/dom'

const body = document.body
let positionX = 0
let positionY = 0
let delayTimeout

const tooltip = {
  $el: null,

  init() {
    if (tooltip.$el) return

    tooltip.$el = createElement('div', {
      class: 'mind-tooltip'
    })

    body.appendChild(tooltip.$el)
  },

  resetPosition() {
    if (!tooltip.$el) return

    const { width, height } = tooltip.$el.getBoundingClientRect()
    const arrowHeight = 4
    setElementStyle(tooltip.$el, {
      left: positionX - width / 2,
      top: positionY - height - arrowHeight
    })
  },

  show(delay) {
    if (!tooltip.$el) {
      tooltip.init()
    }

    if (delay) {
      delayTimeout = setTimeout(() => {
        addClass(tooltip.$el, 'show')
        tooltip.resetPosition()
      }, delay)
    } else {
      addClass(tooltip.$el, 'show')
      tooltip.resetPosition()
    }
  },

  hide() {
    if (!tooltip.$el) return

    if (delayTimeout) {
      clearTimeout(delayTimeout)
      delayTimeout = null
    }

    removeClass(tooltip.$el, 'show')
    tooltip.$el.style.left = ''
    tooltip.$el.style.top = ''
  },

  setContent(content) {
    if (!tooltip.$el) {
      tooltip.init()
    }

    tooltip.$el.innerHTML = content
  },

  setPosition(left, top) {
    positionX = left
    positionY = top
  },

  destroy() {
    tooltip.$el = null

    const $tooltip = document.body.querySelector('.mind-tooltip')
    if (!$tooltip) return
    const parentNode = $tooltip.parentNode
    parentNode.removeChild($tooltip)
  }
}

export default tooltip
