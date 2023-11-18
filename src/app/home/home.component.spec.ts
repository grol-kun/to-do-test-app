import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './home.component';
import { TaskCardComponent } from '../shared/components/task-card/task-card.component';
import { TaskSortPipe } from '../shared/pipes/task-sort.pipe';
import { TaskFilterPipe } from '../shared/pipes/task-filter.pipe';
import { StorageService } from '../shared/services/storage.service';
import { TASKS_KEY } from '../shared/models/constants/app.constant';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let storageService: StorageService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HomeComponent, TaskCardComponent, TaskSortPipe, TaskFilterPipe, ReactiveFormsModule],
      providers: [StorageService],
    });

    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    storageService = TestBed.inject(StorageService);

    spyOn(storageService, 'getItem').and.returnValue([]);
    spyOn(storageService, 'setItem');
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize form and tasks on ngOnInit', () => {
    component.ngOnInit();

    expect(component.taskForm).toBeTruthy();
    expect(component.taskForm.value.newTask).toBe('');
    expect(component.taskForm.value.completed).toBe(false);
    expect(component.taskForm.value.dueDate).toBe(component.minDate);

    expect(storageService.getItem).toHaveBeenCalledWith(TASKS_KEY);
    expect(component.tasks).toEqual([]);
  });

  it('should add a task on addTask', () => {
    fixture.detectChanges();
    // @ts-ignore
    spyOn(component, 'getTask').and.returnValue({
      name: 'Test Task',
      completed: false,
      dueDate: component.minDate,
      id: 123456789,
    });
    spyOn(component, 'saveTasks');
    const resetSpy = spyOn(component.taskForm, 'reset').and.callThrough();

    component.addTask();

    expect(component.tasks.length).toBe(1);
    expect(component.saveTasks).toHaveBeenCalledWith(component.tasks);
    expect(resetSpy).toHaveBeenCalledOnceWith({
      dueDate: component.minDate,
    });
  });

  it('should delete a task on deleteTask', () => {
    const task = { name: 'Test Task', completed: false, dueDate: component.minDate, id: 123 };
    component.tasks = [task];

    spyOn(component, 'saveTasks').and.callThrough();

    component.deleteTask(0);

    expect(component.saveTasks).toHaveBeenCalledWith([]);
  });

  it('should change task status on changeStatus', () => {
    const task = { name: 'Test Task', completed: false, dueDate: component.minDate, id: 123 };
    component.tasks = [task];

    spyOn(component, 'saveTasks').and.callThrough();

    component.changeStatus(123);

    expect(component.saveTasks).toHaveBeenCalledWith([{ ...task, completed: true }]);
  });
});
