export interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
}
export type TaskStatus = 'OPEN' | 'IN_PROGRESS' | 'DONE';
export const TaskStatusOptions: TaskStatusOption[] = [
  { value: 'open', taskStatus: 'OPEN', text: 'Open' },
  { value: 'in-progress', taskStatus: 'IN_PROGRESS', text: 'In-Progress' },
  { value: 'done', taskStatus: 'DONE', text: 'Completed' },
];
type TaskStatusOption = {
  value: 'open' | 'in-progress' | 'done';
  taskStatus: TaskStatus;
  text: string;
};
