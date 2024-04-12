import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MarketingCloudComponent } from './marketing-cloud.component';

describe('MarketingCloudComponent', () => {
  let component: MarketingCloudComponent;
  let fixture: ComponentFixture<MarketingCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MarketingCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MarketingCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
