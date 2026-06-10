import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArtisanView } from './artisan-view';

describe('ArtisanView', () => {
  let component: ArtisanView;
  let fixture: ComponentFixture<ArtisanView>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArtisanView],
    }).compileComponents();

    fixture = TestBed.createComponent(ArtisanView);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
