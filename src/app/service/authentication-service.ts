import { Injectable } from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import 'rxjs/Rx';

const baseUrl = '//localhost:7771/murun/auth/oauth/token?grant_type=password&';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) { }

  login(username: string, password: string): Promise<User> {
    const promise = new Promise((resolve, reject) => {
      this.http.post<any>(this.constructUrl(username, password), {}, {
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Charset', 'utf-8')
          .set('Cache-Control', 'no-cache')
          .set('Authorization', 'Basic ' + btoa('fict' + ':' + 'fict-secret' ))
      }).toPromise()
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

  private constructUrl( username: string, password: string ): string {
    return  baseUrl + 'username=' + username + '&' + 'password=' + password ;
  }
}


