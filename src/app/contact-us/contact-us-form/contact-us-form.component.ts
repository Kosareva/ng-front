import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsFormService} from "./contact-us-form.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {concatMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
    selector: 'app-contact-us-form',
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit, OnDestroy {

    form: FormGroup;
    initSubscription: Subscription;
    enquiryTypeSubscription: Subscription;
    enquiryTypes: Array<string>;
    initialized: boolean = false;
    descriptionLength: number = 0;

    constructor(private contactUsFormService: ContactUsFormService) {
    }

    addOtherOption() {
        this.form.addControl('enquiryTypeOther', new FormControl(null, Validators.required));
        this.enquiryTypeSubscription = this.form.get('enquiryTypeOther').valueChanges
            .subscribe(() => {
            });
    }

    removeOtherOption() {
        if (this.enquiryTypeSubscription) {
            this.enquiryTypeSubscription.unsubscribe();
        }
        this.form.removeControl('enquiryTypeOther');
    };

    countDescriptionLength() {
        this.descriptionLength = this.form.get('description').value.length;
    }

    markAsTouchedAll() {
        Object.keys(this.form.controls).forEach(key => {
            this.form.get(key).markAsTouched();
        });
    };

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
            'description': new FormControl(null, [
                Validators.required,
                Validators.maxLength(1000),
            ]),
            'attachment': new FormControl(null),
        });

        return of(true);

    }

    ngOnInit() {
        this.initSubscription = this.contactUsFormService.getEnquiryTypes()
            .pipe(
                concatMap((types) => {
                    return this.initForm(types);
                })
            )
            .subscribe(() => {
                    this.initialized = true;
                    this.afterInit();
                }
            );
    }

    afterInit() {
        this.form.get('enquiryType').valueChanges
            .subscribe(() => {
                if (this.form.get('enquiryType').value === 'Other') {
                    this.addOtherOption();
                } else {
                    this.removeOtherOption();
                }
            });
        this.form.get('description').valueChanges
            .subscribe(() => {
                this.countDescriptionLength();
            });
    }

    ngOnDestroy() {
        this.initSubscription.unsubscribe();
        this.enquiryTypeSubscription.unsubscribe();
    }

    onSubmit() {
        this.markAsTouchedAll();
    }

}
