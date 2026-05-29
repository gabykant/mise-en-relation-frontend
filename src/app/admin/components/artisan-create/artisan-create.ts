import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtisanService } from '@services/artisan';
import { Router } from '@angular/router';
import { PROFESSIONS, ZONES } from '@core/constants/constants';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-artisan-create',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './artisan-create.html',
  styleUrl: './artisan-create.css',
})
export class ArtisanCreate {
  artisanForm: FormGroup;
  errorMessage: string | null = null;
  successMessage: string | null = null;
  professions = PROFESSIONS;
  zones = ZONES;

  // Listes filtrées pour l'affichage
  filteredProfessions = [...PROFESSIONS];
  filteredZones = [...ZONES];

  showProfessionList = false;
  showZoneList = false;

  constructor(
    private fb: FormBuilder, 
    @Inject(ArtisanService) private artisanService: ArtisanService, 
    @Inject(Router) private router: Router) {
    this.artisanForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', [
        Validators.required, 
        Validators.pattern('^\\+?[1-9]\\d{8,14}$') 
      ]],
      profession: ['', Validators.required],
      zone: ['', Validators.required]
    });
  }

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.artisanForm.valid) {
      this.artisanService.registerArtisan(this.artisanForm.value).subscribe({
        next: (response) => {
          this.successMessage = "Artisan enregistré avec succès.";
          this.artisanForm.reset();
          setTimeout(() => this.successMessage = null, 5000);
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          setTimeout(() => this.errorMessage = null, 5000);
        }
      });
    } else {
      this.artisanForm.markAllAsTouched();
      this.errorMessage = "Veuillez remplir tous les champs requis.";
      setTimeout(() => this.errorMessage = null, 5000);
    }
  }

  // Filtrage à la saisie
  filterList(type: 'profession' | 'zone', event: any) {
    const value = event.target.value.toLowerCase();
    if (type === 'profession') {
      this.filteredProfessions = this.professions.filter(p => p.toLowerCase().includes(value));
      this.showProfessionList = true;
    } else {
      this.filteredZones = this.zones.filter(z => z.toLowerCase().includes(value));
      this.showZoneList = true;
    }
  }

  selectItem(type: 'profession' | 'zone', item: string) {
    if (type === 'profession') {
      this.artisanForm.patchValue({ profession: item });
      this.showProfessionList = false;
    } else {
      this.artisanForm.patchValue({ zone: item });
      this.showZoneList = false;
    }
  }
}
