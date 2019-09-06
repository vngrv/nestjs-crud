import { TaskStatus } from "../task.model";

export class GetTasksFilterDto {
  status: TaskStatus;
  search: string;
  title: string;
  description: string;
}