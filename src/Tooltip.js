import {
  createElement,
  setElementStyle,
  addClass,
  removeClass
} from './utils/dom'

const body = document.body
let $tooltip
let positionX = 0
let positionY = 0
let delayTimeout

const init = () => {
  if ($tooltip) return

  $tooltip = createElement('div', {
    class: 'mind-tooltip'
  })

  body.appendChild($tooltip)
}

const resetPosition = () => {
  if (!$tooltip) return

  const { width, height } = $tooltip.getBoundingClientRect()
  const arrowHeight = 4
  setElementStyle($tooltip, {
    left: positionX - width / 2,
    top: positionY - height - arrowHeight
  })
}

export const show = delay => {
  if (!$tooltip) {
    init()
  }

  if (delay) {
    delayTimeout = setTimeout(() => {
      addClass($tooltip, 'show')
      resetPosition()
    }, delay)
  } else {
    addClass($tooltip, 'show')
    resetPosition()
  }
}

export const hide = () => {
  if (!$tooltip) return

  if (delayTimeout) {
    clearTimeout(delayTimeout)
    delayTimeout = null
  }

  removeClass($tooltip, 'show')
  $tooltip.style.left = ''
  $tooltip.style.top = ''
}

export const setContent = content => {
  if (!$tooltip) {
    init()
  }

  $tooltip.innerHTML = content
}

export const setPosition = (left, top) => {
  positionX = left
  positionY = top
}

export const destroy = () => {
  if (!$tooltip) return
  body.removeChild($tooltip)
  $tooltip = null
}
