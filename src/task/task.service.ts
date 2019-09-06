import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './task.model';
import * as uuid from 'uuid/v1';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';

@Injectable()
export class TaskService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }

  getTasksWithFilter(filterDto: GetTasksFilterDto): Task[] {
    const { status, search, title, description } = filterDto;

    let tasks = this.getAllTasks();
    
    if(status) {
      tasks = tasks.filter(task => task.status === status)
    }

    if(title) {
      tasks = tasks.filter(task => task.title === title)
    }

    if(description) {
      tasks = tasks.filter(task => task.description === description)
    }

    if(search) {
      tasks = tasks.filter(task => 
        task.title.includes(search) || 
        task.description.includes(search) ||
        task.status.includes(status)
      );
    }

    return tasks
  }

  getTaskById(id: string): Task {
    const found = this.tasks.find(task => task.id === id)
    
    if(!found) {
      throw new NotFoundException(`Task with id (${id}) not found`);
    }

    return found;
  }

  createTask(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto

    const task: Task = {
      id: uuid(),
      title: title,
      description: description,
      status: TaskStatus.OPEN
    };

    this.tasks.push(task);
    return task;
  }
  
  deleteTask(id) {
    const found = this.tasks.find(task => task.id === id)

    this.tasks = this.tasks.filter(task => task.id != found.id);
  }

  updateTaskStatus(id: string, status: TaskStatus): Task {
    // Cannot set property 'status' of undefined
    console.log(status)
    const task = this.getTaskById(id);
    task.status = status
    return task 
  }
}
