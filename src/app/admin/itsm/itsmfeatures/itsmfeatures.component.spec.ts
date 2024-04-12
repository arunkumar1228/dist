import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsmfeaturesComponent } from './itsmfeatures.component';

describe('ItsmfeaturesComponent', () => {
  let component: ItsmfeaturesComponent;
  let fixture: ComponentFixture<ItsmfeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItsmfeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsmfeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
