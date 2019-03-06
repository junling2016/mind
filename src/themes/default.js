export default {
  colors: ['#FDB813', '#80BC42', '#e85d4e', '#127c97', '#ffcccc', '#67ccff'],
  backgroundColor: '#fff',
  marginW: 90,
  marginH: 30,
  rootTopic: {
    fontSize: 30,
    fontWeight: 'normal',
    color: '#fff',
    backgroundColor: '#50c28b',
    padding: [12, 15],
    border: 0,
    borderRadius: 5,
    boxShadow: 'none'
  },
  secTopic: {
    fontSize: 14,
    fontWeight: 'normal',
    color: '#333',
    backgroundColor: '#fff',
    padding: [6, 8],
    border: '2px solid #FDB813',
    borderRadius: 4,
    boxShadow: 'none'
  },
  childTopic: {
    fontSize: 12,
    fontWeight: 'normal',
    color: '#666',
    backgroundColor: 'rgb(254, 240, 201)',
    padding: [4, 10],
    border: 0,
    borderRadius: 3,
    boxShadow: '1px 1px 1px rgba(0, 0, 0, 0.1)'
  },
  trunkConnection: {
    type: 'taperedCurve',
    stroke: 'rgb(58, 169, 206)',
    strokeWidth: 1,
    strokeLinecap: 'square',
    fill: 'none'
  },
  subConnection: {}
}
