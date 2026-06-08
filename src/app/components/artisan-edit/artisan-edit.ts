import { Component, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, ReactiveFormsModule } from '@angular/forms';
import { DiplomeForm } from './diplome-form/diplome-form';
import { ProfileForm } from './profile-form/profile-form';
import { ArtisanService } from '@services/artisan';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpEventType } from '@angular/common/http';
import { ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'app-artisan-edit',
  templateUrl: './artisan-edit.html',
  styleUrl: './artisan-edit.css',
  imports: [ProfileForm, DiplomeForm, ReactiveFormsModule, CommonModule],
  standalone: true,
  providers: [FormBuilder]
})
export class ArtisanEdit {
  parentForm: FormGroup;
  isLoading = false;
  errorMessage: string | null = null;
  successMessage: string | null = null;

  uploadProgress: number = 0;
  isUploading: boolean = false;
  
  // @ViewChild(DiplomeForm) diplomeForm!: DiplomeForm;
  // @ViewChild(ProfileForm) profileForm!: ProfileForm;

  // Variables locales pour stocker les IDs remontés
  selectedProfessionId: string | null = null;
  selectedZoneId: string | null = null;

  // Méthodes pour capturer les événements de l'enfant
  onProfessionSelected(id: string) { this.selectedProfessionId = id; }
  onZoneSelected(id: string) { this.selectedZoneId = id; }

  photo_url: string | null = null;
  selectedFile: File | null = null;

  constructor(private fb: FormBuilder, private artisanService: ArtisanService, private route: ActivatedRoute, private cdr: ChangeDetectorRef) {
    this.parentForm = this.fb.group({
      id: [''], // Champ pour stocker l'ID de l'artisan
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      phoneNumber: ['', Validators.required],
      profession: ['', Validators.required],
      zone: ['', Validators.required],
      // Liste dynamique pour les diplômes
      diplomas: this.fb.array([]),
      photo_url : ['']
    });

  }

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');

    if (id) {
        this.loadArtisan(id);
    }
  }

  private loadArtisan(id: string) {
    this.isLoading = true;
    this.artisanService.getById(id).subscribe({
      next: (data) => {
        this.parentForm.patchValue(data);
        this.selectedProfessionId = data.profession; 
        this.selectedZoneId = data.zone;
        this.photo_url = data.photo_url;

        // 2. Peuplement du FormArray
        const diplomeArray = this.parentForm.get('diplomas') as FormArray;
        diplomeArray.clear();

        if (data.diplomas) {
          data.diplomas.forEach((d: any) => {
            // this.diplomeForm.addDiplome(d);
            diplomeArray.push(this.fb.group({
              certificate_name: [d.certificate_name, Validators.required],
              start_date: [d.start_date, Validators.required],
              end_date: [d.end_date]
            }));
           console.log('Diplôme ajouté:', d)
          });
        }
        this.isLoading = false;
        console.log(this.isLoading)
      },
      error: (err) => {
        this.errorMessage = 'Erreur lors du chargement de l\'artisan.';
        console.error(err);
        this.isLoading = false;
      }
    });
  }

  save() {
    this.errorMessage = null;
    this.successMessage = null;

    if (this.parentForm.valid && this.selectedProfessionId && this.selectedZoneId) {
      const id = this.parentForm.get('id')?.value;

      const payload = {
        ...this.parentForm.value,
        profession: this.selectedProfessionId,
        zone: this.selectedZoneId
      };
      // Envoi de l'objet complet au backend (PUT)
      this.artisanService.update(id, payload).subscribe({
        next: (response) => {
          if(this.selectedFile) {
            this.isUploading = true;
            this.artisanService.uploadAvatar(id, this.selectedFile).subscribe({
              next: (event: any) => {
                if (event.type === HttpEventType.UploadProgress) {
                  this.uploadProgress = Math.round(100 * event.loaded / event.total);
                } else if (event.type === HttpEventType.Response) {
                  this.isUploading = false;
                  this.uploadProgress = 0;
                  this.selectedFile = null;
                  this.successMessage = 'Avatar mis à jour avec succès';
                  this.cdr.detectChanges();
                }
              },
              error: (err) => {
                this.errorMessage = 'Erreur lors de la mise à jour de l\'avatar';
                this.isUploading = false;
              }
            });
          } else {
            this.successMessage = "Artisan enregistré avec succès.";
            this.cdr.detectChanges();
            // this.selectedProfessionId = null;
            // this.selectedZoneId = null;
          }
        },
        error: (err) => {
          this.errorMessage = err.error.message;
          this.isUploading = false;
        }
      });
    }  else {
      this.parentForm.markAllAsTouched();
      this.errorMessage = "Veuillez remplir tous les champs requis." + (this.selectedProfessionId ? "" : " Le métier est requis.") + (this.selectedZoneId ? "" : " La zone est requise.");
    }
  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.isUploading = true;
      this.selectedFile = file;
      // Prévisualisation locale immédiate
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.photo_url = e.target.result;
        this.cdr.detectChanges();
      }

      reader.readAsDataURL(file);

    } else if (event.type === HttpEventType.Response) {
      this.isUploading = false;

      const updatedArtisan = event.body;

      this.photo_url = updatedArtisan.photo_url;
      this.parentForm.patchValue({ photo_url: updatedArtisan.photo_url });
      this.selectedFile = null;
    } else {
      this.errorMessage = 'Aucun fichier sélectionné.';
    }
  }

  getAvatarUrl(filename: string): string {
    return this.artisanService.getAvatarUrl(filename);
  }
}