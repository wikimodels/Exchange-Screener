import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Coin } from 'models/coin/coin';
import { CoinsCollections } from 'models/coin/coins-collections';
import { Observable, map, of } from 'rxjs';
import { CoinsGenericService } from 'src/service/coins/coins-generic.service';

export class SymbolNameValidator {
  static createValidator(coinsService: CoinsGenericService): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      const coins = coinsService.getCoins();
      const symbol = coins.find((c: Coin) => c.symbol == control.value);
      const hasError = symbol ? null : { SymbolNameNotExists: true };
      return of(hasError);
    };
  }
}
