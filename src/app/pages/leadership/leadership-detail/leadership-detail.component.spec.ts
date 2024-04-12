import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LeadershipDetailComponent } from './leadership-detail.component';

describe('LeadershipDetailComponent', () => {
  let component: LeadershipDetailComponent;
  let fixture: ComponentFixture<LeadershipDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LeadershipDetailComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LeadershipDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
