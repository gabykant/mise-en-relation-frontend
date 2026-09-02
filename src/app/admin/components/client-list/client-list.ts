import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ClientSummary, ClientSubscription } from '@models/client';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter-pipe';
import { Client as ClientService } from '@services/client';
import { Router } from '@angular/router';

@Component({
  selector: 'app-client-list',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule, FilterPipe],
  templateUrl: './client-list.html',
  styleUrl: './client-list.css',
})
export class ClientList implements OnInit {
  clients: ClientSummary[] = [];
  loading = true;
  error: string | null = null;
  searchText: string = '';
  p: number = 1;
  pageSize: number = 10;

  // Gestion de la modale d'action / historique
  selectedClient: ClientSummary | null = null;
  clientSubscriptions: ClientSubscription[] = [];
  loadingSubscriptions = false;
  processingApproval = false;

  constructor(
    @Inject(ClientService) private clientService: ClientService,
    private cdr: ChangeDetectorRef,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients(): void {
    this.loading = true;
    this.clientService.getAllClients().subscribe({
      next: (data) => {
        this.clients = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des clients.";
        this.loading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }

  // openClientModal(client: ClientSummary): void {
  //   this.selectedClient = client;
  //   this.loadingSubscriptions = true;
  //   this.clientSubscriptions = [];
  //   this.cdr.detectChanges();

  //   this.clientService.getClientSubscriptions(client.id).subscribe({
  //     next: (subs) => {
  //       this.clientSubscriptions = subs;
  //       this.loadingSubscriptions = false;
  //       this.cdr.detectChanges();
  //     },
  //     error: (err) => {
  //       console.error(err);
  //       this.loadingSubscriptions = false;
  //       this.cdr.detectChanges();
  //     }
  //   });
  // }

  // Redirection vers la fiche détaillée du client
  viewClient(clientId: string): void {
    this.router.navigate(['/admin/clients/view', clientId]);
  }

  // closeModal(): void {
  //   this.selectedClient = null;
  //   this.clientSubscriptions = [];
  // }

  /*approveSubscription(): void {
    if (!this.selectedClient) return;

    if (!confirm(`Activer / Renouveler l'abonnement mensuel de 30 jours pour le client ${this.selectedClient.phoneNumber} ?`)) {
      return;
    }

    this.processingApproval = true;
    this.cdr.detectChanges();

    this.clientService.approveSubscription(this.selectedClient.id, 30).subscribe({
      next: () => {
        alert('Abonnement de 30 jours activé avec succès ! Une notification WhatsApp a été envoyée au client.');
        this.processingApproval = false;
        this.openClientModal(this.selectedClient!); // Rafraîchir l'historique
        this.loadClients(); // Rafraîchir la liste globale
      },
      error: (err) => {
        alert("Erreur lors de la validation de l'abonnement.");
        console.error(err);
        this.processingApproval = false;
        this.cdr.detectChanges();
      }
    });
  }*/
}
