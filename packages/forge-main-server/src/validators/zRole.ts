import { z } from 'zod';
import { escapeString } from '../utils';

export const zRole = z.object({
    name: z.string().trim().toLowerCase().min(2).max(60).transform(escapeString)
});
