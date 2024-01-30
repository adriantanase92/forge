import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { TaskStatus } from '../enums/Task';
import { escapeString } from '../utils';

export const zTask = z.object({
    title: z.string().trim().min(6).max(100).transform(escapeString),
    description: z.string().trim().max(500).transform(escapeString).optional(),
    project: z.instanceof(ObjectId),
    responsible: z.instanceof(ObjectId).array().optional(),
    status: z.nativeEnum(TaskStatus)
});
