import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { Artisan } from '@models/artisan.model';
import { ArtisanService } from '@services/artisan';
import { FilterPipe } from 'src/app/pipes/filter-pipe';
import { FormsModule, FormArray, FormBuilder, FormGroup } from '@angular/forms';


@Component({
  selector: 'app-artisan-list',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, FilterPipe],
  templateUrl: './artisan-list.html',
  styleUrl: './artisan-list.css',
})
export class ArtisanList implements OnInit {
  artisans: Artisan[] = [];
  loading = true;
  searchText: string = '';
  p: number = 1;
  pageSize: number = 10;
  // artisanForm: FormGroup;


  constructor(
    @Inject(ArtisanService) private artisanService: ArtisanService, 
    private router: Router, 
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {
      
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

  editArtisan(artisan: Artisan) {
    this.router.navigate(['/admin/artisans/edit', artisan.id]);
  }
}
