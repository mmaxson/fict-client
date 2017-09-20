import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {User} from '../model/user';
import 'rxjs/Rx';

const url = '//localhost:8080/murun/fict/addresses/id/';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(userId: string, encryptedPassword: string): Promise<User> {
    const promise = new Promise((resolve, reject) => {
      this.http.post<User>(url, JSON.stringify({ 'userId': userId, 'password': encryptedPassword }) ).toPromise()
        .then(
          (response) => {
            console.log(response);
            localStorage.setItem('currentUser', response['token'] );
            resolve(response);
          },
          (err) => {
            if (err.error instanceof Error) {
              console.log('An error occurred:', err.error.message);
            } else {
              console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
            }
            reject('error');
          }
          );
    });
    return promise;
  }

  logout() {
    localStorage.removeItem('currentUser');
  }
}


