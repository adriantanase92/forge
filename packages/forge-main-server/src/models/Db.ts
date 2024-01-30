import type { Collection } from 'mongodb';
import type { Project } from './Project';
import type { Task } from './Task';
import type { User } from './User';
import { Role } from './Role';
import { Permission } from './Permission';

export type Db = {
    projects: Collection<Project>;
    permissions: Collection<Permission>;
    roles: Collection<Role>;
    tasks: Collection<Task>;
    users: Collection<User>;
};
