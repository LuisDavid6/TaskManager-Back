import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type TasksDocument = HydratedDocument<Task>;

@Schema({ timestamps: { createdAt: true } })
export class Task {
  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({ default: false })
  completed: boolean;
}

export const TaskSchema = SchemaFactory.createForClass(Task);

TaskSchema.set('toJSON', {
  transform: (document, returnObject) => {
    returnObject.id = returnObject._id;
    delete returnObject.__v;
    delete returnObject._id;
  },
});
