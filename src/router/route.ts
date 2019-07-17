import { _Vue, RouterOptions } from './install';
import { ensureInstalled, createIndexRoute, isSamePath } from './utils';

export type Route = {
  path: string;
  data?: any;
  query: Record<string, string | string[] | void>;
  params: Record<string, string | void>;
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
export function push(path: string, data: any) {
  ensureInstalled();
  if (isSamePath(path, router.current.path)) {
    return;
  }
  const route = {
    data, path, query: {}, params: {},
  };
  router.stack.push(route);
  router.current = route;
  window.history.pushState(data, '', path);
}
export function replace(path: string, data: any) {
  ensureInstalled();
  if (isSamePath(path, router.current.path)) {
    return;
  }
  const route = {
    data, path, query: {}, params:{},
  };
  router.stack[router.stack.length - 1] = route;
  router.current = route;
  window.history.replaceState(data, '', path);
}
export function back() {
  ensureInstalled();
  router.current = router.stack[router.stack.length - 2];
  window.history.back();
}
export function forward() {
  ensureInstalled();
  const index = router.stack.indexOf(router.current);
  if (index >= 0) {
    const next = router.stack[index + 1];
    if (next) {
      router.current = next;
      window.history.forward();
    }
  }
}
