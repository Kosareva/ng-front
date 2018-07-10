import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {map} from "rxjs/operators";

@Injectable()
export class ContactUsFormService {

    constructor(private httpClient: HttpClient) {
    }

    getEnquiryTypes() {
        return this.httpClient.get('http://504080.com/api/v1/directories/enquiry-types')
            .pipe(
                map((res: any) => {
                    let response = [];
                    for (let types of res.data) {
                        response.push(types.name);
                    }
                    return response;
                })
            );
    }

    sendForm(formData) {
        return this.httpClient.post('http://504080.com/api/v1/support', formData)
            .pipe(
                map((res: any) => {
                    return res.data.message;
                })
            );
    }

}
