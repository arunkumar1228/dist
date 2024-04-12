import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataDrivenGovernmentComponent } from './data-driven-government.component';

describe('DataDrivenGovernmentComponent', () => {
  let component: DataDrivenGovernmentComponent;
  let fixture: ComponentFixture<DataDrivenGovernmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataDrivenGovernmentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataDrivenGovernmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
