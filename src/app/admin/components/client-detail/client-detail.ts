import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Client } from '@services/client';
import { ClientSubscription, ClientSummary } from '@models/client';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-client-detail',
  standalone: true,
  imports: [CommonModule, DatePipe, FormsModule, RouterModule],
  templateUrl: './client-detail.html',
  styleUrl: './client-detail.css',
})
export class ClientDetail implements OnInit {
  clientId!: string;
  client: ClientSummary | null = null;
  subscriptions: ClientSubscription[] = [];
  
  loading = true;
  processingAction = false;
  error: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private clientService: Client,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('id') || '';
    if (this.clientId) {
      this.loadClientData();
    }
  }

  loadClientData(): void {
    this.loading = true;
    this.clientService.getClientById(this.clientId).subscribe({
      next: (data) => {
        this.client = data;
        this.loadSubscriptions();
      },
      error: (err) => {
        this.error = 'Erreur lors du chargement des données du client.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadSubscriptions(): void {
    this.clientService.getClientSubscriptions(this.clientId).subscribe({
      next: (subs) => {
        this.subscriptions = subs;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Activer ou renouveler l'abonnement mensuel (2 000 FCFA)
  approveMonthlySubscription(): void {
    if (!confirm('Confirmer le paiement de 2 000 FCFA et l\'activation de l\'abonnement mensuel (30 jours) ?')) return;

    this.processingAction = true;
    this.clientService.approveSubscription(this.clientId, 'MONTHLY_SUBSCRIPTION', 2000, 30).subscribe({
      next: () => {
        alert('Abonnement mensuel activé avec succès ! Notification envoyée au client.');
        this.processingAction = false;
        this.loadClientData();
      },
      error: (err) => {
        alert('Erreur lors de l\'activation de l\'abonnement.');
        this.processingAction = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Approuver le service à l'acte / ticket unique (1 000 FCFA)
  approveSingleServicePayment(): void {
    if (!confirm('Confirmer le paiement de 1 000 FCFA pour le service à l\'acte (mise en relation unique) ?')) return;

    this.processingAction = true;
    this.clientService.approveSubscription(this.clientId, 'PAY_PER_MATCH', 1000, 1).subscribe({
      next: () => {
        alert('Ticket de mise en relation de 1 000 FCFA validé avec succès !');
        this.processingAction = false;
        this.loadClientData();
      },
      error: (err) => {
        alert('Erreur lors de la validation du paiement unique.');
        this.processingAction = false;
        this.cdr.detectChanges();
      }
    });
  }

  // Révoquer / Désactiver l'abonnement du client
  revokeSubscription(): void {
    if (!confirm('Êtes-vous sûr de vouloir révoquer l\'abonnement actif de ce client ?')) return;

    this.processingAction = true;
    this.clientService.revokeClientSubscription(this.clientId).subscribe({
      next: () => {
        alert('L\'abonnement a été révoqué. Le client est désormais inactif.');
        this.processingAction = false;
        this.loadClientData();
      },
      error: (err) => {
        alert('Erreur lors de la révocation.');
        this.processingAction = false;
        this.cdr.detectChanges();
      }
    });
  }
}
