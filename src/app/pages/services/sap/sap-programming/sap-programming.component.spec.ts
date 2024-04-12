import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapProgrammingComponent } from './sap-programming.component';

describe('SapProgrammingComponent', () => {
  let component: SapProgrammingComponent;
  let fixture: ComponentFixture<SapProgrammingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapProgrammingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapProgrammingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
