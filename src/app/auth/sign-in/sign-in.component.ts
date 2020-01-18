import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationService} from '../../shared/services/authentication.service';
import {first} from 'rxjs/operators';
import {AuthenticationModel} from '../../shared/models/auth.model';

@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
    signInForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;
    error = '';
    authReqDto: AuthenticationModel;


  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
               private authenticationService: AuthenticationService,
               ) {
      // redirect to home if already logged in
      if (this.authenticationService.currentToken) {
          if (this.authenticationService.userRole === 'ROLE_USER') {
              this.router.navigate(['/reports']);
          } else {
          this.router.navigate(['/main']); }
      }
  }

  ngOnInit() {
      this.signInForm = this.formBuilder.group({
          username: ['', Validators.required],
          password: ['', Validators.required]
      });

      // get return url from route parameters or default to '/'
      this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/main';
  }

   get f() { return this.signInForm.controls; }

  onSubmit() {
      this.submitted = true;

      // stop here if form is invalid
      if (this.signInForm.invalid) {
          return;
      }
      this.loading = true;
      this.authReqDto = Object.assign({}, this.signInForm.value);
      console.log(this.authReqDto);
      console.log(window.location.origin);
      this.authenticationService.login(this.authReqDto).pipe(first())
          .subscribe(
              () => {
                  console.log(this.authenticationService.userRole);
                  if (this.authenticationService.userRole === 'ROLE_USER') {
                      this.router.navigate(['/reports']);
                  } else if (this.authenticationService.userRole === 'ROLE_GROUP') {
                      this.router.navigate(['/reports/timetable-group']);
                  } else {
                  this.router.navigate([this.returnUrl]); }
              },
              error => {
                  console.log(error);
                  this.error = error;
                  this.loading = false;
              });
  }
}
