import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
  AngularFirestoreDocument,
} from '@angular/fire/firestore';
import { map, take } from 'rxjs/operators';

import { from, Observable, of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  usersRef: AngularFirestoreCollection<User>;
  lists!: User[];
  constructor(public afs: AngularFirestore) {
    this.usersRef = afs.collection('users');
  }

  getLists() {
    return this.usersRef.valueChanges();
  }

  create(user: User): any {
    this.usersRef
      .valueChanges()
      .pipe(take(1))
      .subscribe((lists) => {
        if (lists.filter((i) => i.name === user.name).length === 0) {
          console.log('finish register');
          this.usersRef.add({ ...user });
        } else {
          console.log('false register');
        }
      });
  }
  login(user: User): any {
    return [
      ...this.lists.filter((e) => {
        return e.name === user.name && e.password === user.password;
      }),
    ].length === 1
      ? true
      : false;
  }

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }
}

interface User {
  name: string;
  password: string;
}
