export enum Modules {
	USERS = 'users',
	ROLES = 'roles',
	PERMISSIONS = 'permissions',
	PROJECTS = 'projects',
	TASKS = 'tasks'
}

export enum UserRole {
	ADMIN = 'admin',
	CLIENT = 'client',
	MANAGER = 'manager',
	WORKER = 'worker'
}

export enum PreferredLanguage {
	EN = 'en',
	FR = 'fr',
	NL = 'nl'
}

export type EntityDocumentType = {
	_id: string;
	changeLog: ChangeLog;
};

export type ChangeLog = {
	createdAt: Date;
	updatedAt?: Date;
};

export type NewRoleType = {
	name: UserRole;
};

export type EditRoleType = {
	id: string;
} & NewRoleType;

export type RoleType = EntityDocumentType & NewRoleType;

export type NewPermissionType = {
	name: Modules;
};

export type EditPermissionType = {
	id: string;
} & NewPermissionType;

export type PermissionType = EntityDocumentType & NewPermissionType;

export type PermissionOperation = 'read' | 'write';

export type UserPermissionOptions = {
	read: boolean;
	write: boolean;
};

export type UserPermissions = Record<Modules, UserPermissionOptions>;

export type Address = {
	country?: string;
	county?: string;
	city?: string;
	street?: string;
	locationNumber?: string;
	zipCode?: string;
};

export type NewUserType = {
	firstName: string;
	lastName: string;
	email: string;
	phone?: string;
	role: UserRole;
	permissions: UserPermissions;
	preferredLanguage: PreferredLanguage;
	projects: string[];
	address?: Address;
};

export type EditUserType = {
	id: string;
} & NewUserType;

export type UserType = {
	_id: string;
	changeLog?: ChangeLog;
} & NewUserType;

export type CurrentLoggedInUser = {
	isAuthenticated: boolean;
} & UserType;

export type NewProjectType = {
	name: string;
	clients?: string[];
	workers?: string[];
	manager: string;
	tasks?: string[];
	description?: string;
	projects?: string[];
};

export type EditProjectType = {
	id: string;
} & NewProjectType;

export type ProjectType = EntityDocumentType & {
	name: string;
	clients?: UserType[];
	workers?: UserType[];
	manager: UserType;
	tasks?: string[];
	description?: string;
};

export enum TaskStatus {
	TO_DO = 'to-do',
	IN_PROGRESS = 'in-progress',
	DONE = 'done'
}

export type NewTaskType = {
	title: string;
	description?: string;
	project: string;
	responsible?: string[];
	status: TaskStatus;
};

export type EditTaskType = {
	id: string;
} & NewTaskType;

export type TaskType = EntityDocumentType & NewTaskType;
