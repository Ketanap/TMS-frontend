import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TaskstatusAddComponent } from './taskstatus-add.component';

describe('TaskstatusAddComponent', () => {
  let component: TaskstatusAddComponent;
  let fixture: ComponentFixture<TaskstatusAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TaskstatusAddComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskstatusAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
