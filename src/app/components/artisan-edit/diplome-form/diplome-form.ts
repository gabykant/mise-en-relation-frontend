import { Component, Input } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-diplome-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  template: `
    <div [formGroup]="parentForm" class="p-4 bg-gray-50 mt-4">
      <h3 class="font-bold mb-2">Cursus Académique</h3>
      
      <div formArrayName="diplomas">
        <div *ngFor="let diplome of diplomas.controls; let i = index" [formGroupName]="i" class="flex gap-2 mb-2 items-center">
          <input formControlName="certificate_name" placeholder="Nom du diplôme" class="border p-2 rounded w-1/3">
          <input formControlName="start_date" type="date" class="border p-2 rounded">
          <input formControlName="end_date" type="date" class="border p-2 rounded">
          
          <button type="button" (click)="removeDiplome(i)" class="text-red-500 font-bold px-2">X</button>
        </div>
      </div>

      <button type="button" (click)="addDiplome()" class="mt-2 bg-blue-500 text-white px-4 py-1 rounded">
        + Ajouter un diplôme
      </button>
    </div>
  `
})
export class DiplomeForm {
  @Input() parentForm!: FormGroup;

  constructor(private fb: FormBuilder) {}

  // Getter pour accéder facilement au FormArray
  get diplomas(): FormArray {
    return this.parentForm.get('diplomas') as FormArray;
  }

  // Création d'un groupe vide pour un nouveau diplôme
  addDiplome(data = { certificate_name: '', start_date: '', end_date: '' }) {
    const diplomeGroup = this.fb.group({
      certificate_name: [data.certificate_name],
      start_date: [data.start_date],
      end_date: [data.end_date]
    });
    this.diplomas.push(diplomeGroup);
  }

  removeDiplome(index: number) {
    this.diplomas.removeAt(index);
  }
}
