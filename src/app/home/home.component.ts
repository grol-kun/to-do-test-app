import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

import { Task } from '../shared/models/interfaces/task.model';
import { StorageService } from '../shared/services/storage.service';
import { TaskCardComponent } from '../shared/components/task-card/task-card.component';
import { TASKS_KEY } from '../shared/models/constants/app.constant';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [ReactiveFormsModule, TaskCardComponent],
  standalone: true,
})
export class HomeComponent implements OnInit {
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
      dueDate: [this.minDate],
    });
  }

  public addTask(): void {
    const task = this.getTask();
    this.tasks.push(task);

    this.saveTasks();

    this.taskForm.reset({
      dueDate: [this.minDate],
    });
  }

  public deleteTask(index: number): void {
    this.tasks.splice(index, 1);
    this.saveTasks();
  }

  public changeStatus(id: number): void {
    this.tasks = this.tasks.map((task) =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    this.saveTasks();
  }

  public saveTasks(): void {
    this.storage.setItem(TASKS_KEY, this.tasks);
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
