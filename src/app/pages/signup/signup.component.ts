import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { wave } from 'src/app/contants/listUrl';
import { ValidateService } from 'src/app/services/validate.service';
import { AuthService } from 'src/app/services/auth.service';
import { Observable, timer } from 'rxjs';
import { map } from 'rxjs/operators';
import { switchMap } from 'rxjs/operators';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validateService: ValidateService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      name: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[a-zA-Z0-9]{6,32}$/i),
          /* this.validateService.checkName(), */
        ],
        this.validateUserNameFromAPIDebounce.bind(this),
      ],
      password: [null, [Validators.required]],
      confirm: [null, [Validators.required]],
    });
  }

  wave = wave;
  faLock = faLock;
  signUpForm!: FormGroup;

  strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );

  checkPassword: string = '';

  lockColor = {
    color1: 'white',
    color2: 'white',
    color3: 'white',
  };
  matchPassword = false;
  checkStrongPassword(e: string) {
    this.lockColor = { ...this.validateService.checkStrongPassword(e) };
  }

  checkMatchPassword(e: any) {
    e.target.value === this.checkPassword;
    return e.target.value === this.checkPassword
      ? (this.matchPassword = true)
      : (this.matchPassword = false);
  }

  onSubmit() {
    if (this.signUpForm.valid && this.matchPassword) {
      console.log('form submitted', this.signUpForm.value);
      this.authService.create({
        name: this.signUpForm.value.name,
        password: this.signUpForm.value.password,
      });
    } else {
      this.validateAllFormFields(this.signUpForm);
    }
  }
  isFieldValid(field: string) {
    return (
      this.signUpForm.get(field)?.errors && this.signUpForm.get(field)?.touched
    );
  }
  validateAllFormFields(formGroup: FormGroup) {
    Object.keys(formGroup.controls).forEach((field) => {
      console.log('validate:', field);
      const control = formGroup.get(field);
      if (control instanceof FormControl) {
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {
        this.validateAllFormFields(control);
      }
    });
  }
  validateUserNameFromAPI(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return this.validateService.validateUsername(control.value).pipe(
      map((isValid) => {
        if (isValid) {
          return null;
        }
        return {
          usernameDuplicated: true,
        };
      })
    );
  }
  validateUserNameFromAPIDebounce(
    control: AbstractControl
  ): Observable<ValidationErrors | null> {
    return timer(300).pipe(
      switchMap(() =>
        this.validateService.validateUsername(control.value).pipe(
          map((isValid) => {
            if (isValid) {
              return null;
            }
            return {
              usernameDuplicated: true,
            };
          })
        )
      )
    );
  }
}
