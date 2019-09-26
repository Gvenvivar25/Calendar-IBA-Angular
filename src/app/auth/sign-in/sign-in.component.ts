import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {AuthenticationRequest} from '../../shared/models/auth.model';
import {AuthenticationService} from '../../shared/services/authentication.service';

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
    authReqDto: AuthenticationRequest;


  constructor( private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
               private authenticationService: AuthenticationService,
               ) {
      // redirect to home if already logged in
      /*if (this.authenticationService.currentUserValue) {
          this.router.navigate(['/']);
      }*/
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
      this.authenticationService.login(this.authReqDto);

      /*this.authenticationService.login(this.f.username.value, this.f.password.value)
          .pipe(first())
          .subscribe(
              data => {
                  this.router.navigate([this.returnUrl]);
              },
              error => {
                  this.alertService.error(error);
                  this.loading = false;
              });*/
  }

}
