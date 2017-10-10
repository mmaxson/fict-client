import {Injectable} from '@angular/core';
import {HttpClient, HttpParams, HttpHeaders} from '@angular/common/http';
import {User} from '../model/user';
import 'rxjs/Rx';

const url = '//localhost:7771/murun/auth/oauth/token';

@Injectable()
export class AuthenticationService {
  constructor(private http: HttpClient) {
  }

  login(username: string, password: string): Promise<User> {

    const promise = new Promise<User>((resolve, reject) => {
      this.http.post<any>(url, {}, {
        params: new HttpParams()
          .set('grant_type', 'password')
          .set('username', username)
          .set('password', password),
        headers: new HttpHeaders().set('Content-Type', 'application/json')
          .set('Accept', 'application/json')
          .set('Charset', 'utf-8')
          .set('Cache-Control', 'no-cache')
          .set('Authorization', 'Basic ' + btoa('fict' + ':' + 'fict-secret'))
      }).toPromise()
        .then(
          (response) => {
            // console.log(response);
            const user: User = new User();
            user.username = username;
            user.firstName = response['firstName'];
            user.lastName = response['lastName'];
            user.email = response['email'];
            user.access_token = response['access_token'];
            resolve(user);
          }).catch((err) => {
          if (err.error instanceof Error) {
            console.log('An error occurred:', err.error.message);
          } else {
            console.log(`Backend returned code ${err.status}, body was: ${err.error}`);
          }
          reject(new Error('error'));
        }
      );
    });
    return promise;
  }




}


