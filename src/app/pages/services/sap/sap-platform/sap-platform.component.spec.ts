import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SapPlatformComponent } from './sap-platform.component';

describe('SapPlatformComponent', () => {
  let component: SapPlatformComponent;
  let fixture: ComponentFixture<SapPlatformComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SapPlatformComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SapPlatformComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
