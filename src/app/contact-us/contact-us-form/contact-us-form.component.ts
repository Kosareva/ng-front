import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsFormService} from "./contact-us-form.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {concatMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {fileUploadValidator} from "../../shared/validators/file-upload-validator";
import {HttpClient} from "@angular/common/http";

@Component({
    selector: 'app-contact-us-form',
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit, OnDestroy {

    @ViewChild('file') file;
    @ViewChild('fileContainer') fileContainer;

    form: FormGroup;
    initSubscription: Subscription;
    enquiryTypeSubscription: Subscription;
    enquiryTypes: Array<string>;
    initialized: boolean = false;
    descriptionLength: number = 0;
    previewUrl: string;

    constructor(
        private contactUsFormService: ContactUsFormService,
        private httpClient: HttpClient,
    ) {
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
            'attachment': new FormControl(null, fileUploadValidator(10)),
        });

        return of(true);

    }

    onFileChange(event) {
        // let file = event.target.files[0];
        // let img = new Image();
        // if (file) {
        //     let reader = new FileReader();
        //     reader.onload = () => {
        //         this.form.patchValue({
        //             'attachment': reader.result
        //         });
        //         // img.src = reader.result;
        //         // this.previewUrl = reader.result;
        //     };
        //     console.log(reader.readAsDataURL(file));
        // }
        // this.httpClient.post('gs://ang-firebase-gallery.appspot.com/uploads', this.selectedFile)
        //     .subscribe();
    }

    onSubmit() {
        this.markAsTouchedAll();
        console.log(this.form);
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
        this.form.get('attachment').valueChanges
            .subscribe((data) => {

            });
    }

    ngOnDestroy() {
        this.initSubscription.unsubscribe();
        this.enquiryTypeSubscription.unsubscribe();
    }

}
