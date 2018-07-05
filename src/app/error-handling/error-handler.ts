import {Injectable} from '@angular/core';

@Injectable()
export class ErrorHandler {

    constructor() {
    }

    public handleError(err: any) {
        alert(err);
    }

}