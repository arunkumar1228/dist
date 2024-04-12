import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LakshmanInfoComponent } from './lakshman-info.component';

describe('LakshmanInfoComponent', () => {
  let component: LakshmanInfoComponent;
  let fixture: ComponentFixture<LakshmanInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LakshmanInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LakshmanInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
