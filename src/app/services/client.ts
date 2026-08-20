import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Auth } from '@core/services/auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ClientSummary, ClientSubscription } from '@models/client';

@Injectable({
  providedIn: 'root',
})
export class Client {
  constructor(private http: HttpClient, @Inject(Auth) private auth: Auth) {}

  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem(Auth.TOKEN_KEY) || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Admin-Token': token
    });
  }

  getAllClients(): Observable<ClientSummary[]> {
    return this.http.get<ClientSummary[]>(`${environment.apiUrl}/api/v1/admin/clients`, {
      headers: this.getHeaders()
    });
  }

  getClientSubscriptions(clientId: string): Observable<ClientSubscription[]> {
    return this.http.get<ClientSubscription[]>(`${environment.apiUrl}/api/v1/admin/clients/${clientId}/subscriptions`, {
      headers: this.getHeaders()
    });
  }

  approveSubscription(clientId: string, durationDays: number = 30): Observable<void> {
    return this.http.post<void>(
      `${environment.apiUrl}/api/v1/admin/clients/${clientId}/subscriptions/approve`,
      { durationDays },
      { headers: this.getHeaders() }
    );
  }
}