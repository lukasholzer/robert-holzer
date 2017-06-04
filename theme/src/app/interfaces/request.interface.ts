export interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS';
  headers?: any;
  body?: any;
  mode?: string; // not yet supported
  credentials?: {
    username: string;
    password?: string;
  };
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached'; // not yet supported
  redirect?: 'follow' | 'error' | 'manual'; // not yet supported
  referrer?: string; // not yet supported
  integrity?: string; // not yet supported
}

export interface IRequestResponse {
  response: Object;
}

export interface IRequestOptions {
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'HEAD' | 'OPTIONS',
  headers?: any,
  body?: any,
  mode?: string, // not yet supported
  credentials?: {
    username: string;
    password?: string;
  },
  cache?: 'default' | 'no-store' | 'reload' | 'no-cache' | 'force-cache' | 'only-if-cached', // not yet supported
  redirect?: 'follow' | 'error' | 'manual', // not yet supported
  referrer?: string, // not yet supported
  integrity?: string // not yet supported
}
