import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Observable, map } from 'rxjs';
import { CoinsService } from 'src/service/coins/coins.service';

export class SymbolNameValidator {
  static createValidator(service: CoinsService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkSymbolNameExists(control.value).pipe(
        map((result) => {
          const hasError =
            result === true ? null : { SymbolNameNotExists: true };
          return hasError;
        })
      );
    };
  }
}
