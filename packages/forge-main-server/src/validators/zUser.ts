import { z } from 'zod';
import { Language, Modules, UserRole } from '../enums';
import { ObjectId } from 'mongodb';
import { emailRegex, escapeString, passwordRegex } from '../utils';
import { zAddress } from './zAddress';

export const zUserPermission = z.object({
    read: z.boolean(),
    write: z.boolean()
});

export const zUser = z.object({
    _id: z.instanceof(ObjectId).optional(),
    firstName: z.string().trim().min(2).max(100).transform(escapeString),
    lastName: z.string().trim().min(2).max(100).transform(escapeString),
    email: z.string().trim().toLowerCase().regex(emailRegex),
    password: z.string().trim().toLowerCase().regex(passwordRegex),
    phone: z.string().min(1).max(50).transform(escapeString).optional(),
    role: z.nativeEnum(UserRole),
    preferredLanguage: z.nativeEnum(Language),
    projects: z.instanceof(ObjectId).array().optional(),
    permissions: z.record(z.nativeEnum(Modules), zUserPermission),
    address: zAddress.optional()
});
