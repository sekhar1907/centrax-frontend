import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpErrorResponse,
  HttpParams
} from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap} from 'rxjs/operators';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService implements HttpInterceptor {

  constructor(private router: Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // remove null fields
    const paramsObject = {};
    request.params.keys().forEach((x) => {
        const value = request.params.getAll(x); // used to check if the params has multiple values of not
        if(value.length > 1) { // if greater than -> use the getAll to get all elements
            paramsObject[x] = request.params.getAll(x);
        } else { // if not just get the first element
            paramsObject[x] = request.params.get(x);
        }
    });
    const params = removeEmpty(paramsObject);

    const cloneRequest = request.clone({
    	headers: request.headers.set('X-Requested-With', 'XMLHttpRequest'),
    	withCredentials: true,
      params: new HttpParams({fromObject: params})
    })

    return next.handle(cloneRequest).pipe( tap(() => {},
      (err: any) => {
        console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status == 401) {
        	window.location.href = '/auth/login'
        }
        else return;

      }
    }));
  }
}

export function removeEmpty(obj) {
  const _obj = JSON.parse(JSON.stringify(obj));
  Object.keys(_obj).forEach(key => (_obj[key] == null || _obj[key] === '') && delete _obj[key]);
  return _obj;
}
