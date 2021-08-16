import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { AbstractControl, ValidatorFn } from '@angular/forms';
import { delay } from 'rxjs/operators';
@Injectable({
  providedIn: 'root',
})
export class ValidateService {
  constructor() {}

  strongPassword = new RegExp(
    '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[^A-Za-z0-9])(?=.{8,})'
  );
  lockColor = {
    color1: 'white',
    color2: 'white',
    color3: 'white',
  };
  checkStrongPassword(password: string) {
    this.strongPassword.test(password)
      ? (this.lockColor.color3 = 'rgb(247, 173, 173)')
      : (this.lockColor.color3 = 'white');
    password.length > 6
      ? (this.lockColor.color2 = 'rgb(247, 173, 173)')
      : (this.lockColor.color2 = 'white');
    password.length > 2
      ? (this.lockColor.color1 = 'rgb(247, 173, 173)')
      : (this.lockColor.color2 = 'white');

    return this.lockColor;
  }
  checkName(): ValidatorFn {
    return (control: AbstractControl) => {
      let controlVal = control.value;
      let isValid = !['admin', 'manager', 'host'].includes(controlVal);
      return isValid ? null : { name: `do not use  ${controlVal}` };
    };
  }
  validateUsername(username: string): Observable<boolean> {
    console.log('Trigger API call');
    let existedUsers = ['admin', 'manager', 'host'];
    let isValid = existedUsers.every((x) => x !== username);
    return of(isValid).pipe(delay(1000));
  }
}
