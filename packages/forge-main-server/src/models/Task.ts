import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zTask } from '../validators';
import { Document } from 'mongodb';

export type Task = z.infer<typeof zTask> & { changeLog: ChangeLog };
export type TaskDocument = Task & Document;
