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
      router.current = createIndexRoute(router.base);
      router.stack.push(router.current);
    }
  });
}

function routeTo(path: string, data: any) {
  if (isSamePath(path, router.current.path)) {
    return;
  }
  const route = {
    data, path, query: resolveQuery(path), params: {},
  };
  router.stack.push(route);
  router.current = route;
}

export function push(path: string, data?: any) {
  ensureInstalled();
  routeTo(path, data);
  window.history.pushState(data, '', path);
}

export function replace(path: string, data?: any) {
  ensureInstalled();
  routeTo(path, data);
  window.history.replaceState(data, '', path);
}

export function back() {
  ensureInstalled();
  const prev = router.stack[router.stack.length - 2];
  if (prev) {
    router.current = prev; 
    window.history.back();
  }
}

export function forward() {
  ensureInstalled();
  const currentIndex = router.stack.indexOf(router.current);
  if (currentIndex >= 0) {
    const next = router.stack[currentIndex + 1];
    if (next) {
      router.current = next;
      window.history.forward();
    }
  }
}
