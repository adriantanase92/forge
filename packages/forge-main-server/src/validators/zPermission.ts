import { z } from 'zod';
import { escapeString } from '../utils';

export const zPermission = z.object({
    name: z.string().trim().toLowerCase().min(2).max(60).transform(escapeString)
});
