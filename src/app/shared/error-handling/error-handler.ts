import {Injectable} from '@angular/core';
import {HttpErrorResponse} from "@angular/common/http";
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class ErrorHandler {

    constructor(private toastr: ToastrService) {
    }

    handleError(error: Error | HttpErrorResponse) {

        let msg = 'Something went wrong. Please, contact site administrator';

        if (error instanceof HttpErrorResponse) {
            // Server or connection error happened
            if (!navigator.onLine) {
                // Handle offline error
                msg = 'No internet connection';
            } else {
                // Handle Http Error (error.status === 403, 404...)
                if (error.status !== 0) {
                    msg = error.error.error.description;
                }
            }
        } else {
            // Handle Client Error (Angular Error, ReferenceError...)
        }

        console.error(error);

        this.toastr.error(msg, 'Error!');
    }

}