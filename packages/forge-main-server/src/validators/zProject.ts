import { ObjectId } from 'mongodb';
import { z } from 'zod';
import { escapeString } from '../utils';

export const zProject = z.object({
    name: z.string().trim().min(6).max(100).transform(escapeString),
    description: z.string().trim().max(500).transform(escapeString).optional(),
    clients: z.instanceof(ObjectId).array().optional(),
    workers: z.instanceof(ObjectId).array().optional(),
    manager: z.instanceof(ObjectId),
    tasks: z.array(z.instanceof(ObjectId))
});
