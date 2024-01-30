import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zRole } from '../validators';
import { Document } from 'mongodb';

export type Role = z.infer<typeof zRole> & { changeLog: ChangeLog };
export type RoleDocument = Role & Document;
