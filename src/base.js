class Base {
  $el = null

  constructor() {}

  getSize() {
    return this.$el && this.$el.getBoundingClientRect()
  }
}
