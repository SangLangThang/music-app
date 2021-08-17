import { Injectable } from '@angular/core';
import {
  AngularFirestore,
  AngularFirestoreCollection,
} from '@angular/fire/firestore';
import { take } from 'rxjs/operators';

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
  getCollect(){
    return this.usersRef
  }
  create(user: User): any {
    this.usersRef
      .valueChanges()
      .pipe(take(1))
      .subscribe((lists) => {
        if (lists.filter((i) => i.username === user.username).length === 0) {
          console.log('finish register');
          this.usersRef.add({ ...user });
        } else {
          console.log('false register');
        }
      });
  }
  
  

  update(id: string, data: any): Promise<void> {
    return this.usersRef.doc(id).update(data);
  }
}

interface User {
  username: string;
  password: string;
}
