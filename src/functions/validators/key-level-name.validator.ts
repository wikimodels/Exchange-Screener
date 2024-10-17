import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { KeyLevelNamesService } from 'src/services/key-level-names.service';

export class KeyLevelNameValidator {
  static createValidator(service: KeyLevelNamesService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkKeyLevelNameExists(control.value).pipe(
        map((result) => {
          console.log('Validator result', result);
          const hasError =
            result === false ? null : { keyLevelNameExists: true };
          return hasError;
        })
      );
    };
  }
}
