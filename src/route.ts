import { _Vue, RouterOptions } from './install';
import { ensureInstalled, createIndexRoute, isSamePath, createEmptyRoute, callHooks } from './utils';
import { resolveQuery } from './utils/resolve';

export type RouteParams = Record<string, string | void>;
export type RouteQuery = Record<string, string | string[] | void>;

export type Route = {
  path: string;
  data?: any;
  query: RouteQuery;
  params: RouteParams;
};
export type RouterHook = (to: Route, from?: Route) => any;
export type Router = {
  stack: Route[];
  base: string;
  current: Route;
  hooks: {
    before: RouterHook[];
    after: RouterHook[];
  };
}
export function useBefore(cb: RouterHook) {
  if (!router.hooks.before.includes(cb)) {
    router.hooks.before.push(cb);
  }
}
export function useAfter(cb: RouterHook) {
  if (!router.hooks.after.includes(cb)) {
    router.hooks.after.push(cb);
  }
}
export const router: Router = _Vue.observable<Router>({
  stack: [],
  current: createEmptyRoute(),
  base: '',
  hooks: {
    before: [],
    after: [],
  },
});;

export function init(opts: RouterOptions) {
  const base = opts.base || '';
  router.base = base;
  push(window.location.pathname);
  window.addEventListener('popstate', () => {
    const target = router.stack.find(route => isSamePath(route.path, window.location.pathname));
    let to: Route;
    let from: Route;
    if (target) {
      to = target;
      from = router.current;
      callHooks('before', to, from);
      router.current = to;
    } else {
      to = createIndexRoute(router.base + '/');
      from = router.current;
      callHooks('before', to, from);
      // push a base route
      router.current = to;
      router.stack.push(router.current);
    }
    _Vue.nextTick(() => callHooks('after', target));
  });
}
function fixPath(path: string) {
  return router.base + path;
}
function routeTo(path: string, data: any) {
  if (isSamePath(path, router.current.path)) {
    return false;
  }
  let route = router.stack.find(route => isSamePath(route.path, path));
  let from: Route;
  let to: Route;
  if (route) {
    // There is no record with the same name in history,
    // so shouldn't push a new route into stack.
    to = route;
    from = router.current;
    callHooks('before', to, from);
    route.query = resolveQuery(path);
    router.current = route;
  } else {
    route = {
      data, path, query: resolveQuery(path), params: {},
    };
    to = route;
    from = router.current;
    callHooks('before', to, from);
    router.stack.push(route);
    router.current = route;
  }
  _Vue.nextTick(() => callHooks('after', to, from));
  return true;
}

export function push(path: string, data?: any) {
  ensureInstalled();
  path = fixPath(path);
  const result = routeTo(path, data);
  if (result) {
    window.history.pushState({ rid: Date.now() + Math.random().toFixed(5) }, '', path);
  }
}

export function replace(path: string, data?: any) {
  ensureInstalled();
  path = fixPath(path);
  const result = routeTo(path, data);
  if (result) {
    window.history.replaceState({ rid: Date.now() + Math.random().toFixed(5) }, '', path);
  }
}

export function back() {
  ensureInstalled();
  const currentIndex = router.stack.indexOf(router.current);
  const prev = router.stack[currentIndex - 1];
  callHooks('before', prev, router.current);
  _Vue.nextTick(() => callHooks('after', prev, router.current));
  if (prev) {
    router.current = prev;
    window.history.back();
  }
}

export function forward() {
  ensureInstalled();
  const currentIndex = router.stack.indexOf(router.current);
  const next = router.stack[currentIndex + 1];
  callHooks('before', next, router.current);
  _Vue.nextTick(() => callHooks('after', next, router.current));
  if (next) {
    router.current = next;
    window.history.forward();
  }
}
