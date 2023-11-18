import { Task } from "./task.model";

export interface SortedTasks {
  expired: Task[];
  inprogress: Task[];
  completed: Task[];
}
