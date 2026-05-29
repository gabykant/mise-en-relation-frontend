import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
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
    private router: Router, private cdr: ChangeDetectorRef) {
      
    }

  ngOnInit(): void {
    this.artisanService.getAllArtisans().subscribe({
      next: (data) => {
        this.artisans = data;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        console.log(err);
        this.loading = false;
        this.cdr.detectChanges();
      },
    });
  }

  goToCreate() {
    this.router.navigate(['/admin/artisans/create']);
  }
}
