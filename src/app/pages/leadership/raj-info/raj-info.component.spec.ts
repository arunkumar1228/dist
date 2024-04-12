import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RajInfoComponent } from './raj-info.component';

describe('RajInfoComponent', () => {
  let component: RajInfoComponent;
  let fixture: ComponentFixture<RajInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RajInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RajInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
