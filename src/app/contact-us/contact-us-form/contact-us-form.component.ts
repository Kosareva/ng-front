import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ContactUsFormService} from "./contact-us-form.service";
import {Subscription} from "rxjs/internal/Subscription";
import {Observable} from "rxjs/internal/Observable";
import {concatMap} from "rxjs/operators";
import {of} from "rxjs/internal/observable/of";
import {ToastrService} from 'ngx-toastr';

@Component({
    selector: 'app-contact-us-form',
    templateUrl: './contact-us-form.component.html',
    styleUrls: ['./contact-us-form.component.scss']
})
export class ContactUsFormComponent implements OnInit, OnDestroy {

    @ViewChild('file') file;
    @ViewChild('fileDelete') fileDelete;

    form: FormGroup;
    enquiryTypeSubscription: Subscription;
    enquiryTypes: Array<string>;
    descriptionLength: number = 0;
    previewUrl: string;
    subscriptions = new Subscription();
    initialized: boolean = false;
    fileValid: boolean = false;

    fileMaxSizeMb: number = 5;
    fileMinWidth: number = 300;
    fileMinHeight: number = 300;
    fileTypes: string[] = [
        'image/jpeg',
        'image/jpg',
        'image/png'
    ];
    fileErrors = [];

    constructor(
        private contactUsFormService: ContactUsFormService,
        private toastr: ToastrService
    ) {
    }

    mbTokb(mb: number) {
        return mb * 1024 * 1024;
    }

    validateFileSize(file, size: number): Observable<any> {

        return Observable.create((observer) => {

            if (file.size > this.mbTokb(size)) {
                observer.error(`File size must be < ${size} MB`);
            }
            else {
                observer.next(true);
            }

        });

    }

    validateFileType(file, types: string[]): Observable<any> {

        return Observable.create((observer) => {

            if (types.indexOf(file.type) === -1) {
                observer.error(`Wrong file type`);
            }
            else {
                observer.next(true);
            }

        });

    }

    validateFileDimension(file, minW: number, minH: number): Observable<any> {

        return Observable.create((obs) => {

            let img: any = new Image();
            img.src = window.URL.createObjectURL(file);
            let minWidth = minW;
            let minHeight = minH;

            img.onload = function () {

                let imgwidth = this.width;
                let imgheight = this.height;

                if (imgwidth < minWidth && imgheight < minHeight) {
                    obs.error('Image is less than 300x300');
                } else {
                    obs.next(true);
                }
            };
            img.onerror = err => obs.error(err);
            img.onabort = err => obs.error(err);
            img.onloadend = () => obs.complete();

        });

        // return Observable.create((obs) => {
        //
        //     const reader = new FileReader();
        //
        //     reader.onerror = err => obs.error(err);
        //     reader.onabort = err => obs.error(err);
        //     reader.onload = () => obs.next(reader.result);
        //     reader.onloadend = () => obs.complete();
        //
        //     return reader.readAsDataURL(file);
        //
        // }).pipe(
        //     concatMap(
        //         (data) => {
        //
        //             return Observable.create((obs) => {
        //
        //                 let img = new Image();
        //                 img.src = data as string;
        //
        //                 let width = img.naturalWidth;
        //                 let height = img.naturalHeight;
        //
        //                 if (width < this.fileMinWidth || height < this.fileMinHeight) {
        //                     obs.error('Image is less than 300x300');
        //                 }
        //                 else {
        //                     obs.next(true);
        //                 }
        //
        //             });
        //         }
        //     )
        // );

    }

    createFilePreview(file) {
        let reader = new FileReader();
        reader.onload = () => {
            this.previewUrl = reader.result;
        };
        reader.readAsDataURL(file);
    }

    resetFile() {
        this.previewUrl = '';
        this.file.nativeElement.value = '';
    }

    clearFileErrors() {
        this.fileErrors = [];
    }

    addOtherOption() {
        this.form.addControl('enquiry_type_other', new FormControl(null, Validators.required));
        this.enquiryTypeSubscription = this.form.get('enquiry_type_other').valueChanges
            .subscribe(() => {
            });
    }

    removeOtherOption() {
        if (this.enquiryTypeSubscription) {
            this.enquiryTypeSubscription.unsubscribe();
        }
        this.form.removeControl('enquiry_type_other');
    };

    countDescriptionLength() {
        if (this.form.get('description').value) {
            this.descriptionLength = this.form.get('description').value.length;
        }
        else {
            this.descriptionLength = 0;
        }
    }

    markAsTouchedAll() {
        Object.keys(this.form.controls).forEach(key => {
            this.form.get(key).markAsTouched();
        });
    };

    initForm(types): Observable<boolean> {

        this.enquiryTypes = types;

        this.form = new FormGroup({
            'enquiry_type': new FormControl(this.enquiryTypes[0], Validators.required),
            'user_name': new FormControl(null, Validators.required),
            'email': new FormControl(null, [
                Validators.required,
                Validators.email,
            ]),
            'subject': new FormControl(null, Validators.required),
            'description': new FormControl(null, [
                Validators.required,
                Validators.maxLength(1000),
            ]),
        });

        return of(true);

    }

    resetForm() {
        this.removeOtherOption();
        this.form.reset();
        this.form.controls['enquiry_type'].setValue(this.enquiryTypes[0], {onlySelf: true});
        this.resetFile();
    }

    sendForm() {
        let formData = new FormData();

        Object.keys(this.form.value).forEach((key, ind) => {
            formData.append(key, this.form.value[key]);
        });

        if (this.fileValid && this.file.nativeElement.files[0]) {
            formData.append('file', this.file.nativeElement.files[0]);
        }

        this.subscriptions.add(this.contactUsFormService.sendForm(formData)
            .subscribe((data) => {
                this.toastr.success(data, 'Success!');
            }));

    }

    afterInit() {
        this.subscriptions.add(this.form.get('enquiry_type').valueChanges
            .subscribe(() => {
                if (this.form.get('enquiry_type').value === 'Other') {
                    this.addOtherOption();
                } else {
                    this.removeOtherOption();
                }
            }));
        this.subscriptions.add(this.form.get('description').statusChanges
            .subscribe(() => {
                this.countDescriptionLength();
            }));
    }

    ngOnInit() {
        this.subscriptions.add(this.contactUsFormService.getEnquiryTypes()
            .pipe(
                concatMap((types) => {
                    return this.initForm(types);
                })
            )
            .subscribe(() => {
                    this.initialized = true;
                    this.afterInit();
                }
            ));
    }

    onFileChange(event) {
        this.clearFileErrors();
        this.fileValid = false;
        let file = event.target.files[0] ? event.target.files[0] : null;
        if (!!file) {
            this.validateFileType(file, this.fileTypes)
                .pipe(
                    concatMap(() => {
                        return this.validateFileSize(file, this.fileMaxSizeMb);
                    }),
                    concatMap(() => {
                        return this.validateFileDimension(file, this.fileMinWidth, this.fileMinHeight);
                    })
                ).subscribe(() => {
                    this.createFilePreview(file);
                    this.fileValid = true;
                },
                (error) => {
                    this.resetFile();
                    this.fileErrors.push(error);
                }
            );
        }
    }

    onPreviewDelete() {
        this.resetFile();
    }

    onSubmit() {

        if (this.form.valid) {
            this.sendForm();
            this.resetForm();
        }
        else {
            this.markAsTouchedAll();
        }

    }

    ngOnDestroy() {
        this.enquiryTypeSubscription.unsubscribe();
        this.subscriptions.unsubscribe();
    }

}
