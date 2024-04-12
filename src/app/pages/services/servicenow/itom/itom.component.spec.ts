import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItomComponent } from './itom.component';

describe('ItomComponent', () => {
  let component: ItomComponent;
  let fixture: ComponentFixture<ItomComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItomComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItomComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
