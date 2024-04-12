import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MuleSoftComponent } from './mule-soft.component';

describe('MuleSoftComponent', () => {
  let component: MuleSoftComponent;
  let fixture: ComponentFixture<MuleSoftComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MuleSoftComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MuleSoftComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
