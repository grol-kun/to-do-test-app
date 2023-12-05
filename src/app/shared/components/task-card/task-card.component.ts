import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Task } from '../../models/interfaces/task.model';


@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss'],
  standalone: true,
  imports: [DatePipe],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TaskCardComponent {
  @Input() public task: Task | null = null;

  @Output() private statusChanged = new EventEmitter<number>();

  public changeStatus(id: number): void {
    this.statusChanged.next(id);
  }
}
