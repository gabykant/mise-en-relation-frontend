import { Component, Input, Inject, Output, EventEmitter} from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ArtisanService } from '@services/artisan';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-profile-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template:`
    <div [formGroup]="parentForm" class="p-4 bg-gray-50">
      <h3 class="font-bold mb-2">Informations Personnelles</h3>
      
      <div class="grid grid-cols-2 gap-4">
        <input formControlName="firstName" id="firstName" placeholder="Prénom" class="border p-2 rounded">
        <input formControlName="lastName" id="lastName" placeholder="Nom" class="border p-2 rounded">
        <input formControlName="phoneNumber" id="phoneNumber" placeholder="Numéro de téléphone" class="border p-2 rounded col-span-2">

        <div class="relative">
          <label class="block text-xs font-medium text-gray-500">Métier</label>
          <input type="text" formControlName="profession"
            (input)="filterList('profession', $event)"
            (focus)="showProfessionList = true"
            (focus)="clearAndShowList('profession')"
            (onBlur)="showProfessionList = false"
            class="w-full border p-2 rounded col-span-2">
          <div *ngIf="showProfessionList" class="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-auto">
            <div *ngFor="let profession of filteredProfessions" (mousedown)="selectItem('profession', profession)"
              class="px-2 py-1 hover:bg-gray-200 cursor-pointer">
              {{ profession.displayName }}
            </div>
          </div>
        </div>
        <div class="relative">
          <label class="block text-xs font-medium text-gray-500">Zone</label>
          <input type="text" formControlName="zone"
            (input)="filterList('zone', $event)"
            (focus)="showZoneList = true"
            (focus)="clearAndShowList('zone')"
            (onBlur)="showZoneList = false"
            class="w-full border p-2 rounded col-span-2">
          <div *ngIf="showZoneList" class="absolute z-10 bg-white border w-full mt-1 max-h-40 overflow-auto">
            <div *ngFor="let zone of filteredZones" (mousedown)="selectItem('zone', zone)"
              class="px-2 py-1 hover:bg-gray-200 cursor-pointer">
              {{ zone.name }}
            </div>
          </div>
        </div>
      </div>
    </div>
  `
})
export class ProfileForm {
  @Input() parentForm!: FormGroup;

  // Données brutes provenant du backend
  private professions: any[] = [];
  private zones: any[] = [];

  // Données pour le filtrage
  filteredProfessions: any[] = [];
  filteredZones: any[] = [];

    // Variables pour stocker les IDs sélectionnés
  private selectedProfessionId: string | null = null;
  private selectedZoneId: string | null = null;

  // États pour les dropdowns
  showProfessionList = false;
  showZoneList = false;

  @Output() professionSelected = new EventEmitter<string>();
  @Output() zoneSelected = new EventEmitter<string>();

  constructor(
    private fb: FormBuilder, 
    @Inject(ArtisanService) private artisanService: ArtisanService, 
  ) {}

  // ngOnInit() {
  //   this.artisanService.getProfessions().subscribe({
  //     next: (data) => this.professions = this.filteredProfessions = data,
  //     error: (err) => console.error("Erreur lors du chargement des professions", err)
  //   });

  //   this.artisanService.getZones().subscribe({
  //     next: (data) => this.zones = this.filteredZones = data,
  //     error: (err) => console.error("Erreur lors du chargement des zones", err)
  //   });
  // }
  ngOnInit() {
  // 1. On charge les listes de référence
    forkJoin({
      professions: this.artisanService.getProfessions(),
      zones: this.artisanService.getZones()
    }).subscribe({
      next: (res) => {
        this.professions = this.filteredProfessions = res.professions;
        this.zones = this.filteredZones = res.zones;

        // 2. Une fois les listes chargées, on tente de mapper l'ID par défaut
        const currentProfId = this.parentForm.get('profession')?.value;
        const currentZoneId = this.parentForm.get('zone')?.value;

        if (currentProfId) {
          const p = this.professions.find(x => x.id === currentProfId);
          if (p) {
            this.parentForm.patchValue({ profession: p.displayName });
            this.selectedProfessionId = p.id;
          }
        }

        if (currentZoneId) {
          const z = this.zones.find(x => x.id === currentZoneId);
          if (z) {
            this.parentForm.patchValue({ zone: z.name });
            this.selectedZoneId = z.id;
          }
        }
      },
      error: (err) => console.error("Erreur lors du chargement des données", err)
    });
  }

  filterList(type: 'profession' | 'zone', event: any) {
    const value = event.target.value.toLowerCase();
    if (type === 'profession') {
      this.filteredProfessions = this.professions.filter(p => 
        p.displayName.toLowerCase().includes(value));
    } else {
      this.filteredZones = this.zones.filter(z => 
        z.name.toLowerCase().includes(value));
    }
  }

  selectItem(type: 'profession' | 'zone', item: any) {
    // Mise à jour directe du formulaire
    
    // Fermeture des listes
    if (type === 'profession') {
      const prod = item as Profession;
      this.professionSelected.emit(prod.id);
      this.selectedProfessionId = prod.id;
      this.parentForm.patchValue({ [type]: item.displayName });
      this.showProfessionList = false;
    } else {
      const z = item as Zone;
      this.zoneSelected.emit(z.id);
      this.selectedZoneId = z.id;
      this.parentForm.patchValue({ [type]: item.name });
      this.showZoneList = false;
    }
  }

  clearAndShowList(type: 'profession' | 'zone') {
    if (type === 'profession') {
      this.parentForm.patchValue({ profession: '' });
      this.showProfessionList = true;
      this.selectedProfessionId = null; // Important : invalider l'ID sélectionné
    } else {
      this.parentForm.patchValue({ zone: '' });
      this.showZoneList = true;
      this.selectedZoneId = null; // Important : invalider l'ID sélectionné
    }
  }

  isUuid(value: string): boolean {
    return /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value);
  }
}
