import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, throwError, retry, of } from 'rxjs';

const httpOptions = {
  headers: new HttpHeaders({
    'ngrok-skip-browser-warning': 'true', // Example header
  }),
};

@Injectable({ providedIn: 'root' })
export class ApiService {
  constructor(private http: HttpClient) {}

  getData(url: string): Observable<any> {
    // return this.http.get(
    //   'https://loyal-yearly-jawfish.ngrok-free.app/get-all-routes'
    // );
    return this.http
      .get(
        'https://loyal-yearly-jawfish.ngrok-free.app/get-all-routes',
        httpOptions
      )
      .pipe(catchError((err) => of(err.error.text)));
    // .subscribe(
    //   (data) => {
    //     // Handle successful data processing here (optional)
    //   },
    //   (error) => {
    //     // Redirect to the error page based on the error text
    //     console.error('Error:', error); // Log the error for debugging
    //     //this.router.navigate(['/error', error]); // Example using a router (replace with your navigation logic)
    //   }
    // );
  }
}
