import { Pipe, PipeTransform } from '@angular/core';

import { Task } from '../models/interfaces/task.model';
import { SortedTasks } from '../models/interfaces/sorted-tasks.model';
import { FilterType } from '../models/enums/filter-type.enum';

@Pipe({
  name: 'taskFilter',
  standalone: true,
})
export class TaskFilterPipe implements PipeTransform {
  public transform(sortedTasks: SortedTasks, filterType: FilterType | null): Task[] {
    const { expired, inprogress, completed } = sortedTasks;

    switch(filterType) {
      case FilterType.DONE:
        return completed;
      case FilterType.EXPIRED:
        return expired;
      default:
        return [...expired, ...inprogress, ...completed];
    }
  }
}
