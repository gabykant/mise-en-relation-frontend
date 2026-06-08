import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanEdit } from './artisan-edit';

describe('ArtisanEdit', () => {
  let component: ArtisanEdit;
  let fixture: ComponentFixture<ArtisanEdit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanEdit],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtisanEdit);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
