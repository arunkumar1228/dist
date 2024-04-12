import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ServiceCloudComponent } from './service-cloud.component';

describe('ServiceCloudComponent', () => {
  let component: ServiceCloudComponent;
  let fixture: ComponentFixture<ServiceCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ServiceCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ServiceCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
