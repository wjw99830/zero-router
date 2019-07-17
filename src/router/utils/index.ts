import { _Vue } from '../install';
import { Route } from '../route';

export function ensureInstalled() {
  if (!_Vue) {
    throw new Error('Please install router before push.');
  }
}
export function createIndexRoute(base: string): Route {
  return {
    path: base,
    query: {},
    params: {},
  };
}
export function isSamePath(p1: string, p2: string) {
  const tokens1 = p1.split('?')[0].split('/');
  const tokens2 = p2.split('?')[0].split('/');
  for (const [index, token1] of tokens1.entries()) {
    const token2 = tokens2[index];
    if (token1.startsWith(':') || token2.startsWith(':')) {
      continue;
    } else if (token1 !== token2) {
      return false;
    }
  }
  return true;
}
export function resolveParams(template: string, path: string) {

}
