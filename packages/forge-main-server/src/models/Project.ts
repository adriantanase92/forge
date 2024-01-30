import { z } from 'zod';
import { ChangeLog } from './ChangeLog';
import { zProject } from '../validators';
import { Document } from 'mongodb';

export type Project = z.infer<typeof zProject> & { changeLog: ChangeLog };
export type ProjectDocument = Project & Document;
