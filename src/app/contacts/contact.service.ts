import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact } from './contact.model';
import { catchError } from 'rxjs/Operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private api = environment.base_api + 'contacts/';

  constructor(
    private http: HttpClient
  ) { }

  getContact(id: string): Observable<Contact> {
    return this.http.get<Contact>(this.api + id)
      .pipe(
        catchError(this._handleError)
      );
  }

  getAllContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.api)
      .pipe(
        catchError(this._handleError)
      );
  }



  private _handleError(err: HttpErrorResponse | any): Observable<any> {
    console.log('Error: ', err);
    const errorMsg = err.message || 'Error: Unable to complete request.';
    return Observable.throw(errorMsg);
  }
}
