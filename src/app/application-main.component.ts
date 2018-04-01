import {Component, ViewEncapsulation, OnInit} from '@angular/core';

import {LoginComponent} from './login.component';
import {Router} from '@angular/router';
import {DomSanitizer} from '@angular/platform-browser';
import {MatIconRegistry} from '@angular/material';



@Component({
  selector: 'app-main',
  templateUrl: './application-main.component.html',
  styleUrls: ['./application-main.component.css'],
  encapsulation: ViewEncapsulation.None,

})
export class ApplicationMainComponent implements OnInit {

  // public userFirstLetter: string;

  constructor(private router: Router, private loginComponent: LoginComponent, iconRegistry: MatIconRegistry, sanitizer: DomSanitizer ) {
    iconRegistry.addSvgIconSet(sanitizer.bypassSecurityTrustResourceUrl('/assets/mdi.svg'));
   //  this.userFirstLetter = this.loginComponent.getUserFirstName().substring(0, 1).toUpperCase();
  }

  ngOnInit() {

  }

  logout() {
    this.loginComponent.invalidateUser();
    this.router.navigate(['/']);
  }
}

