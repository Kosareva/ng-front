import {AbstractControl, ValidatorFn} from "@angular/forms";

export function fileUploadValidator(length): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
        // if (control.value && control.value.length > length) {
        //     return {'lengthLimitExceeded': length};
        // }
        // else
            return null;
    };
}