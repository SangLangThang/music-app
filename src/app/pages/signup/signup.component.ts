import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Observable, timer } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { wave } from 'src/app/contants/listUrl';
import { AuthService } from 'src/app/services/auth.service';
import { ValidateService } from 'src/app/services/validate.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private validateService: ValidateService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.signUpForm = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,32}$/i)],
        this.validateUserNameFromAPIDebounce.bind(this),
      ],
      password: [null, [Validators.required]],
      confirm: [null, [Validators.required]],
    });
  }

  wave = wave;
  faLock = faLock;
  signUpForm!: FormGroup;

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
      this.authService.getLists().subscribe((lists) => {
        if (
          lists.filter((i) => i.username === this.signUpForm.value.username)
            .length === 0
        ) {
          this.authService.getCollect().add({
            username: this.signUpForm.value.username,
            password: this.signUpForm.value.password,
          });
          this.router.navigateByUrl('/login');
        }
      });
    }
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
