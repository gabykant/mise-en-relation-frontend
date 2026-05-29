import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Auth } from '@core/services/auth';
import { Artisan } from '@models/artisan.model';
import { Observable } from 'rxjs/internal/Observable';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ArtisanService {
private apiUrl = `${environment.apiUrl}/api/v1/admin/artisans`;

  constructor(private http: HttpClient) {}

  private getHeaders(): HttpHeaders {
    // Récupère ton token stocké lors de la connexion
    const token = localStorage.getItem(Auth.TOKEN_KEY) || '';
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'X-Admin-Token': token
    });
  }

  getAllArtisans(): Observable<Artisan[]> {
    return this.http.get<Artisan[]>(this.apiUrl, { headers: this.getHeaders() });
  }

  registerArtisan(data: any): Observable<void> {
    return this.http.post<void>(this.apiUrl, data, { headers: this.getHeaders() });
  }

  // artisan.service.ts
  getProfessions(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/v1/professions`);
  }

  getZones(): Observable<any[]> {
    return this.http.get<any[]>(`${environment.apiUrl}/api/v1/zones`);
  }
}
