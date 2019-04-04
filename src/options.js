export default {
  lineColor: ['#FDB813', '#80BC42', '#e85d4e', '#127c97', '#ffcccc', '#67ccff'],
  type: 'org', // org | diagram
  width: 20000,
  height: 20000,
  draggable: false,
  showConnectionLabel: true,
  showTooltip: true,
  tooltipDelay: 500,
  tooltipFormat: null,
  backgroundColor: '#fff',
  zoomMax: 2,
  zoomMin: 0.4,
  zoomStep: 0.15,
  rootMargin: 80,
  branchMargin: 20,
  branchShowIndex: false,

  flowNodeMarginW: 200,
  flowNodeMarginH: 60,
  flowRootMargin: 200,

  normalLineStyle: {
    stroke: 'rgb(58, 169, 206)',
    strokeWidth: 1,
    strokeLinecap: 'square',
    fill: 'none'
  },

  linkLineStyle: {
    stroke: 'rgb(113, 203, 45)',
    strokeWidth: 2,
    strokeLinecap: 'square',
    strokeLinejoin: 'round',
    fill: 'none',
    type: 'curve',
    direction: 'horizontal'
  },

  onNodeClick: null
}
