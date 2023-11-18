import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TaskCardComponent } from './task-card.component';

describe('TaskCardComponent', () => {
  let component: TaskCardComponent;
  let fixture: ComponentFixture<TaskCardComponent>;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [ TaskCardComponent ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(TaskCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit statusChanged event when changeStatus is called', () => {
    const spy = spyOn(component.statusChanged, 'next');
    const taskId = 1700318033383;

    component.changeStatus(taskId);

    expect(spy).toHaveBeenCalledWith(taskId);
  });
});
