import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class Auth {
  public static readonly TOKEN_KEY = 'ADMIN_TOKEN';

  constructor(private http: HttpClient) { }

  login(token: string): Observable<any> {
    const url = `${environment.apiUrl}/api/v1/admin/ping`;
    
    return this.http.get(url, {
      headers: { 'X-Admin-Token': token }
    }).pipe(
      tap(() => localStorage.setItem(Auth.TOKEN_KEY, token))
    );
  }

  getToken(): string | null {
    return localStorage.getItem(Auth.TOKEN_KEY);
  }

  isLoggedIn(): boolean {
    return !!this.getToken();
  }

  logout() {
    localStorage.removeItem(Auth.TOKEN_KEY);
  }
}
