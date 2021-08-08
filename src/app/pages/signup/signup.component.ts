import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { wave } from 'src/app/contants/listUrl';
import { NoWhitespaceValidator } from 'src/app/contants/no-whitespace.validator';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  wave = wave;
  faLock = faLock;
  signUpForm!: FormGroup;
  strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );
  mediumPassword = new RegExp(
    '((?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{6,}))|((?=.*[a-z])(?=.*[A-Z])(?=.*[^A-Za-z0-9])(?=.{8,}))'
  );
  checkPassword: string = '';

  bar0 = 'white';
  bar1 = 'white';
  bar2 = 'white';
  barColor = 'rgb(247, 173, 173)';
  checkStrongPassword(e: any) {
    this.strongPassword.test(e)
      ? (this.bar2 = this.barColor)
      : (this.bar2 = 'white');
    e.length > 6 ? (this.bar1 = this.barColor) : (this.bar1 = 'white');
    e.length > 2 ? (this.bar0 = this.barColor) : (this.bar0 = 'white');
  }
  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[*]{6,32}$/i),
          /*  NoWhitespaceValidator(), */
        ],
      ],
      password: [null, [Validators.required]],
      confirm: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.signUpForm.valid) {
      console.log('form submitted');
      console.log(this.signUpForm.value);
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
}
