import { Injectable } from '@angular/core';
import {
    HttpInterceptor,
    HttpRequest,
    HttpResponse,
    HttpHandler,
    HttpEvent,
    HttpErrorResponse, HttpParams
} from '@angular/common/http';

import { Observable, throwError, EMPTY, from } from 'rxjs';
import { map, catchError, switchMap } from 'rxjs/operators';
import { GlobalService } from '../services/global.service';
import { AuthService } from '../services/auth.service';

@Injectable()
export class HttpConfigInterceptor implements HttpInterceptor {
    constructor(private auth: AuthService, private globalService: GlobalService) {}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
      const paramsObject: any = {};
        request.params.keys().forEach((x) => {
            const value: any = request.params.getAll(x); // used to check if the params has multiple values of not
            if(value.length > 1) { // if greater than -> use the getAll to get all elements
                paramsObject[x] = request.params.getAll(x);
            } else { // if not just get the first element
                paramsObject[x] = request.params.get(x);
            }
        });
        const params = removeEmpty(paramsObject);

        // const token: string = this.auth.currentToken();

        // if (token && !request.url.includes('/user/login')) {
        //     request = request.clone({ headers: request.headers.set('Authorization', 'Bearer ' + token),
        //         params: new HttpParams({fromObject: params}) });
        // }
        if (!request.headers.has('Content-Type') && !(request.body instanceof FormData)) {
            request = request.clone({ headers: request.headers.set('Content-Type', 'application/json'),
                params: new HttpParams({fromObject: params}) });
        }

        // if (!request.headers.has('Content-Type') && request.body instanceof FormData) {
        //   const boundary = Math.random().toString().substr(2);
        //   request = request.clone({ headers: request.headers.set('Content-Type', `multipart/form-data; boundary=${boundary}`),
        //   params: new HttpParams({fromObject: params}) });
        // }

        if (!request.headers.has('Accept')) {
            request = request.clone({ headers: request.headers.set('Accept', 'application/json'),
                params: new HttpParams({fromObject: params}) });
        }

        return next.handle(request).pipe(
            map((event: HttpEvent<any>) => {
              // if (event instanceof HttpResponse) {}
              return event;
            }),
            catchError((error: HttpErrorResponse) => {
              this.globalService.handleError(error);
              return throwError(error);
            } ));
    }
}

function removeEmpty(obj: any) {
    const _obj = JSON.parse(JSON.stringify(obj));
    Object.keys(_obj).forEach(key => (_obj[key] == null || _obj[key] === '') && delete _obj[key]);
    return _obj;
}
