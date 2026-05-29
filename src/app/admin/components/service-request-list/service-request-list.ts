import { Component, Inject, inject, OnInit } from '@angular/core';
import { ServiceRequest } from '@models/service-request.model';
import { ServiceRequestService } from '@services/service-request';
import { CommonModule, DatePipe } from '@angular/common';

@Component({
  selector: 'app-service-request-list',
  standalone: true,
  imports: [DatePipe, CommonModule],
  templateUrl: './service-request-list.html',
  styleUrl: './service-request-list.css',
})
export class ServiceRequestList implements OnInit {
  requests: ServiceRequest[] = [];
  loading = true;
  error: string | null = null;

  constructor(
    @Inject(ServiceRequestService) private requestService: ServiceRequestService) {}

  ngOnInit(): void {
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des demandes.";
        this.loading = false;
        console.error(err);
      }
    });
  }
}
