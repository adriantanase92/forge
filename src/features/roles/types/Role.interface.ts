export interface RolePermission {
	id: string;
	name: string;
	read: boolean;
	write: boolean;
}

export interface Role {
	id: string;
	name: string;
	permissions: RolePermission[];
}
