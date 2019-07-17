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
  const tokens1 = p1.split('?')[0].split('/').filter(Boolean);
  const tokens2 = p2.split('?')[0].split('/').filter(Boolean);
  if (tokens1.length !== tokens2.length) {
    return false;
  }
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

export function match(template: string, path: string) {
  const tmpTokens = template.split('/').filter(Boolean);
  const pathTokens = path.split('?')[0].split('/').filter(Boolean);
  for (const [index, tmpToken] of tmpTokens.entries()) {
    const pathToken = pathTokens[index];
    if (tmpToken.startsWith(':')) {
      continue;
    } else if (tmpToken !== pathToken) {
      return false;
    }
  }
  return true;
}
