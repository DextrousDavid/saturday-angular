import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  apiUrl = 'http://localhost:3000/users';

  constructor(private http: HttpClient) {}

  getAllUsers() {
    let res = this.http.get(this.apiUrl);
    console.log('All Users>>>', res);
    return res;
  }

  getByCode(code: any) {
    let res = this.http.get(this.apiUrl + '/' + code);
    console.log('Gotten by Code>>', res);
    return res;
  }

  proceedWithRegistration(user: any) {
    let res = this.http.post(this.apiUrl, user);
    return res;
  }

  updateUser(user: any, code: any) {
    let res = this.http.put(this.apiUrl + '/' + code, user);
    console.log('Update user>>', res);
  }
}
