import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Task } from './schema/tasks.schema';
import { CreateTaskDto } from './dto/create-task.dto';
import { UpdateTaskDto } from './dto/update-task.dto';

@Injectable()
export class TasksService {
  constructor(@InjectModel(Task.name) private taskModel: Model<Task>) {}

  async getTasks(filter: string) {
    try {
      if (filter == 'completed')
        return await this.taskModel.find({ completed: true });
      else if (filter == 'pending')
        return await this.taskModel.find({ completed: false });
      else return await this.taskModel.find();
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener las tareas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async getTask(id: string) {
    try {
      return await this.taskModel.findById(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al obtener las tareas',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async createTask(newTask: CreateTaskDto) {
    try {
      const task = await this.taskModel.create(newTask);

      return task;
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al crear la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async updateTask(id: string, data: UpdateTaskDto) {
    try {
      return await this.taskModel.findByIdAndUpdate(id, data, { new: true });
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al actualizar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async deleteTask(id: string) {
    try {
      return await this.taskModel.findByIdAndDelete(id);
    } catch (error) {
      console.log(error);
      throw new HttpException(
        'Error al borrar la tarea',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
