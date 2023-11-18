import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../models/interfaces/task.model';
import { SortedTasks } from '../models/interfaces/sorted-tasks.model';

@Pipe({
  name: 'taskSort',
  standalone: true,
})
export class TaskSortPipe implements PipeTransform {
  transform(tasks: Task[], minDate: string): SortedTasks {
    const today = new Date(minDate);

    const result = tasks.reduce(
      (acc: SortedTasks, task) => {
        if (!task.completed && new Date(task.dueDate) < today) {
          acc.expired.push(task);
        } else if (task.completed) {
          acc.completed.push(task);
        } else {
          acc.inprogress.push(task);
        }
        return acc;
      },
      { expired: [], inprogress: [], completed: [] }
    );

    const { expired, inprogress, completed } = result;
    const dateSort = (a: Task, b: Task) => +new Date(a.dueDate) - +new Date(b.dueDate);

    return {
      expired: expired.sort(dateSort),
      inprogress: inprogress.sort(dateSort),
      completed: completed.sort(dateSort),
    };
  }
}
