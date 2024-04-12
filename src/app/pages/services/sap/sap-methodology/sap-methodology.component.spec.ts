import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapMethodologyComponent } from './sap-methodology.component';

describe('SapMethodologyComponent', () => {
  let component: SapMethodologyComponent;
  let fixture: ComponentFixture<SapMethodologyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapMethodologyComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapMethodologyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
