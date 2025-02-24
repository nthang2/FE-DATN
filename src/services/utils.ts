import { BACKEND_URL } from './baseUrl';

export function getApi(path: string, query?: Record<string, unknown>, _url: string | undefined = BACKEND_URL) {
  const s = _url + path;
  let q = '';
  for (const key in query) {
    if (['string', 'number', 'boolean'].includes(typeof query[key])) {
      q += (q === '' ? '?' : '&') + `${key}=${query[key]}`;
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    if (Array.isArray(query[key]) && (query[key] as any).length > 0) {
      q += (q === '' ? '?' : '&') + `${key}=${(query[key] as Array<unknown>).join(',')}`;
    }
  }
  return s + q;
}
