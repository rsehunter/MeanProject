import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from '../../environments/environment';
import { AuthData } from './auth-data';
import { MatSnackBar } from '@angular/material';
import { SnackBarComponent } from './login/snack-bar.component';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

const BACKEND_URL = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private token: string;
  private isAuth: boolean;
  private userId: string;
  private authStatusListener = new Subject<boolean>();
  constructor(
    public _http: HttpClient,
    public _router: Router,
    public snackBar: MatSnackBar) { }

  createUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this._http.post<{ message: string }>(BACKEND_URL + "/user/signup", authData).subscribe(
      (response) => {
        this.openSnackBar(response.message)
      }
    );
  }

  loginUser(email: string, password: string) {
    const authData: AuthData = { email: email, password: password };
    this._http.post<{ message: any, token: string; userId: string }>(BACKEND_URL + "/user/login", authData).subscribe(
      response => {
        const token = response.token;;
        this.token = token;
        this.userId = response.userId;
        this.openSnackBar(response.message);
        if (token) {
          this.isAuth = true;
          this.userId = response.userId;
          this.authStatusListener.next(this.isAuth);
          const now = new Date();
          const expirationDate = new Date(
            now.getTime() + 3600 * 24 * 1000
            // now.getTime() + 10 * 1000
          );
          this.saveAuthData(token, expirationDate, this.userId);
          this._router.navigate(['/gallery']);
        }
      }
    );
  }

  autoAuthUser() {
    const authInfo = this.getAuthData();
    if (!authInfo) {
      return;
    }
    const now = new Date();
    const isInFuture = authInfo.expirationDate > now;
    if (isInFuture) {
      this.token = authInfo.token;
      this.isAuth = true;
      this.userId = authInfo.userId;
      this.authStatusListener.next(this.isAuth);
    }
  }

  logoutUser() {
    this.token = null;
    this.isAuth = false;
    this.userId = null;
    this.authStatusListener.next(this.isAuth);
    this.openSnackBar("User logged out");
    this._router.navigate(['/gallery']);
    this.clearAuthData();
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);

  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    if (!token || !expirationDate) {
      return;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId
    };
  }

  openSnackBar(message: string) {
    this.snackBar.openFromComponent(SnackBarComponent, {
      duration: 500,
      data: message
    });
  }

  getAuthenStatusListener() {
    return this.authStatusListener;
  }
  getToken(): string {
    return this.token;
  }
  getAuthStatus() {
    return this.isAuth;
  }
  getUserId() {
    return this.userId;
  }

}

