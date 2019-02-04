import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(public _http: HttpClient) { }

  createUser(email: string, password: string){
    const authData: AuthData = {email: email, password: password};
    console.log(authData);
    this._http.post(BACKEND_URL + "/user/signup", authData).subscribe(
      () => {
        console.log("retgh");
      },
      error => {
        console.log("rteyui");
      }
    );
  }
}
