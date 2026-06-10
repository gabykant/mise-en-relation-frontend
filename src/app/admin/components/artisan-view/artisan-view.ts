import { Component } from '@angular/core';
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
export class ArtisanView {

  artisan: Artisan | null = null;
  artisanInterventions: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private artisanService: ArtisanService
  ) {
    const artisanId = this.route.snapshot.paramMap.get('id');
    if (artisanId) {
      this.loadArtisanData(artisanId);
    }
  }

  loadArtisanData(artisanId: string) {
    this.artisanService.getById(artisanId).subscribe(data => {
      this.artisan = data;
      
      // Tri par date décroissante
      this.artisanInterventions = data.interventions.sort((a, b) => 
        new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
      );
    });
  }
}
