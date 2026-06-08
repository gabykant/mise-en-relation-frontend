import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomeForm } from './diplome-form';

describe('DiplomeForm', () => {
  let component: DiplomeForm;
  let fixture: ComponentFixture<DiplomeForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DiplomeForm],
    }).compileComponents();

    fixture = TestBed.createComponent(DiplomeForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
