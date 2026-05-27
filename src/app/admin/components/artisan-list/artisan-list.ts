import { Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Artisan } from '@models/artisan.model';
import { ArtisanService } from '@services/artisan';


@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './artisan-list.html',
  styleUrl: './artisan-list.css',
})
export class ArtisanList implements OnInit {
  artisans: Artisan[] = [];
  loading = true;

  constructor(
    @Inject(ArtisanService) private artisanService: ArtisanService, 
    private router: Router) {
      
    }

  ngOnInit(): void {
    this.artisanService.getAllArtisans().subscribe(data => {
      this.artisans = data;
      console.log('Artisans:', this.artisans);
      this.loading = false;
    });
  }

  goToCreate() {
    this.router.navigate(['/admin/artisans/create']);
  }
}
