import { ChangeDetectorRef,Component, Inject, inject, OnInit } from '@angular/core';
import { ServiceRequest } from '@models/service-request.model';
import { ServiceRequestService } from '@services/service-request';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterPipe } from 'src/app/pipes/filter-pipe';


@Component({
  selector: 'app-service-request-list',
  standalone: true,
  imports: [DatePipe, CommonModule, FormsModule, FilterPipe],
  templateUrl: './service-request-list.html',
  styleUrl: './service-request-list.css',
})
export class ServiceRequestList implements OnInit {
  requests: ServiceRequest[] = [];
  loading = true;
  error: string | null = null;
  searchText: string = '';
  p: number = 1;
  pageSize: number = 10;

  constructor(
    @Inject(ServiceRequestService) private requestService: ServiceRequestService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
    this.requestService.getAllRequests().subscribe({
      next: (data) => {
        this.requests = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = "Erreur lors du chargement des demandes.";
        this.loading = false;
        console.error(err);
        this.cdr.detectChanges();
      }
    });
  }
}
