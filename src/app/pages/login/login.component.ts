import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { wave } from 'src/app/contants/listUrl';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  constructor(
    private fb: FormBuilder,
    private authservice: AuthService,
    private router: Router
  ) {}
  wave = wave;
  loginFail: boolean = false;
  loginForm!: FormGroup;
  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: [
        null,
        [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,32}$/i)],
      ],
      password: [null, [Validators.required]],
    });
  }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authservice.getLists().subscribe((lists) => {
        if (
          lists.filter(
            (i) =>
              i.username === this.loginForm.value.username &&
              i.password === this.loginForm.value.password
          ).length === 1
        ) {
          console.log('Login finish');
          this.router.navigateByUrl('/home');
        } else {
          console.log('Login Fail');
          this.loginFail = true;
        }
      });
    }
  }
}
