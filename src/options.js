export default {
  lineColor: ['#FDB813', '#80BC42', '#e85d4e', '#127c97', '#ffcccc', '#67ccff'],
  type: 'org', // org | diagram
  width: 20000,
  height: 20000,
  nodeDragEnable: false,
  showConnectionLabel: true,
  showTooltip: true,
  tooltipDelay: 500,
  formatTooltip: null,
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
  // rootNodeStyle: {
  //   borderRadius: 5,
  //   fontSize: 20,
  //   fontWeight: 'normal',
  //   color: '#fff',
  //   backgroundColor: '#50c28b',
  //   padding: [10, 12],
  //   borderColor: '#50c28b',
  //   borderWidth: 0,
  //   borderStyle: 'solid'
  // },
  // branchNodeStyle: {
  //   borderRadius: 4,
  //   fontSize: 14,
  //   fontWeight: 'normal',
  //   color: '#333',
  //   backgroundColor: '#fff',
  //   borderColor: '#FDB813',
  //   borderWidth: 2,
  //   borderStyle: 'solid',
  //   padding: [6, 8]
  // },
  // normalNodeStyle: {
  //   borderRadius: 3,
  //   fontSize: 12,
  //   fontWeight: 'normal',
  //   color: '#666',
  //   backgroundColor: 'rgb(254, 240, 201)',
  //   borderColor: 'rgb(254, 240, 201)',
  //   borderStyle: 'solid',
  //   borderWidth: 0,
  //   padding: [4, 10],
  //   boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
  // },

  // flowNodeStyle: {
  //   borderRadius: 4,
  //   fontSize: 14,
  //   fontWeight: 'normal',
  //   color: '#333',
  //   backgroundColor: 'rgb(254, 240, 201)',
  //   borderColor: '#FDB813',
  //   borderWidth: 0,
  //   borderStyle: 'solid',
  //   padding: [6, 8]
  // },

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
    fill: 'none'
  },

  onNodeClick: null
}
