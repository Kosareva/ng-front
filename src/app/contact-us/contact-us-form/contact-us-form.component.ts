import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsFormService} from "./contact-us-form.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {concatMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {EMPTY} from "rxjs/internal/observable/empty";
import {ErrorHandler} from "../../error-handling/error-handler";

@Component({
    selector: 'app-contact-us-form',
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    subscription: Subscription;
    enquiryTypes: Array<string>;
    initialized: boolean = false;

    constructor(private contactUsFormService: ContactUsFormService) {
    }

    initForm(types): Observable<boolean> {

        this.enquiryTypes = types;

        this.form = new FormGroup({
            'enquiryType': new FormControl(types[0]),
            'name': new FormControl(null, Validators.required),
            'email': new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            'subject': new FormControl(null, Validators.required),
            'description': new FormControl(null, Validators.required),
            'attachment': new FormControl(null),
        });

        return of(true);

    }

    ngOnInit() {
        this.subscription = this.contactUsFormService.getEnquiryTypes()
            .pipe(
                concatMap((types) => {
                    return this.initForm(types);
                })
            )
            .subscribe(() => {
                    this.initialized = true;
                }
            );
    }

    ngOnDestroy() {
        this.subscription.unsubscribe();
    }

    onSubmit() {
        console.log(this.form);
    }

}
