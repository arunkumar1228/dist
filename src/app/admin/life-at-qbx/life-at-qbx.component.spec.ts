import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LifeAtQbxComponent } from './life-at-qbx.component';

describe('LifeAtQbxComponent', () => {
  let component: LifeAtQbxComponent;
  let fixture: ComponentFixture<LifeAtQbxComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LifeAtQbxComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LifeAtQbxComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
