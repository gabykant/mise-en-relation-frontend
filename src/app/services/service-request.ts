import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Inject, inject, Injectable } from '@angular/core';
import { Auth } from '@core/services/auth';
import { environment } from 'src/environments/environment.development';
import { Observable } from 'rxjs';
import { ServiceRequest } from '@models/service-request.model';

@Injectable({
  providedIn: 'root',
})
export class ServiceRequestService {
  constructor(private http: HttpClient, @Inject(Auth) private auth: Auth) {}

  private getHeaders() {
    return new HttpHeaders({ 'X-Admin-Token': this.auth.getToken() || '' });
  }

  getAllRequests(): Observable<ServiceRequest[]> {
    return this.http.get<ServiceRequest[]>(`${environment.apiUrl}/api/v1/admin/requests`, {
      headers: this.getHeaders()
    });
  }
}
