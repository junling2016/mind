const flowMock_field = {
  childenDiagramNodes: [
    {
      ename: 'SODA_PUSH_M_CHEAT_ORDER_PUNISH_1.0.2',
      id: '5b3de88e16b3969409a22fac',
      name: '作弊消息推送M端1.0.2版',
      nodeType: 'ACTION'
    }
  ],
  dataType: 'Long',
  ename: 'uid4long',
  fromService: 'transferFromStringType',
  group: '订单类',
  id: '5adef79e410ea4875234709d',
  name: 'long型uid',
  nodeType: 'FIELD',
  parentsDiagramNodes: [
    {
      dataType: 'String',
      ename: 'u_id',
      fromService: 'SODA_ORDER_QUERY_SERVICE',
      group: '订单类',
      id: '5adedfd916b39693f159464f',
      name: '用户id',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'o_id',
          group: '图片信息',
          id: '5adedf2616b39693f1594646',
          name: '订单id',
          nodeType: 'FIELD',
          type: '解析'
        }
      ],
      type: '补全'
    }
  ],
  type: '补全'
}
const flowMock_strategy = {
  childenDiagramNodes: [
    {
      ename: 'SODA_PUSH_M_CHEAT_ORDER_PUNISH_1.0.2',
      id: '5b3de88e16b3969409a22fac',
      name: '作弊消息推送M端1.0.2版',
      nodeType: 'ACTION'
    }
  ],
  ename: '触发推送MQ策略',
  name: '触发推送MQ策略',
  nodeType: 'STRATEGY',
  parentsDiagramNodes: [
    {
      dataType: 'String',
      ename: 'o_id',
      group: '图片信息',
      id: '5adedf2616b39693f1594646',
      name: '订单id',
      nodeType: 'FIELD',
      type: '解析'
    }
  ],
  strategyId: 1330
}
const flowMock_action = {
  childenDiagramNodes: [
    {
      ename: '触发推送MQ策略',
      id: '5adee1c1410ea48752347081',
      nodeType: 'STRATEGY',
      strategyId: 1330
    },
    {
      ename: '触发推送MQ策略',
      id: '5adee1c1410ea48752347081',
      nodeType: 'STRATEGY',
      strategyId: 1330
    }
  ],
  ename: 'SODA_PUSH_M_CHEAT_ORDER_PUNISH_1.0.2',
  id: '5b3de88e16b3969409a22fac',
  name: '作弊消息推送M端1.0.2版',
  nodeType: 'ACTION',
  parentsDiagramNodes: [
    {
      dataType: 'Long',
      ename: 'order_id4long',
      fromService: 'transferFromStringType',
      group: '订单类',
      id: '5adef74016b39693f15946f4',
      name: 'long型订单id',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'o_id',
          group: '图片信息',
          id: '5adedf2616b39693f1594646',
          name: '订单id',
          nodeType: 'FIELD',
          type: '解析'
        }
      ],
      type: '补全'
    },
    {
      dataType: 'Long',
      ename: 'order_create_time',
      fromService: 'SODA_ORDER_QUERY_SERVICE',
      group: '订单类',
      id: '5adedfd916b39693f1594652',
      name: '订单创建时间',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'o_id',
          group: '图片信息',
          id: '5adedf2616b39693f1594646',
          name: '订单id',
          nodeType: 'FIELD',
          type: '解析'
        },
        {
          dataType: 'String',
          ename: 'o_id',
          group: '图片信息',
          id: '5adedf2616b39693f1594646',
          name: '订单id',
          nodeType: 'FIELD',
          type: '解析'
        }
      ],
      type: '补全'
    },
    {
      dataType: 'String',
      ename: 'cheaters',
      group: '图片信息',
      id: '5adedf2616b39693f1594647',
      name: '作弊方',
      nodeType: 'FIELD',
      type: '解析'
    },
    {
      dataType: 'Long',
      ename: 'uid4long',
      fromService: 'transferFromStringType',
      group: '订单类',
      id: '5adef79e410ea4875234709d',
      name: 'long型uid',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'u_id',
          fromService: 'SODA_ORDER_QUERY_SERVICE',
          group: '订单类',
          id: '5adedfd916b39693f159464f',
          name: 'isForbidStolenCreditCardVersion',
          nodeType: 'FIELD',
          parentsDiagramNodes: [
            {
              dataType: 'String',
              ename: 'o_id',
              group: '图片信息',
              id: '5adedf2616b39693f1594646',
              name: '订单id',
              nodeType: 'FIELD',
              type: '解析'
            }
          ],
          type: '补全'
        }
      ],
      type: '补全'
    },
    {
      dataType: 'Long',
      ename: 'shop_id4long',
      fromService: 'transferFromStringType',
      group: '订单类',
      id: '5adef7f616b39693f15946f7',
      name: 'long型shop_id',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'shop_id',
          fromService: 'SODA_ORDER_QUERY_SERVICE',
          group: '订单类',
          id: '5adedfd916b39693f1594650',
          name: '店铺id',
          nodeType: 'FIELD',
          parentsDiagramNodes: [
            {
              dataType: 'String',
              ename: 'o_id',
              group: '图片信息',
              id: '5adedf2616b39693f1594646',
              name: '订单id',
              nodeType: 'FIELD',
              type: '解析'
            }
          ],
          type: '补全'
        }
      ],
      type: '补全'
    },
    {
      dataType: 'Long',
      ename: 'd_id4long',
      fromService: 'transferFromStringType',
      group: '订单类',
      id: '5adef836410ea487523470a0',
      name: 'long型d_id',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'd_id',
          fromService: 'SODA_ORDER_QUERY_SERVICE',
          group: '订单类',
          id: '5adedfd916b39693f1594651',
          name: '骑士id',
          nodeType: 'FIELD',
          parentsDiagramNodes: [
            {
              dataType: 'String',
              ename: 'o_id',
              group: '图片信息',
              id: '5adedf2616b39693f1594646',
              name: '订单id',
              nodeType: 'FIELD',
              type: '解析'
            }
          ],
          type: '补全'
        }
      ],
      type: '补全'
    },
    {
      dataType: 'String',
      ename: 'reason',
      group: '图片信息',
      id: '5adedf2616b39693f1594648',
      name: '原因',
      nodeType: 'FIELD',
      type: '解析'
    },
    {
      dataType: 'Long',
      ename: 'type',
      group: '图片信息',
      id: '5adedf2616b39693f1594649',
      name: '类型',
      nodeType: 'FIELD',
      type: '解析'
    },
    {
      dataType: 'Long',
      ename: 'delivery_id',
      group: '图片信息',
      id: '5b0baab3410ea4174f6743b8',
      name: '物流id',
      nodeType: 'FIELD',
      type: '解析'
    },
    {
      dataType: 'Long',
      ename: 'trip_id',
      group: '图片信息',
      id: '5b0baab3410ea4174f6743b9',
      name: '行程id',
      nodeType: 'FIELD',
      type: '解析'
    },
    {
      dataType: 'Long',
      ename: 'city_id',
      group: '图片信息',
      id: '5b3dec45410ea49094e04b07',
      name: '城市id',
      nodeType: 'FIELD',
      type: '解析'
    }
  ]
}
