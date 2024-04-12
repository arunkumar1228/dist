import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommerceCloudComponent } from './commerce-cloud.component';

describe('CommerceCloudComponent', () => {
  let component: CommerceCloudComponent;
  let fixture: ComponentFixture<CommerceCloudComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CommerceCloudComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CommerceCloudComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
