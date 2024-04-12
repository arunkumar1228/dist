import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CpqComponent } from './cpq.component';

describe('CpqComponent', () => {
  let component: CpqComponent;
  let fixture: ComponentFixture<CpqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CpqComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CpqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
