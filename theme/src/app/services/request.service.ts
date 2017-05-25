import { Injectable, Injector, ElementRef } from 'mojiito-core';

@Injectable()
export class RequestService {

  constructor(private _injector: Injector) {
  }


  public fetch(url: string): Promise<string> {

    return new Promise((resolve: (result: any) => void, reject: (reason: Error) => void) => {
      let xhr = new XMLHttpRequest();
    });

  }

/*
  public fetch(url: string, options?: IRequestOptions): Promise<string> {
    return new Promise((resolve: (result: any) => void, reject: (reason: Error) => void) => {
      if (!options) {
        options = {};
      }

      let xhr = new XMLHttpRequest();
      let headers = options.headers;

      // Check if method is GET and body ias an object
      // If it is so, parse body object an append all properties as GET parameters to the url
      if (options.method === 'GET' && options.body) {
        if (typeof options.body === 'object') {
          let separator = '';
          let uri = '';
          for (var key in options.body) {
            if (options.body.hasOwnProperty(key)) {
              uri += `${separator}${key}=${options.body[key]}`
              separator = '&';
            }
          }

          // append the parameters to the url
          url = url + (url.indexOf('?') === - 1 ? '?' : '&') + uri;
        } else {
          // Body is not an object => not allowed
          reject(new TypeError('Non object like body not allowed for GET requests. The body has to be an object so the properties will be appended as a GET parameter to the url.'));
          return;
        }
      } else if (typeof options.body !== 'string') {
        // if body is not a string, parse it to a json string
        options.body = JSON.stringify(options.body);
      }

      // Body not allowed for HEAD requests
      if (options.method === 'HEAD' && options.body) {
        reject(new TypeError('Body not allowed for HEAD requests'));
        return;
      }

      // Add onload event listener
      xhr.onload = (event: Event) => {
        if (xhr.status >= 400 || xhr.status === 0) {
          reject(new Error(xhr.responseText));
        } else {
          resolve('response' in xhr ? xhr.response : xhr.responseText);
        }
      }

      // Add onerror event listener
      xhr.onerror = (event: ErrorEvent) => {
        debugger;
        reject(event.error);
      }

      xhr.onabort = (event: ErrorEvent) => {
        reject(new TypeError('Network request aborted'));
      }

      // Add timeout event listener
      xhr.ontimeout = (event: Event) => {
        reject(new TypeError('Network request timed out'));
      }

      if (options.credentials && options.credentials.username) {
        xhr.open(options.method ? options.method : 'GET', url, true, options.credentials.username, options.credentials.password);
      } else {
        xhr.open(options.method ? options.method : 'GET', url, true);
      }

      if (typeof headers === 'object') {
        for (var key in headers) {
          if (headers.hasOwnProperty(key)) {
            xhr.setRequestHeader(key, (<any>headers)[key]);
          }
        }
      }

      xhr.send(typeof options.body === 'undefined' ? null : options.body);
    });
  }

  */


}