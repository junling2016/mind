import Connection from './connection'

class Line extends Connection {
  constructor(from, to, options) {
    super(from, to, options)
  }

  getPath() {
    const { from, to } = this
    return ['M', from[0], from[1], 'L', to[0], to[1]].join(' ')
  }
}

export default Line
