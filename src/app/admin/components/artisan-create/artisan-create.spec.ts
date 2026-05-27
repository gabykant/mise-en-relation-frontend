import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanCreate } from './artisan-create';

describe('ArtisanCreate', () => {
  let component: ArtisanCreate;
  let fixture: ComponentFixture<ArtisanCreate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanCreate],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtisanCreate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
