import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
  Form,
} from '@angular/forms';
import { wave } from 'src/app/contants/listUrl';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(private fb: FormBuilder) {}
  wave = wave;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [
        null,
        [
          Validators.required,
          Validators.pattern(/^[*]{6,32}$/i),
          /*  NoWhitespaceValidator(), */
        ],
      ],
      password: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      console.log('form submitted');
      console.log(this.loginForm.value);
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }
  isFieldValid(field: string) {
    return (
      this.loginForm.get(field)?.errors && this.loginForm.get(field)?.touched
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
