import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ConfigService } from './config.service';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'

  public username: string = '';
  public password: string = '';

  baseUrl: String = '';

  constructor(private http: HttpClient, private configService: ConfigService) 
  {
    this.baseUrl = configService.getBaseUrl();
  }

  authenticationService(username: string, password: string) {
    return this.http.get(this.baseUrl+'basicauth',
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
        this.username = username;
        this.password = password;
        this.registerSuccessfulLogin(username, password);
      }));
  }

  prova() {
    return this.http.get(this.baseUrl+'prova');
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password)
  }

  registerSuccessfulLogin(username: string, password: string) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.username = '';
    this.password = '';
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (!user) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (!user) return ''
    return user
  }

}
