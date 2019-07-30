(function (global, factory) {
    typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
    typeof define === 'function' && define.amd ? define(['exports'], factory) :
    (global = global || self, factory(global.ZR = {}));
}(this, function (exports) { 'use strict';

    /*! *****************************************************************************
    Copyright (c) Microsoft Corporation. All rights reserved.
    Licensed under the Apache License, Version 2.0 (the "License"); you may not use
    this file except in compliance with the License. You may obtain a copy of the
    License at http://www.apache.org/licenses/LICENSE-2.0

    THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
    KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
    WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
    MERCHANTABLITY OR NON-INFRINGEMENT.

    See the Apache Version 2.0 License for specific language governing permissions
    and limitations under the License.
    ***************************************************************************** */

    function __values(o) {
        var m = typeof Symbol === "function" && o[Symbol.iterator], i = 0;
        if (m) return m.call(o);
        return {
            next: function () {
                if (o && i >= o.length) o = void 0;
                return { value: o && o[i++], done: !o };
            }
        };
    }

    function __read(o, n) {
        var m = typeof Symbol === "function" && o[Symbol.iterator];
        if (!m) return o;
        var i = m.call(o), r, ar = [], e;
        try {
            while ((n === void 0 || n-- > 0) && !(r = i.next()).done) ar.push(r.value);
        }
        catch (error) { e = { error: error }; }
        finally {
            try {
                if (r && !r.done && (m = i["return"])) m.call(i);
            }
            finally { if (e) throw e.error; }
        }
        return ar;
    }

    function isZrIf(comp) {
        return comp.$options.name === 'zr-if';
    }
    function isZrElse(comp) {
        return comp.$options.name === 'zr-else';
    }

    function resolveParams(template, path) {
        var regSource = template.replace(/(?<start>\/):(?<param>[^\/\?]+)(?<end>\/?)/g, '$1(?<$2>[^/?]+)$3');
        var matchArray = path.match(new RegExp(regSource));
        var params = matchArray ? (matchArray.groups || {}) : {};
        return params;
    }
    function resolveQuery(path) {
        var e_1, _a;
        var query = {};
        var qs = path.split('?')[1] || '';
        try {
            for (var _b = __values(qs.split('&')), _c = _b.next(); !_c.done; _c = _b.next()) {
                var token = _c.value;
                var _d = __read(token.split('='), 2), key = _d[0], value = _d[1];
                if (key) {
                    var prev = query[key];
                    if (typeof prev === 'string') {
                        query[key] = [prev, value];
                    }
                    else if (typeof prev === 'undefined') {
                        query[key] = value;
                    }
                    else {
                        prev.push(value);
                    }
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return query;
    }
    function resolvePrevIf(comp) {
        var prevIfIndex = -1;
        var get = Reflect.get;
        var selfIndex = comp.$parent.$children.findIndex(function (sibling) { return get(sibling, 'zrid') === comp.zrid; });
        var siblings = [];
        for (var i = selfIndex - 1; i > -1; i--) {
            var sibling = comp.$parent.$children[i];
            if (isZrIf(sibling)) {
                prevIfIndex = i;
                break;
            }
            else if (isZrElse(sibling)) {
                break;
            }
        }
        if (prevIfIndex !== -1) {
            siblings = comp.$parent.$children.slice(prevIfIndex, selfIndex);
        }
        return siblings;
    }

    function ensureInstalled() {
        if (!_Vue) {
            throw new Error('Please install router before push.');
        }
    }
    function createIndexRoute(base) {
        return {
            path: base,
            query: resolveQuery(base),
            params: {},
        };
    }
    function isSamePath(p1, p2) {
        var e_1, _a;
        var tokens1 = p1.split('?')[0].split('/').filter(Boolean);
        var tokens2 = p2.split('?')[0].split('/').filter(Boolean);
        if (tokens1.length !== tokens2.length) {
            return false;
        }
        try {
            for (var _b = __values(tokens1.entries()), _c = _b.next(); !_c.done; _c = _b.next()) {
                var _d = __read(_c.value, 2), index = _d[0], token1 = _d[1];
                var token2 = tokens2[index];
                if (token1.startsWith(':') || token2.startsWith(':')) {
                    continue;
                }
                else if (token1 !== token2) {
                    return false;
                }
            }
        }
        catch (e_1_1) { e_1 = { error: e_1_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_1) throw e_1.error; }
        }
        return true;
    }
    function match(template, path) {
        var regSource = template.replace(/(?<start>\/)(?<param>:[^\/\?]+)(?<end>\/?)/, '$1[^/?]+$3');
        if (!template.startsWith('^') && !template.endsWith('$')) {
            regSource = '^' + regSource + '$';
        }
        var templateReg = new RegExp(regSource);
        return templateReg.test(path);
    }
    function callHooks(hookName, to, from) {
        var e_2, _a;
        try {
            for (var _b = __values(router.hooks[hookName]), _c = _b.next(); !_c.done; _c = _b.next()) {
                var hook = _c.value;
                hook(to, from);
            }
        }
        catch (e_2_1) { e_2 = { error: e_2_1 }; }
        finally {
            try {
                if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
            }
            finally { if (e_2) throw e_2.error; }
        }
    }
    function createEmptyRoute() {
        return {
            path: '',
            query: {},
            params: {}
        };
    }

    function useBefore(cb) {
        if (!router.hooks.before.includes(cb)) {
            router.hooks.before.push(cb);
        }
    }
    function useAfter(cb) {
        if (!router.hooks.after.includes(cb)) {
            router.hooks.after.push(cb);
        }
    }
    var router = _Vue.observable({
        stack: [],
        current: createEmptyRoute(),
        base: '',
        hooks: {
            before: [],
            after: [],
        },
    });
    function init(opts) {
        var base = opts.base || '';
        router.base = base;
        push(window.location.pathname);
        window.addEventListener('popstate', function () {
            var target = router.stack.find(function (route) { return isSamePath(route.path, window.location.pathname); });
            var to;
            var from;
            if (target) {
                to = target;
                from = router.current;
                callHooks('before', to, from);
                router.current = to;
            }
            else {
                to = createIndexRoute(router.base + '/');
                from = router.current;
                callHooks('before', to, from);
                // push a base route
                router.current = to;
                router.stack.push(router.current);
            }
            _Vue.nextTick(function () { return callHooks('after', target); });
        });
    }
    function fixPath(path) {
        return router.base + path;
    }
    function routeTo(path, data) {
        if (isSamePath(path, router.current.path)) {
            return false;
        }
        var route = router.stack.find(function (route) { return isSamePath(route.path, path); });
        var from;
        var to;
        if (route) {
            // There is no record with the same name in history,
            // so shouldn't push a new route into stack.
            to = route;
            from = router.current;
            callHooks('before', to, from);
            route.query = resolveQuery(path);
            router.current = route;
        }
        else {
            route = {
                data: data, path: path, query: resolveQuery(path), params: {},
            };
            to = route;
            from = router.current;
            callHooks('before', to, from);
            router.stack.push(route);
            router.current = route;
        }
        _Vue.nextTick(function () { return callHooks('after', to, from); });
        return true;
    }
    function push(path, data) {
        ensureInstalled();
        path = fixPath(path);
        var result = routeTo(path, data);
        if (result) {
            window.history.pushState({ rid: Date.now() + Math.random().toFixed(5) }, '', path);
        }
    }
    function replace(path, data) {
        ensureInstalled();
        path = fixPath(path);
        var result = routeTo(path, data);
        if (result) {
            window.history.replaceState({ rid: Date.now() + Math.random().toFixed(5) }, '', path);
        }
    }
    function back() {
        ensureInstalled();
        var currentIndex = router.stack.indexOf(router.current);
        var prev = router.stack[currentIndex - 1];
        callHooks('before', prev, router.current);
        _Vue.nextTick(function () { return callHooks('after', prev, router.current); });
        if (prev) {
            router.current = prev;
            window.history.back();
        }
    }
    function forward() {
        ensureInstalled();
        var currentIndex = router.stack.indexOf(router.current);
        var next = router.stack[currentIndex + 1];
        callHooks('before', next, router.current);
        _Vue.nextTick(function () { return callHooks('after', next, router.current); });
        if (next) {
            router.current = next;
            window.history.forward();
        }
    }

    var zrid = 0;
    function getZrIDAndIncrement() {
        return zrid++;
    }

    var ZrIf = {
        name: 'zr-if',
        provide: function () {
            return {
                parentPath: this.parentPath + this.path,
            };
        },
        inject: {
            parentPath: {
                default: '',
            },
        },
        props: {
            path: {
                required: true,
                type: String,
            },
            component: {
                type: [Object, String, Function],
                required: true,
            },
            keepAlive: Boolean,
        },
        data: function () {
            return {
                matched: true,
                zrid: getZrIDAndIncrement(),
            };
        },
        render: function (h) {
            var vnode = undefined;
            var template = this.parentPath ? (this.parentPath + '/' + this.path) : this.path;
            var currentPath = router.current.path.replace(router.base, '');
            this.matched = false;
            if (match(template, currentPath)) {
                this.matched = true;
                router.current.params = resolveParams(template, currentPath);
                vnode = h(this.component, {
                    props: {
                        route: router.current,
                    },
                });
            }
            return vnode;
        },
    };

    var ZrElseIf = {
        name: 'zr-else-if',
        provide: function () {
            return {
                parentPath: this.parentPath + this.path,
            };
        },
        inject: {
            parentPath: {
                default: '',
            },
        },
        props: {
            path: {
                required: true,
                type: String,
            },
            component: {
                type: [Object, String, Function],
                required: true,
            },
            keepAlive: Boolean,
        },
        data: function () {
            return {
                matched: true,
                zrid: getZrIDAndIncrement(),
            };
        },
        render: function (h) {
            this.matched = false;
            var vnode = undefined;
            var template = this.parentPath ? (this.parentPath + '/' + this.path) : this.path;
            var currentPath = router.current.path.replace(router.base, '');
            var prevSiblings = resolvePrevIf(this);
            if (!prevSiblings.length) {
                console.error("\n        In <zr-else-if>: path = " + this.path + ", component = " + this.component + ".\n        Use <zr-else-if> after at least one <zr-if>.\n      ");
            }
            else if (prevSiblings.every(function (prevSibling) { return !prevSibling.matched; }) && match(template, currentPath)) {
                this.matched = true;
                router.current.params = resolveParams(template, currentPath);
                vnode = h(this.component, {
                    props: {
                        route: router.current,
                    },
                });
            }
            return vnode;
        },
    };

    var ZrElse = {
        name: 'zr-else',
        inject: {
            parentPath: {
                default: '',
            },
        },
        props: {
            component: {
                type: [Object, String, Function],
                required: true,
            },
            keepAlive: Boolean,
        },
        data: function () {
            return {
                zrid: getZrIDAndIncrement(),
            };
        },
        render: function (h) {
            var vnode = undefined;
            var prevSiblings = resolvePrevIf(this);
            if (!prevSiblings.length) {
                console.error("\n        In <zr-else>: component = " + this.component + ".\n        Use <zr-else> after at least one <zr-if>.\n      ");
            }
            else if (prevSiblings.every(function (prevSibling) { return !prevSibling.matched; })) {
                vnode = h(this.component, {
                    props: {
                        route: router.current,
                    },
                });
            }
            return vnode;
        },
    };

    var ZrLink = {
        props: {
            to: String,
            replace: Boolean,
        },
        render: function (h) {
            var _this = this;
            return h('a', {
                on: {
                    click: function (e) {
                        e.preventDefault();
                        if (_this.replace) {
                            replace(_this.to);
                        }
                        else {
                            push(_this.to);
                        }
                    },
                },
            }, this.$slots.default);
        },
    };

    var _Vue;
    function install(vue, opts) {
        if (opts === void 0) { opts = {}; }
        _Vue = vue;
        _Vue.component('zr-if', ZrIf);
        _Vue.component('zr-else-if', ZrElseIf);
        _Vue.component('zr-else', ZrElse);
        _Vue.component('zr-link', ZrLink);
        init(opts);
    }

    var main = {
        install: install,
    };

    exports.back = back;
    exports.default = main;
    exports.forward = forward;
    exports.push = push;
    exports.replace = replace;
    exports.useAfter = useAfter;
    exports.useBefore = useBefore;

    Object.defineProperty(exports, '__esModule', { value: true });

}));
