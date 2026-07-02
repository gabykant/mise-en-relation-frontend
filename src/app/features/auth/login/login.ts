import { Component, Inject, OnInit } from '@angular/core';
import { Auth } from '@core/services/auth';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder, 
    @Inject(Auth) private auth: Auth, 
    private router: Router) {

      this.loginForm = this.fb.group({
        token: ['', Validators.required]
      });
  }

  ngOnInit() {
    // 1. Vérification au chargement de la page : l'utilisateur a-t-il déjà une session active ?
    if (this.auth.isLoggedIn()) { 
      console.log('Session active détectée, redirection automatique...');
      this.router.navigate(['/admin/requests']);
    }
  }

  login() {
    if (this.loginForm.valid) {
      const token = this.loginForm.get('token')?.value;

      console.log('Attempting login with token:', token);
    
      this.auth.login(token).subscribe({
        next: () => {
          this.router.navigate(['/admin/requests']); // Redirection vers le dashboard
        },
        error: (err) => {
          alert('Token invalide ou serveur inaccessible');
        }
      });
    }
  }

  logout() {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}
