import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../login/user';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
    private router: Router) { }

  signUp(user: User): void {
    this.http.post<User>('http://localhost:3000/api/signUp', user).subscribe((res) => {
    })
  }

  signIn(user: User): void {
    this.http.post<User>('http://localhost:3000/api/signIn', user).subscribe((res) => {
      this.router.navigate(['/material']);
    })
  }

}
