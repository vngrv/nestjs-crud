import { Controller, Get, Post, Patch, Body, Param, Delete, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { TaskService } from './task.service';
import { Task, TaskStatus } from './task.model';
import { CreateTaskDto } from './dto/create-task.dto';
import { GetTasksFilterDto } from './dto/get-tasks.dto';
import { TaskStatusValidationPipe } from './pipes/task-status-validation.pipe'

@Controller('task')
export class TaskController {
  constructor(private taskService: TaskService) {}

  @Get()
  getTasks(@Query() filterDto: GetTasksFilterDto): Task[] {
    if(Object.keys(filterDto).length) {
      return this.taskService.getTasksWithFilter(filterDto)
    } else { 
      return this.taskService.getAllTasks()
    }
  }
  
  @Get(':id')
  getTaskById(@Param('id') id: string) {
    return this.taskService.getTaskById(id)
  }

  @Post()
  @UsePipes(ValidationPipe)
  createTask(@Body() createTaskDto: CreateTaskDto): Task {
    return this.taskService.createTask(createTaskDto)
  }

  @Delete(':id')
  deleteTask(@Param('id') id: string): void {
    return this.taskService.deleteTask(id)
  }

  @Patch(':id/status')
  updateTaskStatus( 
    @Param('id') id: string, 
    @Body('status', TaskStatusValidationPipe) status: TaskStatus 
    ): Task {
    // Cannot set property 'status' of undefined
    return this.taskService.updateTaskStatus(id, status)
  }
}
