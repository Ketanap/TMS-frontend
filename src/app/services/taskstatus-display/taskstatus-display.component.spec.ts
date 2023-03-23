import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskstatusDisplayComponent } from './taskstatus-display.component';

describe('TaskstatusDisplayComponent', () => {
  let component: TaskstatusDisplayComponent;
  let fixture: ComponentFixture<TaskstatusDisplayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskstatusDisplayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskstatusDisplayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
