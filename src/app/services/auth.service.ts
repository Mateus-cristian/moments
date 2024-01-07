// auth.service.ts
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenKey = '@token';
  private jwtHelper = new JwtHelperService();

  isAuthenticated(): boolean {
    const token = this.getToken();
      
    return !!token && !this.isTokenExpired(token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  removeToken(): void {
    localStorage.removeItem(this.tokenKey);
  }

  private isTokenExpired(token: string): boolean {
   const isTokenExpired = this.jwtHelper.isTokenExpired(token);

   if (isTokenExpired){
    this.removeToken();
   }
   
   return isTokenExpired;
  }
}
