import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataGovernanceComponent } from './data-governance.component';

describe('DataGovernanceComponent', () => {
  let component: DataGovernanceComponent;
  let fixture: ComponentFixture<DataGovernanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataGovernanceComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataGovernanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
