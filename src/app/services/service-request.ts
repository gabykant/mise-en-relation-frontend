import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Auth } from '@core/services/auth';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { ServiceRequest } from '@models/service-request.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestService {
  constructor(private http: HttpClient, @Inject(Auth) private auth: Auth) {}

  private getHeaders() {
    const token = localStorage.getItem(Auth.TOKEN_KEY) || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Admin-Token': token
    });
  }

  getAllRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${environment.apiUrl}/api/v1/admin/requests`, {
      headers: this.getHeaders()
    });
  }
}
