import Vue from 'vue';
import { RouteParams, RouteQuery } from '../route';
import { ZrElse } from '../components/else';
import { ZrElseIf } from '../components/else-if';
import { ZrIf } from '../components/if';
import { isZrIf, isZrElse, isZrElseIf } from './type-check';

export function resolveParams(template: string, path: string) {
  const tmpTokens = template.split('/').filter(Boolean);
  const pathTokens = path.split('/').filter(Boolean);
  const params: RouteParams = {};
  for (const [index, tmpToken] of tmpTokens.entries()) {
    const pathToken = pathTokens[index];
    if (tmpToken.startsWith(':')) {
      params[tmpToken.slice(1)] = pathToken;
    }
  }
  return params;
}

export function resolveQuery(path: string) {
  const query: RouteQuery = {};
  const qs = path.split('?')[1] || '';
  for (const token of qs.split('&')) {
    const [key, value] = token.split('=');
    if (key) {
      const prev = query[key];
      if (typeof prev === 'string') {
        query[key] = [prev, value];
      } else if (typeof prev === 'undefined') {
        query[key] = value;
      } else {
        prev.push(value);
      }
    }
  }
  return query;
}

export function resolvePrevIf(comp: ZrElseIf | ZrElse) {
  let prevIfIndex: number = -1;
  const { get } = Reflect;
  const selfIndex = comp.$parent.$children.findIndex(sibling => get(sibling, 'zrid') === comp.zrid);
  let siblings: Array<ZrIf | ZrElseIf> = [];
  for (let i = selfIndex - 1; i > -1; i--) {
    const sibling = comp.$parent.$children[i];
    if (isZrIf(sibling)) {
      prevIfIndex = i;
      break;
    } else if (isZrElse(sibling)) {
      break;
    }
  }
  if (prevIfIndex !== -1) {
    siblings = comp.$parent.$children.slice(prevIfIndex, selfIndex) as Array<ZrElseIf | ZrIf>;
  }
  return siblings;
}
