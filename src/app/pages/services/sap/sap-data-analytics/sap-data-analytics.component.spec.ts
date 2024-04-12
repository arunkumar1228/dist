import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapDataAnalyticsComponent } from './sap-data-analytics.component';

describe('SapDataAnalyticsComponent', () => {
  let component: SapDataAnalyticsComponent;
  let fixture: ComponentFixture<SapDataAnalyticsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapDataAnalyticsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapDataAnalyticsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
