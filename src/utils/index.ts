import { _Vue } from '../install';
import { Route } from '../route';
import { resolveQuery } from './resolve';

export function ensureInstalled() {
  if (!_Vue) {
    throw new Error('Please install router before push.');
  }
}
export function createIndexRoute(base: string): Route {
  return {
    path: base,
    query: resolveQuery(base),
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
  let regSource = template.replace(/(?<start>\/)(?<param>:[^\/\?]+)(?<end>\/?)/, '$1[^/?]+$3');
  if (!template.startsWith('^') && !template.endsWith('$')) {
    regSource = '^' + regSource + '$';
  }
  const templateReg = new RegExp(regSource);
  return templateReg.test(path);
}

