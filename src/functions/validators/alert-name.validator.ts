import {
  AsyncValidatorFn,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { AlertsCollections } from 'models/alerts/alerts-collections';
import { Observable, of } from 'rxjs';
import { AlertsGenericService } from 'src/service/alerts/alerts-generic.service';

export class AlertNameValidator {
  static createValidator(
    alertsService: AlertsGenericService
  ): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      //alertsService.getAllAlerts(AlertsCollections.WorkingAlerts);
      const alerts = alertsService.getAlerts(AlertsCollections.WorkingAlerts);
      const result = alerts.find((a) => a.alertName == control.value);
      const hasError = result ? { alertNameTaken: true } : null;
      return of(hasError);
    };
  }
}
