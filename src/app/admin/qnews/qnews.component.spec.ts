import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QnewsComponent } from './qnews.component';

describe('QnewsComponent', () => {
  let component: QnewsComponent;
  let fixture: ComponentFixture<QnewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QnewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QnewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
