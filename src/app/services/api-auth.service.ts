import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { Response } from '../models/response';
import { SignInRequest } from '../models/signInRequest';
import { SignUpRequest } from '../models/signUpRequest';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class ApiAuthService {

  private _url = 'https://localhost:7283';
  private _httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  private userSubject : BehaviorSubject<User | null>;
  public user : Observable<User | null>;

  public get userData() {
    return this.userSubject.value;
  }

  constructor(
    private _http: HttpClient
  ) {
    const USER = JSON.parse(String(window.localStorage.getItem('user')));
    this.userSubject = new BehaviorSubject<User | null>(USER);
    this.user = this.userSubject.asObservable();
  }

  signUp(request: SignUpRequest): Observable<Response> {
      return this._http.post<Response>(this._url + '/api/Auth/SignUp', request, this._httpOptions)
  }

  signIn(request: SignInRequest): Observable<Response> {
    return this._http.post<Response>(this._url + '/api/Auth/SignIn', request, this._httpOptions)
    .pipe(
      map(response => {
        if (response.success) {
          const USER : User = response.data;
          window.localStorage.setItem('user', JSON.stringify(USER));
          this.userSubject.next(USER);
        }
        return response;
      })
    )
  }

  signOut() {
    window.localStorage.removeItem('user')
    this.userSubject.next(null);
  }
}