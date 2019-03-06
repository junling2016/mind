(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.Mind = factory());
}(this, function () { 'use strict';

  function _typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

  function _defineProperties(target, props) {
    for (var i = 0; i < props.length; i++) {
      var descriptor = props[i];
      descriptor.enumerable = descriptor.enumerable || false;
      descriptor.configurable = true;
      if ("value" in descriptor) descriptor.writable = true;
      Object.defineProperty(target, descriptor.key, descriptor);
    }
  }

  function _createClass(Constructor, protoProps, staticProps) {
    if (protoProps) _defineProperties(Constructor.prototype, protoProps);
    if (staticProps) _defineProperties(Constructor, staticProps);
    return Constructor;
  }

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function _inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) {
      throw new TypeError("Super expression must either be null or a function");
    }

    subClass.prototype = Object.create(superClass && superClass.prototype, {
      constructor: {
        value: subClass,
        writable: true,
        configurable: true
      }
    });
    if (superClass) _setPrototypeOf(subClass, superClass);
  }

  function _getPrototypeOf(o) {
    _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
      return o.__proto__ || Object.getPrototypeOf(o);
    };
    return _getPrototypeOf(o);
  }

  function _setPrototypeOf(o, p) {
    _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
      o.__proto__ = p;
      return o;
    };

    return _setPrototypeOf(o, p);
  }

  function _assertThisInitialized(self) {
    if (self === void 0) {
      throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    }

    return self;
  }

  function _possibleConstructorReturn(self, call) {
    if (call && (typeof call === "object" || typeof call === "function")) {
      return call;
    }

    return _assertThisInitialized(self);
  }

  // 获取对象的所有事件记录表
  function getListenerMap(target, create) {
    var listenerMap = target.listenerMap;

    if (!listenerMap && create) {
      listenerMap = target.listenerMap = {};
    }

    return listenerMap;
  } // 获取对象单一事件类型的记录

  function getListeners(target, type) {
    var listenerMap = getListenerMap(target);
    return listenerMap && listenerMap[type];
  } // 清空对象的所有事件记录

  function cleanListenerMap(target) {
    delete target.listenerMap;
  } // 清空对象的单一事件类型的所有记录

  function cleanListeners(target, type) {
    var listenerMap = getListenerMap(target);
    listenerMap && delete listenerMap[type];
  } // 获取事件类型

  function getEventName(type) {
    return type.split('.')[0];
  } // 移除单一事件绑定

  function removeListener(target, type, callback) {
    var eventName = getEventName(type);
    target.removeEventListener(eventName, callback);
    var listeners = getListeners(target, type);

    if (listeners) {
      var index = listeners.findIndex(function (listener) {
        return listener === callback;
      });

      if (index !== -1) {
        listeners.splice(index, 1);
      }

      if (!listeners.length) {
        cleanListeners(target, type);
      }
    }
  } // 移除对象单一事件类型的所有事件绑定

  function removeListeners(target, type) {
    var listeners = getListeners(target, type);
    var eventName = getEventName(type);

    if (listeners) {
      listeners.forEach(function (listener) {
        target.removeEventListener(eventName, listener);
      });
      cleanListeners(target, type);
      var listenerMap = getListenerMap(target);

      if (!Object.keys(listenerMap).length) {
        cleanListenerMap(target);
      }
    }
  } // 移除对象所有的事件绑定

  function removeAllListeners(target) {
    var listenerMap = getListenerMap(target);

    if (listenerMap) {
      for (var type in listenerMap) {
        removeListeners(target, type);
      }
    }
  } // 事件绑定

  function on(target, type, callback) {
    var eventName = getEventName(type);
    target.addEventListener(eventName, callback);
    var listenerMap = getListenerMap(target, true);
    var listeners = listenerMap[type];

    if (!listeners) {
      listeners = listenerMap[type] = [];
    }

    listeners.push(callback);
  } // 事件解绑

  function off(target, type, callback) {
    var listenerMap = getListenerMap(target);
    if (!listenerMap) return;

    if (callback) {
      removeListener(target, type, callback);
    } else if (type) {
      removeListeners(target, type);
    } else {
      removeAllListeners(target);
    }
  }

  var doc = document;
  var isDOM = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? function (obj) {
    return obj instanceof HTMLElement;
  } : function (obj) {
    return obj && _typeof(obj) === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };
  var attrsWithPixel = ['width', 'height', 'fontSize', 'borderRadius', 'padding', 'left', 'right', 'top', 'bottom', 'borderWidth', 'maxWidth'];
  var setElementStyle = function setElementStyle(el, style) {
    for (var attr in style) {
      if (attr === 'padding') {
        el.style.padding = "".concat(style.padding[0], "px ").concat(style.padding[1], "px");
      } else {
        el.style[attr] = attrsWithPixel.includes(attr) ? "".concat(style[attr], "px") : style[attr];
      }
    }
  };
  var svgTags = ['svg', 'g', 'path'];
  var createElement = function createElement(tag, attrs, parent) {
    var el;

    if (svgTags.includes(tag)) {
      el = doc.createElementNS('http://www.w3.org/2000/svg', tag);
    } else {
      el = doc.createElement(tag);
    }

    for (var attr in attrs) {
      el.setAttribute(attr, attrs[attr]);
    }

    if (parent) {
      parent.appendChild(el);
    }

    return el;
  };
  var hasClass = function hasClass(el, clsName) {
    var classes = el.className.split(' ');
    return classes.includes(clsName);
  }; // 为dom添加class类名

  var addClass = function addClass(el) {
    var cls = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
    if (!el) return;
    var curClass = el.className;
    var classes = cls.split(' ');
    classes.forEach(function (clsName) {
      if (!clsName) return;

      if (el.classList) {
        el.classList.add(clsName);
      } else if (!hasClass(el, clsName)) {
        curClass += ' ' + clsName;
      }
    });

    if (!el.classList) {
      el.className = curClass;
    }
  }; // 移除dom的class类名

  var removeClass = function removeClass(el, cls) {
    if (!el || !cls) return;
    var classes = cls.split(' ');
    var curClass = ' ' + el.className + ' ';

    for (var i = 0, j = classes.length; i < j; i++) {
      var clsName = classes[i];
      if (!clsName) continue;

      if (el.classList) {
        el.classList.remove(clsName);
      } else if (hasClass(el, clsName)) {
        curClass = curClass.replace(' ' + clsName + ' ', ' ');
      }
    }

    if (!el.classList) {
      el.className = trim(curClass);
    }
  };

  var doc$1 = document;

  var Viewport =
  /*#__PURE__*/
  function () {
    // 顶层实例
    // 上层容器
    // 视图dom节点
    // 配置项
    // 当前视图缩放比例
    function Viewport(root) {
      _classCallCheck(this, Viewport);

      _defineProperty(this, "root", null);

      _defineProperty(this, "$container", null);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "options", null);

      _defineProperty(this, "scale", 1);

      _defineProperty(this, "dragingFlag", false);

      this.root = root;
      this.$container = root.$el;
      this.options = root.options;
      this.create();
      this.setStyle();
      this.moveToCenter();
      this.initEvents();
    } // 创建画布


    _createClass(Viewport, [{
      key: "create",
      value: function create() {
        this.$el = createElement('div', {
          class: 'mind-designer'
        }, this.$container);
      } // 设置视图样式

    }, {
      key: "setStyle",
      value: function setStyle() {
        var _this$options = this.options,
            width = _this$options.width,
            height = _this$options.height,
            backgroundColor = _this$options.backgroundColor;
        setElementStyle(this.$el, {
          width: width,
          height: height,
          backgroundColor: backgroundColor
        });
      } // 移动到指定位置

    }, {
      key: "moveTo",
      value: function moveTo(left, top) {
        this.$container.scrollLeft = left;
        this.$container.scrollTop = top;
      } // 将画布移动至中心位置

    }, {
      key: "moveToCenter",
      value: function moveToCenter() {
        var _this$$container$getB = this.$container.getBoundingClientRect(),
            wrapW = _this$$container$getB.width,
            wrapH = _this$$container$getB.height;

        var _this$options2 = this.options,
            width = _this$options2.width,
            height = _this$options2.height;
        this.moveTo((width - wrapW) / 2, (height - wrapH) / 2);
      } // 注册事件

    }, {
      key: "initEvents",
      value: function initEvents() {
        on(this.$el, 'mousedown.dragmove', this.onDragStart.bind(this));
      } // 拖动开始

    }, {
      key: "onDragStart",
      value: function onDragStart(_ref) {
        var pageX = _ref.pageX,
            pageY = _ref.pageY;
        var _this$$container = this.$container,
            scrollLeft = _this$$container.scrollLeft,
            scrollTop = _this$$container.scrollTop;
        this.dragStartMousePosition = {
          pageX: pageX,
          pageY: pageY
        };
        this.dragStartScroll = {
          scrollLeft: scrollLeft,
          scrollTop: scrollTop
        };
        on(doc$1, 'mousemove.dragmove', this.onDraging.bind(this));
        on(doc$1, 'mouseup.dragmove', this.onDragEnd.bind(this));
      } // 拖动中

    }, {
      key: "onDraging",
      value: function onDraging(event) {
        var _this$dragStartScroll = this.dragStartScroll,
            scrollLeft = _this$dragStartScroll.scrollLeft,
            scrollTop = _this$dragStartScroll.scrollTop;
        var _this$dragStartMouseP = this.dragStartMousePosition,
            pageX = _this$dragStartMouseP.pageX,
            pageY = _this$dragStartMouseP.pageY;
        var curScrollLeft = scrollLeft - event.pageX + pageX;
        var curScrollTop = scrollTop - event.pageY + pageY;
        this.moveTo(curScrollLeft, curScrollTop);

        if (!this.dragingFlag) {
          addClass(this.$el, 'mind-no-event');
          this.dragingFlag = true;
        }
      } // 结束拖动

    }, {
      key: "onDragEnd",
      value: function onDragEnd(e) {
        e.stopPropagation();
        off(doc$1, 'mousemove.dragmove');
        off(doc$1, 'mouseup.dragmove');
        this.dragingFlag = false;
        removeClass(this.$el, 'mind-no-event');
      } // 缩放

    }, {
      key: "zoom",
      value: function zoom(scale) {
        this.scale = scale || 1;
        setElementStyle(this.$el, {
          transform: "scale(".concat(this.scale, ")")
        });
      } // 放大

    }, {
      key: "zoomIn",
      value: function zoomIn() {
        var _this$options3 = this.options,
            zoomMax = _this$options3.zoomMax,
            zoomStep = _this$options3.zoomStep;
        this.zoom(Math.min(this.scale + zoomStep, zoomMax));
      } // 缩小

    }, {
      key: "zoomOut",
      value: function zoomOut() {
        var _this$options4 = this.options,
            zoomMin = _this$options4.zoomMin,
            zoomStep = _this$options4.zoomStep;
        this.zoom(Math.max(this.scale - zoomStep, zoomMin));
      }
    }, {
      key: "getZoom",
      value: function getZoom() {
        return this.scale;
      }
    }]);

    return Viewport;
  }();

  var options = {
    lineColor: ['#FDB813', '#80BC42', '#e85d4e', '#127c97', '#ffcccc', '#67ccff'],
    type: 'org',
    // org | diagram
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
  };

  var commonjsGlobal = typeof window !== 'undefined' ? window : typeof global !== 'undefined' ? global : typeof self !== 'undefined' ? self : {};

  function createCommonjsModule(fn, module) {
  	return module = { exports: {} }, fn(module, module.exports), module.exports;
  }

  var umd = createCommonjsModule(function (module, exports) {
  (function (global, factory) {
  	module.exports = factory();
  }(commonjsGlobal, (function () {
  var isMergeableObject = function isMergeableObject(value) {
  	return isNonNullObject(value)
  		&& !isSpecial(value)
  };

  function isNonNullObject(value) {
  	return !!value && typeof value === 'object'
  }

  function isSpecial(value) {
  	var stringValue = Object.prototype.toString.call(value);

  	return stringValue === '[object RegExp]'
  		|| stringValue === '[object Date]'
  		|| isReactElement(value)
  }

  // see https://github.com/facebook/react/blob/b5ac963fb791d1298e7f396236383bc955f916c1/src/isomorphic/classic/element/ReactElement.js#L21-L25
  var canUseSymbol = typeof Symbol === 'function' && Symbol.for;
  var REACT_ELEMENT_TYPE = canUseSymbol ? Symbol.for('react.element') : 0xeac7;

  function isReactElement(value) {
  	return value.$$typeof === REACT_ELEMENT_TYPE
  }

  function emptyTarget(val) {
  	return Array.isArray(val) ? [] : {}
  }

  function cloneUnlessOtherwiseSpecified(value, options) {
  	return (options.clone !== false && options.isMergeableObject(value))
  		? deepmerge(emptyTarget(value), value, options)
  		: value
  }

  function defaultArrayMerge(target, source, options) {
  	return target.concat(source).map(function(element) {
  		return cloneUnlessOtherwiseSpecified(element, options)
  	})
  }

  function getMergeFunction(key, options) {
  	if (!options.customMerge) {
  		return deepmerge
  	}
  	var customMerge = options.customMerge(key);
  	return typeof customMerge === 'function' ? customMerge : deepmerge
  }

  function mergeObject(target, source, options) {
  	var destination = {};
  	if (options.isMergeableObject(target)) {
  		Object.keys(target).forEach(function(key) {
  			destination[key] = cloneUnlessOtherwiseSpecified(target[key], options);
  		});
  	}
  	Object.keys(source).forEach(function(key) {
  		if (!options.isMergeableObject(source[key]) || !target[key]) {
  			destination[key] = cloneUnlessOtherwiseSpecified(source[key], options);
  		} else {
  			destination[key] = getMergeFunction(key, options)(target[key], source[key], options);
  		}
  	});
  	return destination
  }

  function deepmerge(target, source, options) {
  	options = options || {};
  	options.arrayMerge = options.arrayMerge || defaultArrayMerge;
  	options.isMergeableObject = options.isMergeableObject || isMergeableObject;

  	var sourceIsArray = Array.isArray(source);
  	var targetIsArray = Array.isArray(target);
  	var sourceAndTargetTypesMatch = sourceIsArray === targetIsArray;

  	if (!sourceAndTargetTypesMatch) {
  		return cloneUnlessOtherwiseSpecified(source, options)
  	} else if (sourceIsArray) {
  		return options.arrayMerge(target, source, options)
  	} else {
  		return mergeObject(target, source, options)
  	}
  }

  deepmerge.all = function deepmergeAll(array, options) {
  	if (!Array.isArray(array)) {
  		throw new Error('first argument should be an array')
  	}

  	return array.reduce(function(prev, next) {
  		return deepmerge(prev, next, options)
  	}, {})
  };

  var deepmerge_1 = deepmerge;

  return deepmerge_1;

  })));
  });

  var deepMerge = function deepMerge() {
    for (var _len = arguments.length, source = new Array(_len), _key = 0; _key < _len; _key++) {
      source[_key] = arguments[_key];
    }

    source = source.filter(function (item) {
      return !!item;
    });
    return umd.all(source, {
      arrayMerge: function arrayMerge(destinationArray, sourceArray) {
        return sourceArray;
      }
    });
  };
  var isDOM$1 = (typeof HTMLElement === "undefined" ? "undefined" : _typeof(HTMLElement)) === 'object' ? function (obj) {
    return obj instanceof HTMLElement;
  } : function (obj) {
    return obj && _typeof(obj) === 'object' && obj.nodeType === 1 && typeof obj.nodeName === 'string';
  };
  var treeToArray = function treeToArray(nodes) {
    var childKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'children';
    var list = [];

    if (nodes instanceof Array) {
      nodes.forEach(function (node) {
        list.push(node);
        list = list.concat(treeToArray(node[childKey]));
      });
    } else {
      list.push(nodes);
      list = list.concat(treeToArray(nodes[childKey]));
    }

    return list;
  };

  var body = document.body;
  var $tooltip;
  var positionX = 0;
  var positionY = 0;
  var delayTimeout;

  var init = function init() {
    if ($tooltip) return;
    $tooltip = createElement('div', {
      class: 'mind-tooltip'
    });
    body.appendChild($tooltip);
  };

  var resetPosition = function resetPosition() {
    if (!$tooltip) return;

    var _$tooltip$getBounding = $tooltip.getBoundingClientRect(),
        width = _$tooltip$getBounding.width,
        height = _$tooltip$getBounding.height;

    var arrowHeight = 4;
    setElementStyle($tooltip, {
      left: positionX - width / 2,
      top: positionY - height - arrowHeight
    });
  };

  var show = function show(delay) {
    if (!$tooltip) {
      init();
    }

    if (delay) {
      delayTimeout = setTimeout(function () {
        addClass($tooltip, 'show');
        resetPosition();
      }, delay);
    } else {
      addClass($tooltip, 'show');
      resetPosition();
    }
  };
  var hide = function hide() {
    if (!$tooltip) return;

    if (delayTimeout) {
      clearTimeout(delayTimeout);
      delayTimeout = null;
    }

    removeClass($tooltip, 'show');
    $tooltip.style.left = '';
    $tooltip.style.top = '';
  };
  var setContent = function setContent(content) {
    if (!$tooltip) {
      init();
    }

    $tooltip.innerHTML = content;
  };
  var setPosition = function setPosition(left, top) {
    positionX = left;
    positionY = top;
  };
  var destroy = function destroy() {
    if (!$tooltip) return;
    body.removeChild($tooltip);
    $tooltip = null;
  };

  var doc$2 = document;

  var Mind =
  /*#__PURE__*/
  function () {
    // 容器
    // dom对象
    // 配置项
    // 视图画布
    function Mind(el, _options) {
      _classCallCheck(this, Mind);

      _defineProperty(this, "$container", null);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "options", options);

      _defineProperty(this, "viewport", null);

      this.$container = typeof el === 'string' ? doc$2.querySelector(el) : el;
      this.options = deepMerge(this.options, _options);
      this.create();
      this.createViewport();
    } // 创建组件容器


    _createClass(Mind, [{
      key: "create",
      value: function create() {
        this.$el = createElement('div', {
          class: 'mind-container'
        }, this.$container);
      } // 创建画布容器

    }, {
      key: "createViewport",
      value: function createViewport() {
        this.viewport = new Viewport(this);
      } // 获取画布尺寸

    }, {
      key: "getViewportSize",
      value: function getViewportSize() {
        var _this$options = this.options,
            width = _this$options.width,
            height = _this$options.height;
        return {
          width: width,
          height: height
        };
      } // 获取当前画布缩放比例

    }, {
      key: "getZoom",
      value: function getZoom() {
        return this.viewport.getZoom();
      } // 移除dom并注销事件

    }, {
      key: "destroy",
      value: function destroy$1() {
        this.$container.removeChild(this.$el);
        destroy();
      }
    }]);

    return Mind;
  }();

  var Node =
  /*#__PURE__*/
  function () {
    // dom对象
    // 伸缩句柄对象
    // 配置项
    function Node(options) {
      _classCallCheck(this, Node);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "$expandBox", null);

      _defineProperty(this, "options", {
        nodeType: 'normal',
        data: null,
        showTooltip: false,
        formatTooltip: null,
        tooltipDelay: 0
      });

      this.options = deepMerge(this.options, options);
      this.create();
      this.setStyle();
      this.initEvents();
    } // 创建dom


    _createClass(Node, [{
      key: "create",
      value: function create() {
        var title = this.options.data.title;
        this.$el = createElement('div', {
          class: 'mind-node'
        });
        var $title = createElement('div', {
          class: 'mind-node-inner'
        }, this.$el);
        $title.innerText = title;
      } // 设置主节点样式

    }, {
      key: "setStyle",
      value: function setStyle() {
        var _this$options = this.options,
            nodeType = _this$options.nodeType,
            data = _this$options.data; // const style = deepMerge(defaultOptions[`${nodeType}NodeStyle`], data.style)

        setElementStyle(this.$el, data.style);

        if (data.className) {
          addClass(this.$el, data.className);
        }
      }
    }, {
      key: "initEvents",
      value: function initEvents() {
        on(this.$el, 'mouseenter.nodehover', this.onMouseEnter.bind(this));
        on(this.$el, 'mouseleave.nodehover', this.onMouseLeave.bind(this));
      }
    }, {
      key: "onMouseEnter",
      value: function onMouseEnter() {
        var _this$options2 = this.options,
            data = _this$options2.data,
            showTooltip = _this$options2.showTooltip,
            formatTooltip = _this$options2.formatTooltip,
            tooltipDelay = _this$options2.tooltipDelay;
        if (!showTooltip) return;
        var content = formatTooltip ? formatTooltip(data, this) : data.title;
        if (!content) return;

        var _this$getSize = this.getSize(),
            width = _this$getSize.width,
            left = _this$getSize.left,
            top = _this$getSize.top;

        setContent(content);
        setPosition(left + width / 2, top);
        show(tooltipDelay);
      }
    }, {
      key: "onMouseLeave",
      value: function onMouseLeave() {
        hide();
      }
    }, {
      key: "getSize",
      value: function getSize() {
        return this.$el.getBoundingClientRect();
      }
    }, {
      key: "getData",
      value: function getData() {
        return this.options.data;
      } // 设置节点位置

    }, {
      key: "setPosition",
      value: function setPosition(left, top) {
        setElementStyle(this.$el, {
          left: left,
          top: top
        });
      } // 移除节点

    }, {
      key: "remove",
      value: function remove() {
        this.container && this.container.removeChild(this.el);
      }
    }]);

    return Node;
  }();

  var TopicLine =
  /*#__PURE__*/
  function () {
    // 路径的dom对象
    function TopicLine(options) {
      _classCallCheck(this, TopicLine);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "options", {
        // 起点位置
        start: [],
        // 终点位置
        end: [],
        // 弯曲半径
        radius: 4,
        // 线条颜色
        stroke: '#43a9ff',
        // 线条粗细
        strokeWidth: 1,
        // 线条填充色
        fill: 'none',
        // 路径终结类型
        strokeLinecap: 'square'
      });

      Object.assign(this.options, options);
      this.create();
    } // 创建曲线


    _createClass(TopicLine, [{
      key: "create",
      value: function create() {
        var _this$options = this.options,
            start = _this$options.start,
            end = _this$options.end,
            radius = _this$options.radius,
            stroke = _this$options.stroke,
            strokeWidth = _this$options.strokeWidth,
            strokeLinecap = _this$options.strokeLinecap,
            fill = _this$options.fill;
        var startX = start[0];
        var startY = start[1];
        var endX = end[0];
        var endY = end[1];
        var pathD;

        if (Math.abs(startY - endY) < radius) {
          pathD = ['M', startX, startY, 'L', endX, endY];
        } else {
          var sweepFlag = endX > startX && endY < startY || startX > endX && startY < endY ? 1 : 0;
          var turnX1 = (startX + endX) / 2;
          var turnX2 = endX > startX ? Math.min(turnX1 + radius, endX) : Math.max(turnX1 - radius, endX);
          var turnY1 = endY > startY ? Math.max(startY, endY - radius) : Math.min(startY, endY + radius);
          pathD = ['M', startX, startY, 'L', turnX1, startY, 'L', turnX1, turnY1, 'A', radius, radius, 0, 0, sweepFlag, turnX2, endY, 'L', endX, endY];
        }

        this.$el = createElement('path', {
          d: pathD.join(' '),
          stroke: stroke,
          'stroke-width': strokeWidth,
          'stroke-linecap': strokeLinecap,
          fill: fill
        });
      }
    }]);

    return TopicLine;
  }();

  var Topic =
  /*#__PURE__*/
  function () {
    // 配置项
    // dom对象
    // 路径组
    // 当前节点
    // 父主题
    // 子主题
    // 当前节点是否展开
    function Topic(options) {
      _classCallCheck(this, Topic);

      _defineProperty(this, "options", {
        // 根实例
        mind: null,
        // 父主题
        parent: null,
        // root, left, right
        structure: 'right',
        // 数据
        data: null // 根实例

      });

      _defineProperty(this, "mind", null);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "$topicBox", null);

      _defineProperty(this, "$expandBox", null);

      _defineProperty(this, "$pathBox", null);

      _defineProperty(this, "$pathGroup", null);

      _defineProperty(this, "node", null);

      _defineProperty(this, "parent", null);

      _defineProperty(this, "children", []);

      _defineProperty(this, "isExpand", true);

      Object.assign(this.options, options);
      this.parent = this.options.parent;
      this.mind = this.options.mind;
      this.isExpand = options.data.expand !== false;
      this.create();
    }

    _createClass(Topic, [{
      key: "render",
      value: function render() {
        var children = this.children;

        if (children.length) {
          this.isExpand && this.drawLines();
          children.forEach(function (child) {
            child.render();
          });
        }
      } // 创建

    }, {
      key: "create",
      value: function create() {
        var _this$options = this.options,
            data = _this$options.data,
            structure = _this$options.structure;
        this.$el = createElement('div', {
          class: "mind-topic-container mind-topic-".concat(structure, " ").concat(this.isExpand ? 'is-expand' : '')
        });
        this.createNode();

        if (data.children && data.children.length) {
          this.createChildren();
          this.createPaths();
          this.createExpand();
        }
      } // 创建主题节点

    }, {
      key: "createNode",
      value: function createNode() {
        var parent = this.parent,
            options = this.options;
        var nodeType = 'normal';
        var $topicBox = this.$topicBox = createElement('div', {
          class: 'mind-topic-box'
        }, this.$el);

        if (options.structure === 'root') {
          nodeType = 'root';
        } else if (parent && parent.options.structure === 'root') {
          nodeType = 'branch';
        }

        this.node = new Node({
          nodeType: nodeType,
          data: options.data,
          showTooltip: this.mind.options.showTooltip,
          formatTooltip: this.mind.options.formatTooltip,
          tooltipDelay: this.mind.options.tooltipDelay
        });
        $topicBox.appendChild(this.node.$el);
      } // 创建伸缩句柄

    }, {
      key: "createExpand",
      value: function createExpand() {
        this.$expandBox = createElement('span', {
          class: 'mind-expand-box'
        }, this.$topicBox);
      } // 创建子主题

    }, {
      key: "createChildren",
      value: function createChildren() {
        var _this = this;

        var _this$options2 = this.options,
            data = _this$options2.data,
            structure = _this$options2.structure;
        var children = data.children;
        var $child = createElement('div', {
          class: 'mind-topic-children'
        });
        this.children = children.map(function (child) {
          var childTopic = new Topic({
            mind: _this.mind,
            parent: _this,
            structure: structure,
            data: child
          });
          $child.appendChild(childTopic.$el);
          return childTopic;
        });

        if (structure === 'left') {
          this.$el.insertBefore($child, this.$topicBox);
        } else {
          this.$el.appendChild($child);
        }
      } // 创建路径

    }, {
      key: "createPaths",
      value: function createPaths() {
        var svg = this.$pathBox = createElement('svg', {
          width: '100%',
          height: '100%',
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }, this.$el);
        this.$pathGroup = createElement('g', null, svg);
      } // 设置定位

    }, {
      key: "setPosition",
      value: function setPosition(left, top) {
        setElementStyle(this.$el, {
          left: left,
          top: top
        });
      } // 获取定位位置

    }, {
      key: "getPosition",
      value: function getPosition() {
        var left = parseInt(this.$el.style.left, 10);
        var top = parseInt(this.$el.style.top, 10);
        return {
          left: left,
          top: top
        };
      } // 获取尺寸

    }, {
      key: "getSize",
      value: function getSize() {
        return this.$el.getBoundingClientRect();
      } // 绘制连接线

    }, {
      key: "drawLines",
      value: function drawLines() {
        var _this2 = this;

        var zoom = this.mind.getZoom();
        var structure = this.options.structure;
        var topicRect = this.getSize();
        var startPos = this.getLineStartPos();
        this.children.forEach(function (child) {
          var subTopicRect = child.getSize();
          var endPosY = (subTopicRect.top - topicRect.top + subTopicRect.height / 2) / zoom;
          var endPosX = (structure === 'left' ? subTopicRect.right - topicRect.left : subTopicRect.left - topicRect.left) / zoom;
          var topicLine = new TopicLine({
            start: [startPos.left / zoom, startPos.top / zoom],
            end: [endPosX, endPosY]
          });

          _this2.$pathGroup.appendChild(topicLine.$el);
        });
      } // 更新当前节点的连接路径

    }, {
      key: "updateConnections",
      value: function updateConnections() {
        if (!this.children.length) return;
        this.$pathGroup.innerHTML = '';

        if (this.isExpand) {
          this.drawLines();
        }
      } // 更新父节点的连接关系，并层层往上更新

    }, {
      key: "updateParentConnections",
      value: function updateParentConnections() {
        var parentTopic = this.parent;

        if (parentTopic) {
          parentTopic.updateConnections();
          parentTopic.updateParentConnections();
        }
      } // 更新子节点的连接关系，并层层往下更新

    }, {
      key: "updateChildConnections",
      value: function updateChildConnections() {
        this.children.forEach(function (child) {
          child.updateConnections();
          child.updateChildConnections();
        });
      } // 获取连线起始位置

    }, {
      key: "getLineStartPos",
      value: function getLineStartPos() {
        var structure = this.options.structure;
        var topicRect = this.getSize();
        var nodeRect = this.node.getSize();
        var top = nodeRect.top - topicRect.top + nodeRect.height / 2;
        var left = structure === 'left' ? nodeRect.left - topicRect.left : nodeRect.left - topicRect.left + nodeRect.width;
        return {
          left: left,
          top: top
        };
      }
    }, {
      key: "triggerExpand",
      value: function triggerExpand() {
        this.isExpand = !this.isExpand;

        if (this.isExpand) {
          addClass(this.$el, 'is-expand');
        } else {
          removeClass(this.$el, 'is-expand');
        }

        var rootTopic = this.getRootTopic();
        rootTopic.resetPosToCenter();
        this.updateParentConnections();
        this.updateConnections();
        this.updateChildConnections();
      } // 获取根主题

    }, {
      key: "getRootTopic",
      value: function getRootTopic() {
        var topic = this;

        while (topic.parent) {
          topic = topic.parent;
        }

        return topic;
      }
    }]);

    return Topic;
  }();

  var Curve =
  /*#__PURE__*/
  function () {
    // 路径的dom对象
    function Curve(options) {
      _classCallCheck(this, Curve);

      _defineProperty(this, "$el", null);

      _defineProperty(this, "options", {
        // gradient, quadratic, cubic
        type: 'quadratic',
        // 起点位置
        start: [],
        // 终点位置
        end: [],
        // 渐变线起点宽度
        quadraticWidth: 10,
        // 线条颜色
        stroke: '#43a9ff',
        // 线条粗细
        strokeWidth: 2,
        // 线条填充色
        fill: 'none',
        // 路径终结类型
        strokeLinecap: 'square'
      });

      Object.assign(this.options, options);
      this.create();
    } // 创建曲线


    _createClass(Curve, [{
      key: "create",
      value: function create() {
        var type = this.options.type;

        switch (type) {
          case 'gradient':
            this.createGradientCurve();
            break;
        }
      } // 创建宽度渐变的二次贝塞尔曲线

    }, {
      key: "createGradientCurve",
      value: function createGradientCurve() {
        var _this$options = this.options,
            start = _this$options.start,
            end = _this$options.end,
            quadraticWidth = _this$options.quadraticWidth,
            stroke = _this$options.stroke,
            strokeWidth = _this$options.strokeWidth,
            strokeLinecap = _this$options.strokeLinecap,
            fill = _this$options.fill;
        var startX = start[0];
        var startY = start[1];
        var endX = end[0];
        var endY = end[1];
        var pathD;

        if (Math.abs(endY - startY) < quadraticWidth) {
          var tan = Math.atan((endY - startY) / (endX - startX));
          var offsetX = Math.sin(tan) * quadraticWidth / 2;
          var offsetY = Math.cos(tan) * quadraticWidth / 2;
          var realStartX1 = startX + offsetX;
          var realStartY1 = startY - offsetY;
          var realStartX2 = startX - offsetX;
          var realStartY2 = startY + offsetY;
          pathD = ['M', realStartX1, realStartY1, 'L', endX, endY, 'L', realStartX2, realStartY2, 'L', realStartX1, realStartY1];
        } else {
          var handleX = (endX - startX) * 0.2 + startX;
          var handleY = endY;
          var handleOffestX = endX > startX && endY > startY || endX < startX && endY < startY ? -quadraticWidth : quadraticWidth;

          var _tan = Math.atan((handleY - startY) / (handleX - startX));

          var _offsetX = Math.sin(_tan) * quadraticWidth / 2;

          var _offsetY = Math.cos(_tan) * quadraticWidth / 2;

          var _realStartX = startX + _offsetX;

          var _realStartY = startY - _offsetY;

          var _realStartX2 = startX - _offsetX;

          var _realStartY2 = startY + _offsetY;

          pathD = ['M', _realStartX, _realStartY, 'C', _realStartX, _realStartY, handleX, handleY, endX, endY, 'C', handleX + handleOffestX, handleY, _realStartX2, _realStartY2, _realStartX2, _realStartY2, 'L', _realStartX, _realStartY, 'Z'];
        }

        this.$el = createElement('path', {
          d: pathD.join(' '),
          stroke: stroke,
          'stroke-width': strokeWidth,
          'stroke-linecap': strokeLinecap,
          fill: fill
        });
      }
    }]);

    return Curve;
  }();

  var RootTopic =
  /*#__PURE__*/
  function (_Topic) {
    _inherits(RootTopic, _Topic);

    // 中心点横坐标位置
    // 中心点纵坐标位置
    function RootTopic(options) {
      var _this;

      _classCallCheck(this, RootTopic);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(RootTopic).call(this, options));

      _defineProperty(_assertThisInitialized(_this), "centerPosX", null);

      _defineProperty(_assertThisInitialized(_this), "centerPosY", null);

      return _this;
    }

    _createClass(RootTopic, [{
      key: "createChildren",
      value: function createChildren() {
        var _this$options$data = this.options.data,
            children = _this$options$data.children,
            leftChildren = _this$options$data.leftChildren;
        var $child = createElement('div', {
          class: 'mind-topic-children'
        });
        var rightChildrenTopic = this.createChildrenByStructure(children, 'right', $child);
        var leftChildrenTopic = this.createChildrenByStructure(leftChildren, 'left', $child);
        this.children = rightChildrenTopic.concat(leftChildrenTopic);
        this.$el.appendChild($child);
      }
    }, {
      key: "createChildrenByStructure",
      value: function createChildrenByStructure(children, structure, $child) {
        var _this2 = this;

        if (!children) return [];
        return children.map(function (child) {
          var childTopic = new Topic({
            mind: _this2.mind,
            parent: _this2,
            structure: structure,
            data: child
          });
          $child.appendChild(childTopic.$el);
          return childTopic;
        });
      }
    }, {
      key: "render",
      value: function render() {
        this.mind.viewport.$el.appendChild(this.$el);
        this.resetPosToCenter();
        this.drawLines();
        this.children.forEach(function (child) {
          child.render();
        });
      } // 将结构定位到画布中心

    }, {
      key: "resetPosToCenter",
      value: function resetPosToCenter() {
        this.resetNodePos();
        this.resetChildTopicPos('left');
        this.resetChildTopicPos('right');
      } // 定位根节点

    }, {
      key: "resetNodePos",
      value: function resetNodePos() {
        var zoom = this.mind.getZoom();

        var _this$node$getSize = this.node.getSize(),
            width = _this$node$getSize.width,
            height = _this$node$getSize.height;

        var _this$mind$getViewpor = this.mind.getViewportSize(),
            vw = _this$mind$getViewpor.width,
            vh = _this$mind$getViewpor.height;

        var left = (vw - width / zoom) / 2;
        var top = (vh - height / zoom) / 2;
        this.centerPosX = vw / 2;
        this.centerPosY = vh / 2;
        setElementStyle(this.$topicBox, {
          left: left,
          top: top
        });
      } // 定位分支主题

    }, {
      key: "resetChildTopicPos",
      value: function resetChildTopicPos(structure) {
        var _this3 = this;

        var zoom = this.mind.getZoom();

        var _this$node$getSize2 = this.node.getSize(),
            nodeW = _this$node$getSize2.width;

        var _this$mind$options = this.mind.options,
            rootMargin = _this$mind$options.rootMargin,
            branchMargin = _this$mind$options.branchMargin;
        var topics = this.children.filter(function (child) {
          return child.options.structure === structure;
        });
        var topicSizes = topics.map(function (child) {
          return child.getSize();
        });
        var totalHeight = topicSizes.reduce(function (total, current) {
          return total + current.height / zoom;
        }, 0);
        totalHeight += (topics.length - 1) * branchMargin;
        var posTop = this.centerPosY - totalHeight / 2;
        topicSizes.forEach(function (size, index) {
          var topic = topics[index];
          var posLeft = structure === 'left' ? _this3.centerPosX - nodeW / zoom / 2 - rootMargin - size.width / zoom : _this3.centerPosX + nodeW / zoom / 2 + rootMargin;
          topic.setPosition(posLeft, posTop);
          posTop += size.height / zoom + branchMargin;
        });
      }
    }, {
      key: "drawLines",
      value: function drawLines() {
        var _this4 = this;

        var zoom = this.mind.getZoom();
        var centerPosX = this.centerPosX,
            centerPosY = this.centerPosY;
        var lineColor = this.mind.options.lineColor;
        this.children.forEach(function (child, index) {
          var _child$getSize = child.getSize(),
              width = _child$getSize.width,
              height = _child$getSize.height;

          var _child$getPosition = child.getPosition(),
              left = _child$getPosition.left,
              top = _child$getPosition.top;

          var endX = child.options.structure === 'left' ? left + width / zoom : left;
          var endY = top + height / zoom / 2;
          var curve = new Curve({
            type: 'gradient',
            start: [centerPosX, centerPosY],
            end: [endX, endY],
            stroke: lineColor[index],
            fill: lineColor[index]
          });

          _this4.$pathGroup.appendChild(curve.$el);
        });
      }
    }]);

    return RootTopic;
  }(Topic);

  var _matcher;

  var _level = 0;
  var _id = 0;
  var _handlers = {};
  var _gatorInstances = {};

  function _addEvent(gator, type, callback) {
    // blur and focus do not bubble up but if you use event capturing
    // then you will get them
    type = type.split('.')[0];
    var useCapture = type == 'blur' || type == 'focus';
    gator.element.addEventListener(type, callback, useCapture);
  }

  function _cancel(e) {
    e.preventDefault();
    e.stopPropagation();
  }
  /**
   * returns function to use for determining if an element
   * matches a query selector
   *
   * @returns {Function}
   */


  function _getMatcher(element) {
    if (_matcher) {
      return _matcher;
    }

    if (element.matches) {
      _matcher = element.matches;
      return _matcher;
    }

    if (element.webkitMatchesSelector) {
      _matcher = element.webkitMatchesSelector;
      return _matcher;
    }

    if (element.mozMatchesSelector) {
      _matcher = element.mozMatchesSelector;
      return _matcher;
    }

    if (element.msMatchesSelector) {
      _matcher = element.msMatchesSelector;
      return _matcher;
    }

    if (element.oMatchesSelector) {
      _matcher = element.oMatchesSelector;
      return _matcher;
    } // if it doesn't match a native browser method
    // fall back to the gator function


    _matcher = Gator.matchesSelector;
    return _matcher;
  }
  /**
   * determines if the specified element matches a given selector
   *
   * @param {Node} element - the element to compare against the selector
   * @param {string} selector
   * @param {Node} boundElement - the element the listener was attached to
   * @returns {void|Node}
   */


  function _matchesSelector(element, selector, boundElement) {
    // no selector means this event was bound directly to this element
    if (selector == '_root') {
      return boundElement;
    } // if we have moved up to the element you bound the event to
    // then we have come too far


    if (element === boundElement) {
      return;
    } // if this is a match then we are done!


    if (_getMatcher(element).call(element, selector)) {
      return element;
    } // if this element did not match but has a parent we should try
    // going up the tree to see if any of the parent elements match
    // for example if you are looking for a click on an <a> tag but there
    // is a <span> inside of the a tag that it is the target,
    // it should still work


    if (element.parentNode) {
      _level++;
      return _matchesSelector(element.parentNode, selector, boundElement);
    }
  }

  function _addHandler(gator, event, selector, callback) {
    if (!_handlers[gator.id]) {
      _handlers[gator.id] = {};
    }

    if (!_handlers[gator.id][event]) {
      _handlers[gator.id][event] = {};
    }

    if (!_handlers[gator.id][event][selector]) {
      _handlers[gator.id][event][selector] = [];
    }

    _handlers[gator.id][event][selector].push(callback);
  }

  function _removeHandler(gator, event, selector, callback) {
    // if there are no events tied to this element at all
    // then don't do anything
    if (!_handlers[gator.id]) {
      return;
    } // if there is no event type specified then remove all events
    // example: Gator(element).off()


    if (!event) {
      for (var type in _handlers[gator.id]) {
        if (_handlers[gator.id].hasOwnProperty(type)) {
          _handlers[gator.id][type] = {};
        }
      }

      return;
    } // if no callback or selector is specified remove all events of this type
    // example: Gator(element).off('click')


    if (!callback && !selector) {
      _handlers[gator.id][event] = {};
      return;
    } // if a selector is specified but no callback remove all events
    // for this selector
    // example: Gator(element).off('click', '.sub-element')


    if (!callback) {
      delete _handlers[gator.id][event][selector];
      return;
    } // if we have specified an event type, selector, and callback then we
    // need to make sure there are callbacks tied to this selector to
    // begin with.  if there aren't then we can stop here


    if (!_handlers[gator.id][event][selector]) {
      return;
    } // if there are then loop through all the callbacks and if we find
    // one that matches remove it from the array


    for (var i = 0; i < _handlers[gator.id][event][selector].length; i++) {
      if (_handlers[gator.id][event][selector][i] === callback) {
        _handlers[gator.id][event][selector].splice(i, 1);

        break;
      }
    }
  }

  function _handleEvent(id, e, type) {
    if (!_handlers[id][type]) {
      return;
    }

    var target = e.target || e.srcElement,
        selector,
        match,
        matches = {},
        i = 0,
        j = 0; // find all events that match

    _level = 0;

    for (selector in _handlers[id][type]) {
      if (_handlers[id][type].hasOwnProperty(selector)) {
        match = _matchesSelector(target, selector, _gatorInstances[id].element);

        if (match && Gator.matchesEvent(type, _gatorInstances[id].element, match, selector == '_root', e)) {
          _level++;
          _handlers[id][type][selector].match = match;
          matches[_level] = _handlers[id][type][selector];
        }
      }
    } // stopPropagation() fails to set cancelBubble to true in Webkit
    // @see http://code.google.com/p/chromium/issues/detail?id=162270


    e.stopPropagation = function () {
      e.cancelBubble = true;
    };

    for (i = 0; i <= _level; i++) {
      if (matches[i]) {
        for (j = 0; j < matches[i].length; j++) {
          if (matches[i][j].call(matches[i].match, e) === false) {
            Gator.cancel(e);
            return;
          }

          if (e.cancelBubble) {
            return;
          }
        }
      }
    }
  }
  /**
   * binds the specified events to the element
   *
   * @param {string|Array} events
   * @param {string} selector
   * @param {Function} callback
   * @param {boolean=} remove
   * @returns {Object}
   */


  function _bind(events, selector, callback, remove) {
    // fail silently if you pass null or undefined as an alement
    // in the Gator constructor
    if (!this.element) {
      return;
    }

    if (!(events instanceof Array)) {
      events = [events];
    }

    if (!callback && typeof selector == 'function') {
      callback = selector;
      selector = '_root';
    }

    var id = this.id,
        i;

    function _getGlobalCallback(type) {
      return function (e) {
        _handleEvent(id, e, type);
      };
    }

    for (i = 0; i < events.length; i++) {
      if (remove) {
        _removeHandler(this, events[i], selector, callback);

        continue;
      }

      if (!_handlers[id] || !_handlers[id][events[i]]) {
        Gator.addEvent(this, events[i], _getGlobalCallback(events[i]));
      }

      _addHandler(this, events[i], selector, callback);
    }

    return this;
  }
  /**
   * Gator object constructor
   *
   * @param {Node} element
   */


  function Gator(element, id) {
    // called as function
    if (!(this instanceof Gator)) {
      // only keep one Gator instance per node to make sure that
      // we don't create a ton of new objects if you want to delegate
      // multiple events from the same node
      //
      // for example: Gator(document).on(...
      for (var key in _gatorInstances) {
        if (_gatorInstances[key].element === element) {
          return _gatorInstances[key];
        }
      }

      _id++;
      _gatorInstances[_id] = new Gator(element, _id);
      return _gatorInstances[_id];
    }

    this.element = element;
    this.id = id;
  }
  /**
   * adds an event
   *
   * @param {string|Array} events
   * @param {string} selector
   * @param {Function} callback
   * @returns {Object}
   */


  Gator.prototype.on = function (events, selector, callback) {
    return _bind.call(this, events, selector, callback);
  };
  /**
   * removes an event
   *
   * @param {string|Array} events
   * @param {string} selector
   * @param {Function} callback
   * @returns {Object}
   */


  Gator.prototype.off = function (events, selector, callback) {
    return _bind.call(this, events, selector, callback, true);
  };

  Gator.matchesSelector = function () {};

  Gator.cancel = _cancel;
  Gator.addEvent = _addEvent;

  Gator.matchesEvent = function () {
    return true;
  };

  var doc$3 = document;

  var OrgMind =
  /*#__PURE__*/
  function (_Mind) {
    _inherits(OrgMind, _Mind);

    // 根节点
    // 所有节点列表
    function OrgMind(el, options) {
      var _this;

      _classCallCheck(this, OrgMind);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(OrgMind).call(this, el, options));

      _defineProperty(_assertThisInitialized(_this), "rootTopic", null);

      _defineProperty(_assertThisInitialized(_this), "topics", []);

      _this.initEvents();

      _this.render();

      return _this;
    } // 开始渲染图形


    _createClass(OrgMind, [{
      key: "render",
      value: function render() {
        this.rootTopic = new RootTopic({
          mind: this,
          structure: 'root',
          data: this.options.data
        });
        this.rootTopic.render();
        this.topics = treeToArray(this.rootTopic);
      } // 初始化事件

    }, {
      key: "initEvents",
      value: function initEvents() {
        Gator(doc$3).on('click.expand', '.mind-expand-box', this.triggerTopicExpand.bind(this));
        Gator(doc$3).on('click.node', '.mind-node', this.onNodeClick.bind(this));
      } // 节点伸缩切换

    }, {
      key: "triggerTopicExpand",
      value: function triggerTopicExpand(e) {
        var $topic = e.target.parentNode.parentNode;
        var topic = this.getTopicByElement($topic);
        topic && topic.triggerExpand();
      } // 节点点击

    }, {
      key: "onNodeClick",
      value: function onNodeClick(e) {
        var $topic = e.target;

        while (!hasClass($topic, 'mind-topic-container')) {
          $topic = $topic.parentNode;
        }

        var topic = this.getTopicByElement($topic);

        if (topic && this.options.onNodeClick) {
          this.options.onNodeClick(topic.options.data, topic.node);
        }
      } // 通过dom获取主题实例

    }, {
      key: "getTopicByElement",
      value: function getTopicByElement(el) {
        return this.topics.find(function (topic) {
          return topic.$el === el;
        });
      } // 移除dom并注销事件

    }, {
      key: "destroy",
      value: function destroy$1() {
        this.$container.removeChild(this.$el);
        Gator(doc$3).off('click.expand');
        Gator(doc$3).off('click.node');
        destroy();
      }
    }]);

    return OrgMind;
  }(Mind);

  var Connection =
  /*#__PURE__*/
  function () {
    // 路径dom
    // 起点
    // 终点
    function Connection(from, to, options) {
      _classCallCheck(this, Connection);

      _defineProperty(this, "$path", null);

      _defineProperty(this, "from", null);

      _defineProperty(this, "to", null);

      _defineProperty(this, "options", {
        stroke: '#43a9ff',
        strokeWidth: 1,
        strokeLinecap: 'square',
        fill: 'none'
      });

      this.from = from;
      this.to = to;
      Object.assign(this.options, options);
      this.create();
    }

    _createClass(Connection, [{
      key: "create",
      value: function create() {
        var _this$options = this.options,
            stroke = _this$options.stroke,
            strokeWidth = _this$options.strokeWidth,
            strokeLinecap = _this$options.strokeLinecap,
            fill = _this$options.fill;
        var $path = this.$path = createElement('path', {
          stroke: stroke,
          'stroke-width': strokeWidth,
          'stroke-linecap': strokeLinecap,
          fill: fill
        });

        if (this.getPath) {
          $path.setAttribute('d', this.getPath());
        }
      }
    }]);

    return Connection;
  }();

  var LinkLine =
  /*#__PURE__*/
  function (_Connection) {
    _inherits(LinkLine, _Connection);

    function LinkLine(from, to, options) {
      _classCallCheck(this, LinkLine);

      return _possibleConstructorReturn(this, _getPrototypeOf(LinkLine).call(this, from, to, options));
    }

    _createClass(LinkLine, [{
      key: "create",
      value: function create() {
        var _this$options = this.options,
            stroke = _this$options.stroke,
            strokeWidth = _this$options.strokeWidth,
            strokeLinecap = _this$options.strokeLinecap,
            strokeLinejoin = _this$options.strokeLinejoin,
            fill = _this$options.fill;
        var pathStyle = {
          stroke: stroke,
          'stroke-width': strokeWidth,
          'stroke-linecap': strokeLinecap,
          'stroke-linejoin': strokeLinejoin,
          fill: fill
        };
        var $path = this.$path = createElement('g');
        var $line = createElement('path', pathStyle, $path);
        var $arrow = createElement('path', pathStyle, $path);
        $line.setAttribute('d', this.getPath());
        $arrow.setAttribute('d', this.getArrowPath());
      }
    }, {
      key: "getPath",
      value: function getPath() {
        var fromX = this.from[0];
        var fromY = this.from[1];
        var toX = this.to[0];
        var toY = this.to[1];
        var handleOffsetX = Math.abs(fromX - toX) * 0.4;
        var handlePointX1 = fromX > toX ? fromX - handleOffsetX : fromX + handleOffsetX;
        var handlePointX2 = fromX > toX ? toX + handleOffsetX : toX - handleOffsetX;
        return ['M', fromX, fromY, 'C', handlePointX1, fromY, handlePointX2, toY, fromX > toX ? toX + 10 : toX - 10, toY, 'L', toX, toY].join(' ');
      }
    }, {
      key: "getArrowPath",
      value: function getArrowPath() {
        var fromX = this.from[0];
        var toX = this.to[0];
        var toY = this.to[1];
        var vertex1;
        var vertex2;

        if (fromX > toX) {
          vertex1 = [toX + 6, toY - 4];
          vertex2 = [toX + 6, toY + 4];
        } else {
          vertex1 = [toX - 6, toY - 4];
          vertex2 = [toX - 6, toY + 4];
        }

        return ['M', toX, toY, 'L', vertex1[0], vertex1[1], 'M', toX, toY, 'L', vertex2[0], vertex2[1], 'Z'].join(' ');
      }
    }]);

    return LinkLine;
  }(Connection);

  var doc$4 = document;

  var FlowMind =
  /*#__PURE__*/
  function (_Mind) {
    _inherits(FlowMind, _Mind);

    // 节点列表
    function FlowMind(el, options) {
      var _this;

      _classCallCheck(this, FlowMind);

      _this = _possibleConstructorReturn(this, _getPrototypeOf(FlowMind).call(this, el, options));

      _defineProperty(_assertThisInitialized(_this), "nodes", []);

      _defineProperty(_assertThisInitialized(_this), "nodeTree", null);

      _defineProperty(_assertThisInitialized(_this), "$pathBox", null);

      _defineProperty(_assertThisInitialized(_this), "$pathGroup", null);

      addClass(_this.$el, 'mind-flow');
      _this.nodeTree = _this.createNode(options.data, 0);

      _this.nodes.forEach(function (_ref) {
        var node = _ref.node;

        _this.viewport.$el.appendChild(node.$el);
      });

      _this.createPaths();

      _this.createLabels();

      _this.setPosition();

      _this.createConnections(_this.nodeTree);

      _this.initEvents();

      return _this;
    } // 创建节点


    _createClass(FlowMind, [{
      key: "createNode",
      value: function createNode(nodeData, axis) {
        var _this2 = this;

        if (!nodeData) return;

        if (nodeData instanceof Array) {
          return nodeData.map(function (data) {
            var parents = _this2.createNode(data.parents, axis - 1);

            var children = _this2.createNode(data.children, axis + 1);

            var node = {
              node: new Node({
                nodeType: 'flow',
                data: data,
                showTooltip: _this2.options.showTooltip,
                formatTooltip: _this2.options.formatTooltip,
                tooltipDelay: _this2.options.tooltipDelay
              }),
              axis: axis,
              parents: parents,
              children: children
            };

            if (parents && parents.length) {
              node.leaf = parents.reduce(function (total, parent) {
                return total + parent.leaf;
              }, 0);
            } else if (children && children.length) {
              node.leaf = children.reduce(function (total, child) {
                return total + child.leaf;
              }, 0);
            } else {
              node.leaf = 1;
            }

            _this2.nodes.push(node);

            return node;
          });
        } else {
          var node = {
            node: new Node({
              nodeType: 'root',
              data: nodeData,
              showTooltip: this.options.showTooltip,
              formatTooltip: this.options.formatTooltip,
              tooltipDelay: this.options.tooltipDelay
            }),
            axis: axis,
            parents: this.createNode(nodeData.parents, axis - 1),
            children: this.createNode(nodeData.children, axis + 1)
          };
          this.nodes.push(node);
          return node;
        }
      } // 创建路径

    }, {
      key: "createPaths",
      value: function createPaths() {
        var svg = this.$pathBox = createElement('svg', {
          width: '100%',
          height: '100%',
          xmlns: 'http://www.w3.org/2000/svg',
          'xmlns:xlink': 'http://www.w3.org/1999/xlink'
        }, this.viewport.$el);
        this.$pathGroup = createElement('g', null, svg);
      }
    }, {
      key: "createLabels",
      value: function createLabels() {
        this.$labelContainer = createElement('div', {
          class: 'mind-label-container'
        }, this.viewport.$el);
      } // 设置节点的定位

    }, {
      key: "setPosition",
      value: function setPosition() {
        var _this$options = this.options,
            vw = _this$options.width,
            vh = _this$options.height;
        var rootNode = this.nodeTree.node;

        var _rootNode$getSize = rootNode.getSize(),
            rootW = _rootNode$getSize.width,
            rootH = _rootNode$getSize.height;

        var centerPosX = vw / 2;
        var centerPosY = vh / 2;
        rootNode.setPosition(centerPosX - rootW / 2, centerPosY - rootH / 2);
        this.setNodePosition(this.nodeTree.parents, 'left', centerPosY);
        this.setNodePosition(this.nodeTree.children, 'right', centerPosY);
      } // 计算并设置各个节点的定位

    }, {
      key: "setNodePosition",
      value: function setNodePosition(nodeObjList, structure, centerPosY) {
        var _this3 = this;

        var _this$options2 = this.options,
            vw = _this$options2.width,
            flowRootMargin = _this$options2.flowRootMargin,
            flowNodeMarginW = _this$options2.flowNodeMarginW,
            flowNodeMarginH = _this$options2.flowNodeMarginH;
        if (!nodeObjList || !nodeObjList.length) return;
        var centerPosX = vw / 2;
        var totalLeaf = nodeObjList.reduce(function (total, nodeObj) {
          return nodeObj.leaf + total;
        }, 0);
        var leafs = 0;
        nodeObjList.forEach(function (nodeObj) {
          var _this3$nodeTree$node$ = _this3.nodeTree.node.getSize(),
              rootW = _this3$nodeTree$node$.width;

          var _nodeObj$node$getSize = nodeObj.node.getSize(),
              width = _nodeObj$node$getSize.width,
              height = _nodeObj$node$getSize.height;

          var subNodeObjList = structure === 'left' ? nodeObj.parents : nodeObj.children;
          var posX;
          var posY = centerPosY - (totalLeaf / 2 - nodeObj.leaf / 2 - leafs) * flowNodeMarginH - height / 2;

          if (structure === 'left') {
            posX = centerPosX - ((Math.abs(nodeObj.axis) - 1) * flowNodeMarginW + flowRootMargin + width / 2) - rootW / 2;
          } else {
            posX = centerPosX + ((Math.abs(nodeObj.axis) - 1) * flowNodeMarginW + flowRootMargin - width / 2) + rootW / 2;
          }

          nodeObj.node.setPosition(posX, posY);
          leafs += nodeObj.leaf;

          _this3.setNodePosition(subNodeObjList, structure, posY + height / 2);
        });
      } // 创建连接关系

    }, {
      key: "createConnections",
      value: function createConnections(nodeObj) {
        var _this4 = this;

        var children = nodeObj.children,
            parents = nodeObj.parents;
        var nodeBound = this.getNodeBound(nodeObj);
        children && children.forEach(function (subNodeObj) {
          var connectionLabel = subNodeObj.node.options.data.connectionLabel;

          var subNodeBound = _this4.getNodeBound(subNodeObj);

          _this4.drawLink(nodeBound, subNodeBound, connectionLabel);

          _this4.createConnections(subNodeObj);
        });
        parents && parents.forEach(function (subNodeObj) {
          var connectionLabel = nodeObj.node.options.data.connectionLabel;

          var subNodeBound = _this4.getNodeBound(subNodeObj);

          _this4.drawLink(subNodeBound, nodeBound, connectionLabel);

          _this4.createConnections(subNodeObj);
        });
      } // 绘制箭头连线

    }, {
      key: "drawLink",
      value: function drawLink(parentBound, childBound, label) {
        var _this$options3 = this.options,
            linkLineStyle = _this$options3.linkLineStyle,
            showConnectionLabel = _this$options3.showConnectionLabel;
        var from = [parentBound.left + parentBound.width, parentBound.top + parentBound.height / 2];
        var to = [childBound.left, childBound.top + childBound.height / 2];
        var line = new LinkLine(from, to, linkLineStyle);
        this.$pathGroup.appendChild(line.$path);

        if (showConnectionLabel && label) {
          this.drawLabel(parentBound, childBound, label);
        }
      }
    }, {
      key: "drawLabel",
      value: function drawLabel(parentBound, childBound, label) {
        var posX = (parentBound.left + parentBound.width + childBound.left) / 2;
        var posY = (parentBound.top + parentBound.height / 2 + childBound.top + childBound.height / 2) / 2;
        var $label = createElement('div', {
          class: 'mind-label'
        }, this.$labelContainer);
        $label.innerText = label;

        var _$label$getBoundingCl = $label.getBoundingClientRect(),
            width = _$label$getBoundingCl.width,
            height = _$label$getBoundingCl.height;

        setElementStyle($label, {
          left: posX - width / 2,
          top: posY - height / 2
        });
      }
    }, {
      key: "initEvents",
      value: function initEvents() {
        Gator(doc$4).on('click.node', '.mind-node', this.onNodeClick.bind(this));
      } // 节点点击事件

    }, {
      key: "onNodeClick",
      value: function onNodeClick(e) {
        var onNodeClick = this.options.onNodeClick;
        var $node = e.target;

        while (!hasClass($node, 'mind-node')) {
          $node = $node.parentNode;
        }

        var node = this.getNodeByElement($node);

        if (node && onNodeClick) {
          onNodeClick(node.options.data, node);
        }
      } // 获取节点位置和尺寸信息

    }, {
      key: "getNodeBound",
      value: function getNodeBound(nodeObj) {
        var node = nodeObj.node;

        var _node$getSize = node.getSize(),
            width = _node$getSize.width,
            height = _node$getSize.height;

        var _node$$el$style = node.$el.style,
            left = _node$$el$style.left,
            top = _node$$el$style.top;
        return {
          width: width,
          height: height,
          left: parseInt(left, 10),
          top: parseInt(top, 10)
        };
      } // 根据dom获取节点

    }, {
      key: "getNodeByElement",
      value: function getNodeByElement(el) {
        var nodeObj = this.nodes.find(function (_ref2) {
          var node = _ref2.node;
          return node.$el === el;
        });
        return nodeObj && nodeObj.node;
      }
    }]);

    return FlowMind;
  }(Mind);

  Mind.Org = OrgMind;
  Mind.Flow = FlowMind;
  Mind.defaults = options;

  return Mind;

}));
