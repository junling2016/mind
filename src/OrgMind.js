import Mind from './Mind'
import RootTopic from './RootTopic'
import Gator from './EventDeletage'
import * as Tooltip from './Tooltip'
import { hasClass } from './utils/dom'
import { treeToArray } from './utils/util'

const doc = document

class OrgMind extends Mind {
  // 根节点
  rootTopic = null

  // 所有节点列表
  topics = []

  constructor(el, options) {
    super(el, options)

    this.initEvents()
    this.render()
  }

  // 开始渲染图形
  render() {
    this.rootTopic = new RootTopic({
      mind: this,
      structure: 'root',
      data: this.options.data
    })

    this.rootTopic.render()
    this.topics = treeToArray(this.rootTopic)
  }

  // 初始化事件
  initEvents() {
    Gator(doc).on(
      'click.expand',
      '.mind-expand-box',
      this.triggerTopicExpand.bind(this)
    )

    Gator(doc).on('click.node', '.mind-node', this.onNodeClick.bind(this))
  }

  // 节点伸缩切换
  triggerTopicExpand(e) {
    const $topic = e.target.parentNode.parentNode
    const topic = this.getTopicByElement($topic)
    topic && topic.triggerExpand()
  }

  // 节点点击
  onNodeClick(e) {
    let $topic = e.target

    while (!hasClass($topic, 'mind-topic-container')) {
      $topic = $topic.parentNode
    }

    const topic = this.getTopicByElement($topic)

    if (topic && this.options.onNodeClick) {
      this.options.onNodeClick(topic.options.data, topic.node)
    }
  }

  // 通过dom获取主题实例
  getTopicByElement(el) {
    return this.topics.find(topic => topic.$el === el)
  }

  // 移除dom并注销事件
  destroy() {
    this.$container.removeChild(this.$el)
    Gator(doc).off('click.expand')
    Gator(doc).off('click.node')
    Tooltip.destroy()
  }
}

export default OrgMind
