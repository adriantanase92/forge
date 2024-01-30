import { z } from 'zod';
import { escapeString } from '../utils';

export const zAddress = z.object({
    country: z.string().trim().min(2).max(100).transform(escapeString).optional(),
    county: z.string().trim().min(2).max(100).transform(escapeString).optional(),
    city: z.string().trim().min(2).max(100).transform(escapeString).optional(),
    street: z.string().trim().min(2).max(100).transform(escapeString).optional(),
    locationNumber: z.string().trim().min(2).max(100).transform(escapeString).optional(),
    zipCode: z.string().trim().min(2).max(100).transform(escapeString).optional()
});
