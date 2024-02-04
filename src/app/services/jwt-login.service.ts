import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class JwtLoginService {

  private loginURL: string = 'http://localhost:6767/api/v1/login/';
 
  private tokenKey: string = 'jwtToken';

  constructor(private http: HttpClient) {}

  login(username: string, password: string): Observable<string> {
    const requestBody = { username, password };
    return this.http.post<string>(this.loginURL + 'authenticate', requestBody,{responseType: 'text' as 'json'});
  }
  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  clearToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  getRole(username:string){
    return this.http.get(this.loginURL+`getrole/${username}`,{ responseType: 'text' });
  }
}
