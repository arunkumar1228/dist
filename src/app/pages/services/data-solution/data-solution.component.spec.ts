import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataSolutionComponent } from './data-solution.component';

describe('DataSolutionComponent', () => {
  let component: DataSolutionComponent;
  let fixture: ComponentFixture<DataSolutionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataSolutionComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DataSolutionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
