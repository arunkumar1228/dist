import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SnowflakeChatComponent } from './snowflake-chat.component';

describe('SnowflakeChatComponent', () => {
  let component: SnowflakeChatComponent;
  let fixture: ComponentFixture<SnowflakeChatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SnowflakeChatComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SnowflakeChatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
