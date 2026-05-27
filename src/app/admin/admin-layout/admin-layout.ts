import { Component, Inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { Auth } from '@core/services/auth';

@Component({
  selector: 'app-admin-layout',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css',
})
export class AdminLayout {
  constructor(private router: Router, @Inject(Auth) private auth: Auth) {}

  logout() {
    // 1. Supprimer le token du localStorage (ou ton service d'auth)
    this.auth.logout();

    // 2. Rediriger vers la page de login
    this.router.navigate(['/login']);
  }
}
