import { TaskSortPipe } from './task-sort.pipe';
import { Task } from '../models/interfaces/task.model';

describe('TaskSortPipe', () => {
  const pipe = new TaskSortPipe();

  it('should create an instance', () => {
    expect(pipe).toBeTruthy();
  });

  it('should sort tasks into the correct categories', () => {
    const today = new Date().toISOString().split('T')[0];

    const tasks: Task[] = [
      { id: 1, name: 'Task 1', completed: false, dueDate: '2023-01-01' },
      { id: 2, name: 'Task 2', completed: true, dueDate: today },
      { id: 3, name: 'Task 3', completed: false, dueDate: today },
    ];

    const result = pipe.transform(tasks, today);

    expect(result.expired.length).toBe(1);
    expect(result.inprogress.length).toBe(1);
    expect(result.completed.length).toBe(1);
  });

  it('should return an empty result for empty tasks array', () => {
    const result = pipe.transform([], '2023-12-01');

    expect(result.expired.length).toBe(0);
    expect(result.inprogress.length).toBe(0);
    expect(result.completed.length).toBe(0);
  });

  it('should handle tasks with empty dueDate', () => {
    const tasks: Task[] = [
      { id: 1, name: 'Task 1', completed: false, dueDate: '' },
      { id: 2, name: 'Task 2', completed: true, dueDate: '' },
    ];

    const result = pipe.transform(tasks, '2023-12-01');

    expect(result.expired.length).toBe(0);
    expect(result.inprogress.length).toBe(1);
    expect(result.completed.length).toBe(1);
  });
});
