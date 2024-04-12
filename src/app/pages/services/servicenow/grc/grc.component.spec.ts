import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrcComponent } from './grc.component';

describe('GrcComponent', () => {
  let component: GrcComponent;
  let fixture: ComponentFixture<GrcComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrcComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GrcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
