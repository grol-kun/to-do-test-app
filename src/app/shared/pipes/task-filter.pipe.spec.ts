import { TaskFilterPipe } from './task-filter.pipe';
import { SortedTasks } from '../models/interfaces/sorted-tasks.model';
import { FilterType } from '../models/enums/filter-type.enum';

describe('TaskFilterPipe', () => {
  const pipe = new TaskFilterPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should return all tasks for null filterType', () => {
    const sortedTasks: SortedTasks = {
      expired: [{ id: 1, name: 'Task 1', completed: false, dueDate: '2023-12-01' }],
      inprogress: [{ id: 2, name: 'Task 2', completed: false, dueDate: '2023-12-02' }],
      completed: [{ id: 3, name: 'Task 3', completed: true, dueDate: '2023-12-03' }],
    };

    const result = pipe.transform(sortedTasks, null);

    expect(result.length).toBe(3);
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
    expect(result[2].id).toBe(3);
  });

  it('should return completed tasks for FilterType.DONE', () => {
    const sortedTasks: SortedTasks = {
      expired: [{ id: 1, name: 'Task 1', completed: false, dueDate: '2023-12-01' }],
      inprogress: [{ id: 2, name: 'Task 2', completed: false, dueDate: '2023-12-02' }],
      completed: [{ id: 3, name: 'Task 3', completed: true, dueDate: '2023-12-03' }],
    };

    const result = pipe.transform(sortedTasks, FilterType.DONE);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(3);
  });

  it('should return expired tasks for FilterType.EXPIRED', () => {
    const sortedTasks: SortedTasks = {
      expired: [{ id: 1, name: 'Task 1', completed: false, dueDate: '2023-12-01' }],
      inprogress: [{ id: 2, name: 'Task 2', completed: false, dueDate: '2023-12-02' }],
      completed: [{ id: 3, name: 'Task 3', completed: true, dueDate: '2023-12-03' }],
    };

    const result = pipe.transform(sortedTasks, FilterType.EXPIRED);

    expect(result.length).toBe(1);
    expect(result[0].id).toBe(1);
  });

  it('should return all tasks for unknown filterType', () => {
    const sortedTasks: SortedTasks = {
      expired: [{ id: 1, name: 'Task 1', completed: false, dueDate: '2023-12-01' }],
      inprogress: [{ id: 2, name: 'Task 2', completed: false, dueDate: '2023-12-02' }],
      completed: [{ id: 3, name: 'Task 3', completed: true, dueDate: '2023-12-03' }],
    };

    const result = pipe.transform(sortedTasks, 'UnknownFilterType' as FilterType);
    expect(result.length).toBe(3);
  });
});
