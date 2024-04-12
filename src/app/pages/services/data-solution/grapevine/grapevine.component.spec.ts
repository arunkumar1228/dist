import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GrapevineComponent } from './grapevine.component';

describe('GrapevineComponent', () => {
  let component: GrapevineComponent;
  let fixture: ComponentFixture<GrapevineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GrapevineComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GrapevineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
