import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IResponse } from '../interfaces/Response';
import { ILogin, IToken } from '../interfaces/Login';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private baseApiUrl = environment.baseApiUrl;
  private apiUrl = `${this.baseApiUrl}/user/login`;

  constructor(private http: HttpClient) {}

  getLogin(credentials: ILogin): Observable<{ token: IToken }> {
    const user = {
      Username: credentials.username,
      Password: credentials.password,
    };
    return this.http.post<{ token: IToken }>(this.apiUrl, user);
  }
}
