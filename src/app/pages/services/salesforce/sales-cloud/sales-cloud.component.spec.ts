import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesCloudComponent } from './sales-cloud.component';

describe('SalesCloudComponent', () => {
  let component: SalesCloudComponent;
  let fixture: ComponentFixture<SalesCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SalesCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SalesCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
