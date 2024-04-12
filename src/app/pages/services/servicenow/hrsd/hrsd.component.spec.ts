import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HrsdComponent } from './hrsd.component';

describe('HrsdComponent', () => {
  let component: HrsdComponent;
  let fixture: ComponentFixture<HrsdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HrsdComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HrsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
