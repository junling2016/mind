const flowMock_field = {
  childenDiagramNodes: [
    {
      childenDiagramNodes: [
        {
          dataType: 'Decimal',
          ename: 'ratio_0m',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bbbe9c3410ea473c0104e39',
          name: 'ratio_0m',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'cancelStatusNum',
          fromService: 'computeDivision',
          group: '乘客信息',
          id: '5a09968f410ea4396dee5619',
          name: '取消状态订单数',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        }
      ],
      dataType: 'Long',
      ename: 'lower0m',
      fromService: 'getValByStrCodeFromJson',
      group: '司机信息',
      id: '5bbbe961410ea473c0104e35',
      name: 'lower0m',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'MERGE'
    },
    {
      dataType: 'Decimal',
      ename: 'offline_pay_rate',
      fromService: 'getValByStrCodeFromJson',
      group: '乘客信息',
      id: '59f96f93410ea436593742c7',
      name: '线下支付占比',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'COMPUTE'
    },
    {
      dataType: 'String',
      ename: 'orderStatusMapParsedInfo',
      fromService: 'getValByStrCodeFromJson',
      group: '订单信息',
      id: '5a0992d5410ea4396dee5613',
      name: '订单状态解析结果',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'COMPUTE'
    },
    {
      childenDiagramNodes: [
        {
          dataType: 'Decimal',
          ename: 'ratio_0m',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bbbe9c3410ea473c0104e39',
          name: 'ratio_0m',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Decimal',
          ename: 'pas_is_driver_ratio',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bcbc76e16b3967aaf47d540',
          name: 'pas_is_driver_ratio',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Decimal',
          ename: 'ratio_1km',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bac1702410ea473c0104c62',
          name: 'ratio_1km',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'cancelStatusNum',
          fromService: 'computeDivision',
          group: '乘客信息',
          id: '5a09968f410ea4396dee5619',
          name: '取消状态订单数',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        },
        {
          dataType: 'Decimal',
          ename: 'ratio_500m',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bbbe99d16b39654b6ac0796',
          name: 'ratio_500m',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'checkingStatusNum',
          fromService: 'computeDivision',
          group: '订单信息',
          id: '5a099319410ea4396dee5616',
          name: '审核状态订单数',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        },
        {
          dataType: 'Decimal',
          ename: 'uniqueUserRate',
          fromService: 'computeDivision',
          group: '乘客信息',
          id: '59f96d1816b396308cd965d0',
          name: '独立用户占比',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        },
        {
          dataType: 'Long',
          ename: 'paxCancelOrderNum',
          fromService: 'computeDivision',
          group: '订单信息',
          id: '59f96ca916b396308cd965cc',
          name: '乘客30分钟取消3次订单数量',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        },
        {
          dataType: 'Long',
          ename: 'd_order_count_24h',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5aa158b116b39653716c40b8',
          name: 'd_order_count_24h',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        },
        {
          dataType: 'Decimal',
          ename: 'RatioResultLen',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bb6df9916b39654b6ac06e7',
          name: 'RatioResultLen',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        }
      ],
      dataType: 'Long',
      ename: 'order_Num',
      fromService: 'getValByStrCodeFromJson',
      group: '司机信息',
      id: '5bac168c16b39654b6ac0553',
      name: 'order_Num',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'MERGE'
    },
    {
      childenDiagramNodes: [
        {
          dataType: 'Decimal',
          ename: 'ratio_500m',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bbbe99d16b39654b6ac0796',
          name: 'ratio_500m',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'checkingStatusNum',
          fromService: 'computeDivision',
          group: '订单信息',
          id: '5a099319410ea4396dee5616',
          name: '审核状态订单数',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        }
      ],
      dataType: 'Long',
      ename: 'lower500m',
      fromService: 'getValByStrCodeFromJson',
      group: '司机信息',
      id: '5bbbe93216b39654b6ac0792',
      name: 'lower500m',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'MERGE'
    },
    {
      dataType: 'Long',
      ename: 'lower0mNum',
      fromService: 'getValByStrCodeFromJson',
      group: '乘客信息',
      id: '59f96be216b396308cd965c5',
      name: '里程小于0订单数',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'COMPUTE'
    },
    {
      dataType: 'Long',
      ename: 'offlinePayNum',
      fromService: 'getValByStrCodeFromJson',
      group: '订单信息',
      id: '59f96c5516b396308cd965c8',
      name: '线下支付订单数量',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'COMPUTE'
    },
    {
      childenDiagramNodes: [
        {
          dataType: 'Decimal',
          ename: 'ratio_1km',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bac1702410ea473c0104c62',
          name: 'ratio_1km',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'paxCancelOrderNum',
          fromService: 'computeDivision',
          group: '订单信息',
          id: '59f96ca916b396308cd965cc',
          name: '乘客30分钟取消3次订单数量',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        }
      ],
      dataType: 'Long',
      ename: 'lower1km',
      fromService: 'getValByStrCodeFromJson',
      group: '司机信息',
      id: '5bac160316b39654b6ac0551',
      name: 'lower1km',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'MERGE'
    },
    {
      dataType: 'String',
      ename: 'failStatusNum',
      fromService: 'getValByStrCodeFromJson',
      group: '乘客信息',
      id: '5a155062410ea44f320009bf',
      name: '审核不通过状态订单数',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'COMPUTE'
    },
    {
      childenDiagramNodes: [
        {
          dataType: 'Decimal',
          ename: 'pas_is_driver_ratio',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5bcbc76e16b3967aaf47d540',
          name: 'pas_is_driver_ratio',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'MERGE'
        },
        {
          dataType: 'Long',
          ename: 'd_order_count_24h',
          fromService: 'computeDivision',
          group: '司机信息',
          id: '5aa158b116b39653716c40b8',
          name: 'd_order_count_24h',
          nodeType: 'FIELD',
          serviceType: 'computeFunction',
          type: 'COMPUTE'
        }
      ],
      dataType: 'Long',
      ename: 'pasisdriver_num',
      fromService: 'getValByStrCodeFromJson',
      group: '司机信息',
      id: '5bcbc739410ea4232c25790d',
      name: 'pasisdriver_num',
      nodeType: 'FIELD',
      serviceType: 'computeFunction',
      type: 'MERGE'
    }
  ],
  dataType: 'String',
  ename: 'order_json_v2',
  fromService: 'orderListParseScript',
  group: '订单信息',
  id: '5bac14ba410ea473c0104c5d',
  name: '订单jsonV2',
  nodeType: 'FIELD',
  parentsDiagramNodes: [
    {
      dataType: 'String',
      ename: 'order_info_json',
      fromService: 'BRAZIL_ORDER_INFO_BATCH_GET',
      group: '订单信息',
      id: '59dee298410ea40326dd26a1',
      name: 'order info result json',
      nodeType: 'FIELD',
      parentsDiagramNodes: [
        {
          dataType: 'String',
          ename: 'orderid_list',
          group: '订单信息',
          id: '59520f4516b39636d5e2f88b',
          name: 'involved order id list',
          nodeType: 'FIELD',
          type: 'PARSE'
        }
      ],
      serviceType: 'dataService',
      type: 'MERGE'
    }
  ],
  serviceType: 'computeFunction',
  type: 'MERGE'
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
