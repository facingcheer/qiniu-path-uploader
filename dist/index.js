'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var Vue = _interopDefault(require('vue'));

var script = Vue.extend({
  data() {
    return {
      bundler: 'Parcel'
    }
  }
});

function normalizeComponent(template, style, script, scopeId, isFunctionalTemplate, moduleIdentifier
/* server only */
, shadowMode, createInjector, createInjectorSSR, createInjectorShadow) {
  if (typeof shadowMode !== 'boolean') {
    createInjectorSSR = createInjector;
    createInjector = shadowMode;
    shadowMode = false;
  } // Vue.extend constructor export interop.


  var options = typeof script === 'function' ? script.options : script; // render functions

  if (template && template.render) {
    options.render = template.render;
    options.staticRenderFns = template.staticRenderFns;
    options._compiled = true; // functional template

    if (isFunctionalTemplate) {
      options.functional = true;
    }
  } // scopedId


  if (scopeId) {
    options._scopeId = scopeId;
  }

  var hook;

  if (moduleIdentifier) {
    // server build
    hook = function hook(context) {
      // 2.3 injection
      context = context || // cached call
      this.$vnode && this.$vnode.ssrContext || // stateful
      this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext; // functional
      // 2.2 with runInNewContext: true

      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__;
      } // inject component styles


      if (style) {
        style.call(this, createInjectorSSR(context));
      } // register component module identifier for async chunk inference


      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier);
      }
    }; // used by ssr in case component is cached and beforeCreate
    // never gets called


    options._ssrRegister = hook;
  } else if (style) {
    hook = shadowMode ? function () {
      style.call(this, createInjectorShadow(this.$root.$options.shadowRoot));
    } : function (context) {
      style.call(this, createInjector(context));
    };
  }

  if (hook) {
    if (options.functional) {
      // register for functional component in vue file
      var originalRender = options.render;

      options.render = function renderWithStyleInjection(h, context) {
        hook.call(context);
        return originalRender(h, context);
      };
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate;
      options.beforeCreate = existing ? [].concat(existing, hook) : [hook];
    }
  }

  return script;
}

var normalizeComponent_1 = normalizeComponent;

var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\\b/.test(navigator.userAgent.toLowerCase());
function createInjector(context) {
  return function (id, style) {
    return addStyle(id, style);
  };
}
var HEAD;
var styles = {};

function addStyle(id, css) {
  var group = isOldIE ? css.media || 'default' : id;
  var style = styles[group] || (styles[group] = {
    ids: new Set(),
    styles: []
  });

  if (!style.ids.has(id)) {
    style.ids.add(id);
    var code = css.source;

    if (css.map) {
      // https://developer.chrome.com/devtools/docs/javascript-debugging
      // this makes source maps inside style tags work properly in Chrome
      code += '\n/*# sourceURL=' + css.map.sources[0] + ' */'; // http://stackoverflow.com/a/26603875

      code += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(css.map)))) + ' */';
    }

    if (!style.element) {
      style.element = document.createElement('style');
      style.element.type = 'text/css';
      if (css.media) style.element.setAttribute('media', css.media);

      if (HEAD === undefined) {
        HEAD = document.head || document.getElementsByTagName('head')[0];
      }

      HEAD.appendChild(style.element);
    }

    if ('styleSheet' in style.element) {
      style.styles.push(code);
      style.element.styleSheet.cssText = style.styles.filter(Boolean).join('\n');
    } else {
      var index = style.ids.size - 1;
      var textNode = document.createTextNode(code);
      var nodes = style.element.childNodes;
      if (nodes[index]) style.element.removeChild(nodes[index]);
      if (nodes.length) style.element.insertBefore(textNode, nodes[index]);else style.element.appendChild(textNode);
    }
  }
}

var browser = createInjector;

/* script */
var __vue_script__ = script;
/* template */

var __vue_render__ = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "container"
  }, [_vm._v("\n   " + _vm._s(_vm.bundler) + "\n")]);
};

var __vue_staticRenderFns__ = [];
__vue_render__._withStripped = true;
/* style */

