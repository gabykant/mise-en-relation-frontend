import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-toast',
  imports: [CommonModule],
  template: `
    <div *ngIf="message" 
         [ngClass]="type === 'error' ? 'bg-red-500' : 'bg-green-500'"
         class="fixed top-5 right-5 px-6 py-3 text-white rounded shadow-lg z-50 transition-opacity">
      {{ message }}
    </div>
  `
})
export class Toast {
  @Input() message!: string;
  @Input() type!: 'success' | 'error' | 'warning';
}