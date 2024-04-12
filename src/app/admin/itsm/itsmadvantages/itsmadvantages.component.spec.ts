import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItsmadvantagesComponent } from './itsmadvantages.component';

describe('ItsmadvantagesComponent', () => {
  let component: ItsmadvantagesComponent;
  let fixture: ComponentFixture<ItsmadvantagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItsmadvantagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItsmadvantagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
