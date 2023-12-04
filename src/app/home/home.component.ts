import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { TaskCardComponent } from '../shared/components/task-card/task-card.component';
import { StorageService } from '../shared/services/storage.service';
import { TaskSortPipe } from '../shared/pipes/task-sort.pipe';
import { TaskFilterPipe } from '../shared/pipes/task-filter.pipe';

import { Task } from '../shared/models/interfaces/task.model';
import { TASKS_KEY } from '../shared/models/constants/app.constant';
import { FilterType } from '../shared/models/enums/filter-type.enum';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [
    ReactiveFormsModule,
    TaskCardComponent,
    TaskSortPipe,
    TaskFilterPipe,
  ],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements OnInit {
  @Input() filterType: FilterType | null = null;

  taskForm!: FormGroup;

  tasks: Task[] = [];
  minDate: string = new Date().toISOString().split('T')[0];

  constructor(
    private fb: FormBuilder,
    private storage: StorageService,
  ) {}

  public ngOnInit(): void {
    this.tasks = this.storage.getItem(TASKS_KEY);

    this.taskForm = this.fb.group({
      newTask: ['', Validators.required],
      completed: [false],
      dueDate: this.minDate,
    });
  }

  public addTask(): void {
    const task = this.getTask();
    this.tasks.push(task);

    this.saveTasks(this.tasks);

    this.taskForm.reset({
      dueDate: this.minDate,
    });
  }

  public deleteTask(id: number): void {
    const index = this.tasks.findIndex((item) => item.id === id);
    this.tasks.splice(index, 1);
    this.saveTasks(this.tasks);
  }

  public changeStatus(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks(this.tasks);
  }

  public saveTasks(tasks: Task[]): void {
    this.storage.setItem(TASKS_KEY, tasks);
    this.tasks = [...tasks];
  }

  private getTask(): Task {
    return {
      name: this.taskForm.value.newTask,
      completed: false,
      dueDate: this.taskForm.value.dueDate,
      id: Date.now(),
    };
  }
}
