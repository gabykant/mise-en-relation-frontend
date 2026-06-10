import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ArtisanService } from '@services/artisan';
import { Artisan } from '@models/artisan.model';


@Component({
  selector: 'app-artisan-view',
  imports: [CommonModule],
  templateUrl: './artisan-view.html',
  styleUrl: './artisan-view.css',
})
export class ArtisanView implements OnInit {

  artisan: Artisan | null = null;
  artisanInterventions: any[] = [];
  isLoadingInterventions = true;

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {
  }

  ngOnInit(): void {
    const artisanId = this.route.snapshot.paramMap.get('id');
    if (artisanId) {
      this.loadArtisanData(artisanId);
    }
  }

  loadArtisanData(artisanId: string) {
    this.artisanService.getById(artisanId).subscribe({
      next: (data) => {
        this.artisan = data;
      },
      error: (err) => console.error("Erreur chargement artisan", err)
    });
  }

  loadInterventions(artisanId: string) {
    this.isLoadingInterventions = true;
    // Ajout de l'appel vers la nouvelle route du contrôleur
    this.artisanService.getMissionsByArtisanId(artisanId).subscribe({
      next: (interventions) => {
        this.artisanInterventions = interventions;
        this.isLoadingInterventions = false;
      },
      error: (err) => {
        console.error("Erreur chargement interventions", err);
        this.isLoadingInterventions = false;
      }
    });
  }
}
