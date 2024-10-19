import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CoinsService } from 'src/service/coins.service';

export class SymbolNameValidator {
  static createValidator(service: CoinsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkSymbolNameExists(control.value).pipe(
        map((result) => {
          console.log('Validator result', result);
          const hasError =
            result === true ? null : { SymbolNameNotExists: true };
          return hasError;
        })
      );
    };
  }
}