var __vue_inject_styles__ = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-4bf37331_0", {
    source: ".container[data-v-4bf37331] {\n  color: green;\n}\n\n/*# sourceMappingURL=Foo.vue.map */",
    map: {
      "version": 3,
      "sources": ["/Users/jijinlong/git/fac-pub/vue-rollup-component-template/src/Foo.vue", "Foo.vue"],
      "names": [],
      "mappings": "AAmBA;EACA,YAAA;AClBA;;AAEA,kCAAkC",
      "file": "Foo.vue",
      "sourcesContent": ["<template >\n<div class=\"container\">\n   {{bundler}}\n</div>\n \n</template>\n\n<script lang=\"ts\">\nimport Vue from 'vue'\nexport default Vue.extend({\n  data() {\n    return {\n      bundler: 'Parcel'\n    }\n  }\n})\n</script>\n\n<style lang=\"scss\" scoped>\n.container {\n  color: green;\n}\n</style>", ".container {\n  color: green;\n}\n\n/*# sourceMappingURL=Foo.vue.map */"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__ = "data-v-4bf37331";
/* module identifier */

var __vue_module_identifier__ = undefined;
/* functional template */

var __vue_is_functional_template__ = false;
/* style inject SSR */

var Foo = normalizeComponent_1({
  render: __vue_render__,
  staticRenderFns: __vue_staticRenderFns__
}, __vue_inject_styles__, __vue_script__, __vue_scope_id__, __vue_is_functional_template__, __vue_module_identifier__, browser, undefined);

//
//
//
//
//
//
//
//
//
//
//
//
var script$1 = {
  props: {
    text: {
      type: String
    },
    maxLine: {
      type: Number,
      default: 3
    }
  },
  data: function data() {
    return {
      expanded: false,
      fullHeight: 0,
      foldHeight: 0
    };
  },
  computed: {
    computedHeight: function computedHeight() {
      return this.expanded ? this.fullHeight + 'px' : this.foldHeight ? this.foldHeight + 'px' : '0px';
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.fullHeight = _this.$refs.container.scrollHeight;
      _this.foldHeight = _this.getLineHeight(_this.$refs.container) * _this.maxLine;
    });
  },
  methods: {
    getLineHeight: function getLineHeight(node) {
      var temp = document.createElement('div');
      temp.setAttribute('style', 'margin:0px;padding:0px;font-family:' + node.style.fontFamily + ';font-size:' + node.style.fontSize + ';position:relative: left: -9999px;');
      temp.innerHTML = 'test';
      node.parentNode.appendChild(temp);
      var ret = temp.clientHeight;
      node.parentNode.removeChild(temp);
      return ret;
    }
  }
};

/* script */
var __vue_script__$1 = script$1;
/* template */

var __vue_render__$1 = function __vue_render__() {
  var _vm = this;

  var _h = _vm.$createElement;

  var _c = _vm._self._c || _h;

  return _c("div", {
    staticClass: "toggle"
  }, [_c("div", {
    ref: "container",
    staticClass: "toggle-container",
    style: {
      "line-clamp": _vm.expanded ? "unset" : _vm.maxLine,
      "-webkit-line-clamp": _vm.expanded ? "unset" : _vm.maxLine,
      height: _vm.computedHeight
    }
  }, [_vm._v(_vm._s(_vm.text))]), _vm._v(" "), _c("div", {
    staticClass: "toggle-arrow",
    class: {
      expanded: _vm.expanded
    },
    on: {
      click: function click($event) {
        _vm.expanded = !_vm.expanded;
      }
    }
  }, [_c("svg", {
    attrs: {
      width: "20",
      viewBox: "0 0 2389 1024",
      xmlns: "http://www.w3.org/2000/svg"
    }
  }, [_c("path", {
    attrs: {
      d: "M1758.225 221.552a94.864 94.864 0 01132.748 31.418c13.494 22.252 17.873 49.138 12.12 74.7a98.734 98.734 0 01-42.774 61.613L1192.707 817.52 525.145 389.283a98.734 98.734 0 01-42.824-61.614 101.178 101.178 0 0112.119-74.7 94.864 94.864 0 01132.748-31.417l565.519 362.754 565.518-362.754z"
    }
  })])])]);
};

var __vue_staticRenderFns__$1 = [];
__vue_render__$1._withStripped = true;
/* style */

var __vue_inject_styles__$1 = function __vue_inject_styles__(inject) {
  if (!inject) return;
  inject("data-v-18b450c3_0", {
    source: "\n.toggle-container{\n  display: -webkit-box;\n  /* autoprefixer: off */\n  -webkit-box-orient: vertical;\n  overflow-wrap: break-word;\n  word-break: break-word;\n  overflow: hidden;\n  transition: all .3s;\n}\n.toggle-arrow{\n  text-align: center;\n  transition: all .3s;\n}\n.toggle-arrow svg{\n    transform: rotate(0deg);\n}\n.toggle-arrow.expanded svg{\n  transform: rotate(180deg);\n}\n\n",
    map: {
      "version": 3,
      "sources": ["/Users/jijinlong/git/fac-pub/vue-rollup-component-template/src/ToggleView.vue"],
      "names": [],
      "mappings": ";AAwDA;EACA,oBAAA;EACA,sBAAA;EACA,4BAAA;EACA,yBAAA;EACA,sBAAA;EACA,gBAAA;EACA,mBAAA;AACA;AAEA;EACA,kBAAA;EACA,mBAAA;AACA;AAEA;IACA,uBAAA;AACA;AACA;EACA,yBAAA;AACA",
      "file": "ToggleView.vue",
      "sourcesContent": ["<template>\n  <div class=\"toggle\">\n    <!-- eslint-disable-next-line -->\n    <div ref=\"container\" class=\"toggle-container\" :style=\"{'line-clamp':expanded ? 'unset' : maxLine, '-webkit-line-clamp': expanded ? 'unset' : maxLine,'height': computedHeight}\" >{{ text }}</div>\n    <div :class=\"{'expanded': expanded}\" class=\"toggle-arrow\" @click=\"expanded = !expanded\">\n      <svg width=\"20\" viewBox=\"0 0 2389 1024\" xmlns=\"http://www.w3.org/2000/svg\">\n        <path d=\"M1758.225 221.552a94.864 94.864 0 01132.748 31.418c13.494 22.252 17.873 49.138 12.12 74.7a98.734 98.734 0 01-42.774 61.613L1192.707 817.52 525.145 389.283a98.734 98.734 0 01-42.824-61.614 101.178 101.178 0 0112.119-74.7 94.864 94.864 0 01132.748-31.417l565.519 362.754 565.518-362.754z\" />\n      </svg>\n    </div>\n  </div>\n</template>\n\n<script>\nexport default {\n  props: {\n    text: {\n      type: String\n    },\n    maxLine: {\n      type: Number,\n      default: 3\n    }\n  },\n  data() {\n    return {\n      expanded: false,\n      fullHeight: 0,\n      foldHeight: 0\n    }\n  },\n  computed: {\n    computedHeight() {\n      return this.expanded ? this.fullHeight + 'px' : this.foldHeight ? this.foldHeight + 'px' : '0px'\n    }\n  },\n  mounted() {\n    this.$nextTick(() => {\n      this.fullHeight = this.$refs.container.scrollHeight\n      this.foldHeight = this.getLineHeight(this.$refs.container) * this.maxLine\n    })\n  },\n  methods: {\n    getLineHeight(node) {\n      const temp = document.createElement('div')\n      temp.setAttribute('style', 'margin:0px;padding:0px;font-family:' + node.style.fontFamily + ';font-size:' + node.style.fontSize + ';position:relative: left: -9999px;')\n      temp.innerHTML = 'test'\n      node.parentNode.appendChild(temp)\n      const ret = temp.clientHeight\n      node.parentNode.removeChild(temp)\n      return ret\n    }\n  }\n}\n</script>\n\n<style>\n.toggle-container{\n  display: -webkit-box;\n  /* autoprefixer: off */\n  -webkit-box-orient: vertical;\n  overflow-wrap: break-word;\n  word-break: break-word;\n  overflow: hidden;\n  transition: all .3s;\n}\n\n.toggle-arrow{\n  text-align: center;\n  transition: all .3s;\n}\n\n.toggle-arrow svg{\n    transform: rotate(0deg);\n  }\n.toggle-arrow.expanded svg{\n  transform: rotate(180deg);\n}\n\n</style>\n"]
    },
    media: undefined
  });
};
/* scoped */


var __vue_scope_id__$1 = undefined;
/* module identifier */

var __vue_module_identifier__$1 = undefined;
/* functional template */

var __vue_is_functional_template__$1 = false;
/* style inject SSR */

var ToggleView = normalizeComponent_1({
  render: __vue_render__$1,
  staticRenderFns: __vue_staticRenderFns__$1
}, __vue_inject_styles__$1, __vue_script__$1, __vue_scope_id__$1, __vue_is_functional_template__$1, __vue_module_identifier__$1, browser, undefined);

exports.Foo = Foo;
exports.VToggleView = ToggleView;
