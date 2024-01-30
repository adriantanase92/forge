import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zUser } from '../validators';
import { Document } from 'mongodb';

export type User = z.infer<typeof zUser> & { changeLog: ChangeLog };
export type UserDocument = User & Document;
