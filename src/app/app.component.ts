import {ViewEncapsulation, Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from './service/authentication-service';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  encapsulation: ViewEncapsulation.None,

})
export class AppComponent implements OnInit {


  public loginForm = new FormGroup({});

  constructor( private fb: FormBuilder, private route: ActivatedRoute, private router: Router,
               private authenticationService: AuthenticationService) {


    this.createForm();
  }

  ngOnInit() {
    this.authenticationService.logout();
  //  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  createForm() {
    this.loginForm = this.fb.group({
      userId: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


  onSubmit() {
    this.router.navigate(['/main/corporations']);
    this.authenticationService.login( this.loginForm.get('userId').value,  this.loginForm.get('password').value ).then(

    )
          /*data => {

          },
          error => {
          });*/
  }


}
