import {Injectable} from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
} from '@angular/common/http';

import {Observable} from "rxjs/internal/Observable";
import {ErrorHandler} from "./error-handler";
import {tap} from "rxjs/operators";


@Injectable()
export class RequestInterceptor implements HttpInterceptor {

    constructor(public errorHandler: ErrorHandler) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(request).pipe(
            tap(event => {
            }, error => {
                this.errorHandler.handleError(error);
            })
        );

    }
}