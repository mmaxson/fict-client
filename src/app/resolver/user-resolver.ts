import {Injectable} from '@angular/core';
import {
  Router, Resolve,
  ActivatedRouteSnapshot
} from '@angular/router';
import {User} from '../model/user';

@Injectable()
export class UserResolver implements Resolve<any> {
  constructor(private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot): Promise<User> | boolean {

    const promise = new Promise<User>((resolve, reject) => {
      const userJson = JSON.parse(localStorage.getItem('user'));
      const user = new User();
      user.access_token = userJson.access_token;
      user.username = userJson.username;
      user.email = userJson.email;
      user.firstName = userJson.firstName;
      user.lastName = userJson.lastName;
      resolve(user);
    });
    return promise;
  }
}
