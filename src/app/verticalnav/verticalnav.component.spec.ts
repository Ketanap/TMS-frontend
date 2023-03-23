import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VerticalnavComponent } from './verticalnav.component';

describe('VerticalnavComponent', () => {
  let component: VerticalnavComponent;
  let fixture: ComponentFixture<VerticalnavComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VerticalnavComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VerticalnavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
