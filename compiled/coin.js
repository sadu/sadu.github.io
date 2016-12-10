/******/
(function (modules) { // webpackBootstrap
    /******/ 	// The module cache
    /******/
    var installedModules = {};
    /******/
    /******/ 	// The require function
    /******/
    function __webpack_require__(moduleId) {
        /******/
        /******/ 		// Check if module is in cache
        /******/
        if (installedModules[moduleId])
        /******/            return installedModules[moduleId].exports;
        /******/
        /******/ 		// Create a new module (and put it into the cache)
        /******/
        var module = installedModules[moduleId] = {
            /******/            exports: {},
            /******/            id: moduleId,
            /******/            loaded: false
            /******/
        };
        /******/
        /******/ 		// Execute the module function
        /******/
        modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
        /******/
        /******/ 		// Flag the module as loaded
        /******/
        module.loaded = true;
        /******/
        /******/ 		// Return the exports of the module
        /******/
        return module.exports;
        /******/
    }

    /******/
    /******/
    /******/ 	// expose the modules object (__webpack_modules__)
    /******/
    __webpack_require__.m = modules;
    /******/
    /******/ 	// expose the module cache
    /******/
    __webpack_require__.c = installedModules;
    /******/
    /******/ 	// __webpack_public_path__
    /******/
    __webpack_require__.p = "";
    /******/
    /******/ 	// Load entry module and return exports
    /******/
    return __webpack_require__(0);
    /******/
})
/************************************************************************/
/******/([
    /* 0 */
    /***/ function (module, exports, __webpack_require__) {

        'use strict';

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        var _EventChain2 = __webpack_require__(1);

        var _EasyAPI = __webpack_require__(2);

        var _config = __webpack_require__(3);

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function _possibleConstructorReturn(self, call) {
            if (!self) {
                throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
            }
            return call && (typeof call === "object" || typeof call === "function") ? call : self;
        }

        function _inherits(subClass, superClass) {
            if (typeof superClass !== "function" && superClass !== null) {
                throw new TypeError("Super expression must either be null or a function, not " + typeof superClass);
            }
            subClass.prototype = Object.create(superClass && superClass.prototype, {
                constructor: {
                    value: subClass,
                    enumerable: false,
                    writable: true,
                    configurable: true
                }
            });
            if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
        }

        var CoinApp = function (_EventChain) {
            _inherits(CoinApp, _EventChain);

            function CoinApp(config) {
                _classCallCheck(this, CoinApp);

                var _this = _possibleConstructorReturn(this, (CoinApp.__proto__ || Object.getPrototypeOf(CoinApp)).call(this));

                _this.API = new _EasyAPI.EasyAPI(config.APIConfig);
                _this.templates = {};

                _this._renderTarget = null;
                _this._config = config;
                return _this;
            }

            _createClass(CoinApp, [{
                key: 'useTemplates',
                value: function useTemplates() {
                    var _this2 = this;

                    var templates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : this._config.templates;

                    templates.forEach(function (templateName) {
                        var container = document.createElement('div');
                        _this2.templates[templateName] = container;
                        _this2.API.templates({
                            URLSuffix: templateName + ".html"
                        }).then(function (templateSource) {
                            container.innerHTML = templateSource;
                        });
                    });
                    return this;
                }
            }]);

            return CoinApp;
        }(_EventChain2.EventChain);

        window.app = new CoinApp(_config.config);
        app.useTemplates();
        document.body.appendChild(app.templates.header);

        /***/
    },
    /* 1 */
    /***/ function (module, exports) {

        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        var EventChain = exports.EventChain = function () {
            function EventChain() {
                _classCallCheck(this, EventChain);

                this.queue = {};
            }

            _createClass(EventChain, [{
                key: "on",
                value: function on(eventName, callback) {
                    if (!this.queue[eventName]) {
                        this.queue[eventName] = new Set();
                    }
                    this.queue[eventName].add(callback);
                }
            }, {
                key: "off",
                value: function off(eventName, callback) {
                    callback && this.queue[eventName].delete(callback);
                }
            }, {
                key: "fire",
                value: function fire(eventName, data) {
                    var endCallback = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

                    var preventBubbles = false;
                    if (this.queue[eventName]) {
                        this.queue[eventName].forEach(function (callback) {
                            if (!preventBubbles) {
                                preventBubbles = callback(data);
                            }
                        });
                    }
                    endCallback && endCallback(data);
                }
            }]);

            return EventChain;
        }();

        /***/
    },
    /* 2 */
    /***/ function (module, exports) {

        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });

        var _createClass = function () {
            function defineProperties(target, props) {
                for (var i = 0; i < props.length; i++) {
                    var descriptor = props[i];
                    descriptor.enumerable = descriptor.enumerable || false;
                    descriptor.configurable = true;
                    if ("value" in descriptor) descriptor.writable = true;
                    Object.defineProperty(target, descriptor.key, descriptor);
                }
            }

            return function (Constructor, protoProps, staticProps) {
                if (protoProps) defineProperties(Constructor.prototype, protoProps);
                if (staticProps) defineProperties(Constructor, staticProps);
                return Constructor;
            };
        }();

        function _classCallCheck(instance, Constructor) {
            if (!(instance instanceof Constructor)) {
                throw new TypeError("Cannot call a class as a function");
            }
        }

        function defineAPI(_ref) {
            var _ref$type = _ref.type,
                type = _ref$type === undefined ? "GET" : _ref$type,
                url = _ref.url;

            return function (options) {
                'use strict';

                var data = options.data,
                    _options$URLSuffix = options.URLSuffix,
                    URLSuffix = _options$URLSuffix === undefined ? "" : _options$URLSuffix;

                var xhr = new XMLHttpRequest();
                return new Promise(function (resolve, reject) {
                    xhr.onreadystatechange = function () {
                        if (xhr.readyState === 4) {
                            if (xhr.status === 200) {
                                resolve(xhr.responseText);
                            } else {
                                reject(xhr.responseText);
                            }
                        }
                    };
                    xhr.open(type, url + URLSuffix);
                    xhr.send(data);
                });
            };
        }

        var EasyAPI = exports.EasyAPI = function () {
            function EasyAPI() {
                var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;

                _classCallCheck(this, EasyAPI);

                this.baseUrl = window.location.origin;
                config && this._DEFINE_(config);
            }

            _createClass(EasyAPI, [{
                key: "_DEFINE_",
                value: function _DEFINE_() {
                    var config = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

                    var _traverse = function _traverse(handles, urlPrefix, target) {
                        Object.keys(handles).forEach(function (handle) {
                            var _handles$handle = handles[handle],
                                type = _handles$handle.type,
                                _handles$handle$url = _handles$handle.url,
                                url = _handles$handle$url === undefined ? urlPrefix + "/" + handle : _handles$handle$url,
                                _handles$handle$child = _handles$handle.children,
                                children = _handles$handle$child === undefined ? false : _handles$handle$child;

                            target[handle] = defineAPI({
                                type: type,
                                url: url
                            });
                            children && _traverse(children, url, target[handle]);
                        });
                    };
                    _traverse(config, this.baseUrl, this);
                }
            }, {
                key: "root",
                get: function get() {
                    return this[''] ? this[''] : function () {
                        return new Promise().reject();
                    };
                }
            }]);

            return EasyAPI;
        }();

        /***/
    },
    /* 3 */
    /***/ function (module, exports) {

        "use strict";

        Object.defineProperty(exports, "__esModule", {
            value: true
        });
        var config = exports.config = {};

        config.APIConfig = {
            templates: {
                url: '/src/html/'
            }
        };

        config.templates = ["header"];

        /***/
    }
    /******/]);
//# sourceMappingURL=coin.js.map