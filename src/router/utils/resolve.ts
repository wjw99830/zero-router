import { RouteParams, RouteQuery } from '../route';

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
