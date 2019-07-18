import { _Vue, RouterOptions } from './install';
import { ensureInstalled, createIndexRoute, isSamePath } from './utils';
import { resolveQuery } from './utils/resolve';

export type RouteParams = Record<string, string | void>;
export type RouteQuery = Record<string, string | string[] | void>;

export type Route = {
  path: string;
  data?: any;
  query: RouteQuery;
  params: RouteParams;
};
export type Router = {
  stack: Route[];
  base: string;
  current: Route;
}
export let router: Router;

export function init(opts: RouterOptions) {
  const base = opts.base || '/';
  const start = createIndexRoute(base.replace(/\/$/, '') + window.location.pathname);
  router = _Vue.observable({
    stack: [start],
    current: start,
    base,
  });
  window.addEventListener('popstate', () => {
    const target = router.stack.find(route => isSamePath(route.path, window.location.pathname));
    if (target) {
      router.current = target;
    } else {
      // push a base route
      router.current = createIndexRoute(router.base);
      router.stack.push(router.current);
    }
  });
}

function routeTo(path: string, data: any) {
  if (isSamePath(path, router.current.path)) {
    return false;
  }
  let route = router.stack.find(route => isSamePath(route.path, path));
  if (route) {
    // There is no record with the same name in history,
    // so shouldn't push a new route into stack.
    route.query = resolveQuery(path);
    router.current = route;
  } else {
    route = {
      data, path, query: resolveQuery(path), params: {},
    };
    router.stack.push(route);
    router.current = route;
  }
  return true;
}

export function push(path: string, data?: any) {
  ensureInstalled();
  const result = routeTo(path, data);
  if (result) {
    window.history.pushState({ rid: Date.now() + Math.random().toFixed(5) }, '', router.base.replace(/\/$/, '') + path);
  }
}

export function replace(path: string, data?: any) {
  ensureInstalled();
  const result = routeTo(path, data);
  if (result) {
    window.history.replaceState({ rid: Date.now() + Math.random().toFixed(5) }, '', router.base.replace(/\/$/, '') + path);
  }
}

export function back() {
  ensureInstalled();
  const currentIndex = router.stack.indexOf(router.current);
  const prev = router.stack[currentIndex - 1];
  if (prev) {
    console.log('prev exist and currentIndex = ' + (currentIndex - 1));
    router.current = prev;
    window.history.back();
  } else {
    console.log('currentIndex = ' + currentIndex);
  }
  console.log(router.stack)
}

export function forward() {
  ensureInstalled();
  const currentIndex = router.stack.indexOf(router.current);
  const next = router.stack[currentIndex + 1];
  if (next) {
    console.log('next exist and currentIndex = ' + (currentIndex + 1));
    router.current = next;
    window.history.forward();
  } else {
    console.log('currentIndex = ' + currentIndex);
  }
  console.log(router.stack)
}
