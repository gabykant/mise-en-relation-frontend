import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ArtisanService } from '@services/artisan';
import { Router } from '@angular/router';
// import { PROFESSIONS, ZONES } from '@core/constants/constants';
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

  professions: Item[] = []; // Initialisé par l'appel API
  zones: Item[] = [];

  // Listes filtrées pour l'affichage
  filteredProfessions: Item[] = [];
  filteredZones: Item[] = [];

  // Variables pour stocker les IDs sélectionnés
  private selectedProfessionId: number | null = null;
  private selectedZoneId: number | null = null;

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

  ngOnInit(): void {
    // Récupérer les professions et zones depuis le service
    this.artisanService.getProfessions().subscribe({
      next: (data) => this.professions = this.filteredProfessions = data,
      error: (err) => console.error("Erreur lors du chargement des professions", err)
    });

    this.artisanService.getZones().subscribe({
      next: (data) => this.zones = this.filteredZones = data,
      error: (err) => console.error("Erreur lors du chargement des zones", err)
    });
  } 

  onSubmit() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.artisanForm.valid && this.selectedProfessionId && this.selectedZoneId) {

      const payload = {
        firstName: this.artisanForm.value.firstName,
        lastName: this.artisanForm.value.lastName,
        phoneNumber: this.artisanForm.value.phoneNumber,
        professionId: this.selectedProfessionId,
        zoneId: this.selectedZoneId
      };
      
      this.artisanService.registerArtisan(payload).subscribe({
        next: (response) => {
          this.successMessage = "Artisan enregistré avec succès.";
          this.artisanForm.reset();
          this.selectedProfessionId = null;
          this.selectedZoneId = null;

        },
        error: (err) => {
          this.errorMessage = err.error.message;
        }
      });
    } else {
      this.artisanForm.markAllAsTouched();
      this.errorMessage = "Veuillez remplir tous les champs requis.";
    }
  }

  // Filtrage à la saisie
  filterList(type: 'profession' | 'zone', event: any) {
    const value = event.target.value.toLowerCase();
    if (type === 'profession') {
      this.filteredProfessions = this.professions.filter(p => p.name.toLowerCase().includes(value));
    } else {
      this.filteredZones = this.zones.filter(z => z.name.toLowerCase().includes(value));
      this.showZoneList = true;
    }
  }

  selectItem(type: 'profession' | 'zone', item: Item) {
    if (type === 'profession') {
      this.selectedProfessionId = item.id;
      this.artisanForm.patchValue({ profession: item.name });
      this.showProfessionList = false;
    } else {
      this.selectedZoneId = item.id;
      this.artisanForm.patchValue({ zone: item.name });
      this.showZoneList = false;
    }
  }
}
