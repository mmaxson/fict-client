import {ViewEncapsulation, Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {AuthenticationService} from './service/authentication-service';
import {User} from './model/user';
import 'rxjs/Rx';

@Component({
  selector: 'app-root',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {

  public user: User = new User();
  public loginForm = new FormGroup({});

  constructor(private fb: FormBuilder, private router: Router, private activatedRoute: ActivatedRoute, private authenticationService: AuthenticationService) {
    this.createForm();
  }

  ngOnInit() {
  }

  createForm() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  formToModel() {
    this.user.username = this.loginForm.get('userName').value;
  }

  login() {
    this.formToModel();
    this.checkCredentials();
  }


  checkCredentials() {
    this.authenticationService.login(this.user.username, this.loginForm.get('password').value).then(
      (response) => {
        this.user = response;
        localStorage.setItem('user', JSON.stringify(this.user));
        this.router.navigate(['/main/corporations']);
      }).catch((error) => {
        this.loginForm.setErrors({'invalidLogin': true});
      }
    );
  }


  public invalidateUser() {
    localStorage.removeItem('user')
   /* this.activatedRoute.parent.data.subscribe( (routeData) => {
      routeData['user'] = new User();
    });
*/
  }
}
