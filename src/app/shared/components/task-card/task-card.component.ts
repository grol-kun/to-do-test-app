import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { Task } from '../../models/interfaces/task.model';
import { DatePipe } from '@angular/common';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [DatePipe],
})
export class TaskCardComponent {
  @Input() task: Task | null = null;
  @Input() index: number | null = null;

  @Output() statusChanged = new EventEmitter<number>();

  public changeStatus(id: number): void {
    this.statusChanged.next(id);
  }
}
