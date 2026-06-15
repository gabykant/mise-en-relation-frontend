import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { ArtisanService } from '@services/artisan';
import { Router } from '@angular/router';
import { FilterPipe } from 'src/app/pipes/filter-pipe';
import { FormsModule, FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';


@Component({
  selector: 'app-zone',
  imports: [CommonModule, RouterModule, FormsModule, FilterPipe],
  templateUrl: './zone.html',
  styleUrl: './zone.css',
})
export class Zone implements OnInit {

  zones: any[] = [];
  loading = true;

  constructor(
    @Inject(ArtisanService) private artisanService: ArtisanService, 
    private router: Router, 
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef) {
      
  }

  ngOnInit(): void {
    this.artisanService.getZones().subscribe({
      next: (data) => {
        this.zones = data;
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
    this.router.navigate(['/admin/areas']);
  }

  // editZone(zone: any) {
  //   this.router.navigate(['/admin/areas/edit', zone.id]);
  // }

  // viewZone(zone: any) {
  //   this.router.navigate(['/admin/areas/view', zone.id]);
  // }

}
