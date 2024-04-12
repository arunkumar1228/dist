import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OurcultureComponent } from './ourculture.component';

describe('OurcultureComponent', () => {
  let component: OurcultureComponent;
  let fixture: ComponentFixture<OurcultureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OurcultureComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OurcultureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
