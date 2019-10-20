import { BACKEND_URL } from '../../constants';

export function createApiUrl(route: string): string {
  return `${BACKEND_URL}${route}`
};
