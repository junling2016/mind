import Mind from './Mind'
import OrgMind from './OrgMind'
import FlowMind from './FlowMind'
import options from './options'
import Node from './Node'

Mind.Org = OrgMind
Mind.Flow = FlowMind
Mind.defaults = options
Mind.Node = Node

export default Mind
