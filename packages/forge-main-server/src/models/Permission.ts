import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zPermission } from '../validators';
import { Document } from 'mongodb';

export type Permission = z.infer<typeof zPermission> & { changeLog: ChangeLog };
export type PermissionDocument = Permission & Document;
