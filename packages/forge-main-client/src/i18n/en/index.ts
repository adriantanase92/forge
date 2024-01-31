import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('en'),
	app: {
		name: 'forge',
		versionInfo: 'Version { version }'
	},
	menus: {
		sidebar: {
			dashboard: 'Dashboard',
			users: 'Users',
			permissions: 'Permissions',
			roles: 'Roles',
			projects: 'Projects',
			noItemsFoundMessage: 'No sidebar menu items found!'
		}
	},
	pages: {
		logIn: {
			subtitle: 'to your personal { appName } panel'
		},
		dashboard: {
			title: 'My Dashboard',
			projectsTitle: 'Projects (this year)',
			usersInOrganization: 'Users in organization',
			myProjects: 'My projects'
		},
		users: {
			user: {
				generalInfo: 'General info'
			}
		},
		notFound: {
			title: 'Ooops!! Not here'
		}
	},
	notifications: {
		somethingDeletedSuccessfully: '{ something } was deleted successfully!',
		somethingAddedSuccessfully: '{ something } added successfully!',
		somethingEditedSuccessfully: '{ something } edited successfully!'
	},
	errors: {
		required: 'You forgot to fill in { field }.',
		requiredSelect: 'You forgot to select an option.',
		requiredDate: 'Please select a date.',
		invalidDate: 'Please enter a valid date.',
		invalidForm: 'Invalid form.',
		invalidEmail: 'Invalid email address - exemple: name@forge.com.',
		invalidPassword:
			'Your password must contain at least 8 characters, one uppercase letter, one number and one of these symbols (!@#$%^&*).',
		invalidCombination: 'Oops, this combination is not correct.',
		minCharacters: 'Minimum of { number } characters required',
		maxCharacters: 'Maximum { number } characters exceeded.',
		minValue: 'Value must not be less than { number }.',
		maxValue: 'Value must not be more than { number }.',
		noSomethingFound: 'No { something } found.',
		internalServerError: 'There was an internal server error. Please try again.',
		emailNotFound: 'This email address was not found.',
		emailAddressAlreadyInUse: 'This email address already exists.',
		noDataFound: 'No data found!',
		noInformation: 'No information',
		errorFetchingSomethingFromServer: 'Error fetching { something } from server.',
		unexpectedResponseStructure: 'Unexpected response structure.',
		cannotGetPermissions: 'Cannot get permissions.',
		cannotGetPermission: 'Cannot get permission.',
		cannotCreatePermission: 'Cannot create permission.',
		cannotUpdatePermission: 'Cannot update permission.',
		cannotDeletePermission: 'Cannot delete permission.',
		cannotGetRoles: 'Cannot get roles.',
		cannotGetRole: 'Cannot get role.',
		cannotCreateRole: 'Cannot create role.',
		cannotUpdateRole: 'Cannot update role.',
		cannotDeleteRole: 'Cannot delete role.',
		cannotGetUsers: 'Cannot get users.',
		cannotGetUser: 'Cannot get user.',
		cannotCreateUser: 'Cannot create user.',
		cannotUpdateUser: 'Cannot update user.',
		cannotReplaceManagerWithOwnerOnProject: 'Cannot replace manager with owner on project.',
		cannotRemoveUserFromProject: 'Cannot remove user from project.',
		cannotRemoveUserFromTasks: 'Cannot remove user from tasks.',
		cannotDeleteUser: 'Cannot delete user.',
		cannotGetTasks: 'Cannot get tasks.',
		cannotGetTask: 'Cannot get task.',
		cannotCreateTask: 'Cannot create task.',
		cannotAddTaskToProject: 'Cannot add task to project.',
		cannotUpdateTask: 'Cannot update task.',
		cannotRemoveTaskFromProject: 'Cannot remove task from project.',
		cannotDeleteTask: 'Cannot delete task.',
		cannotGetProjects: 'Cannot get projects.',
		cannotGetProject: 'Cannot get project.',
		cannotCreateProject: 'Cannot create project.',
		cannotUpdateProject: 'Cannot update project.',
		cannotAddProjectToClients: 'Cannot add project to clients.',
		cannotAddProjectToWorkers: 'Cannot add project to workers.',
		cannotAddProjectToManager: 'Cannot add project to manager.',
		cannotDeleteProject: 'Cannot delete project.',
		cannotRemoveProjectFromClients: 'Cannot remove project from clients.',
		cannotRemoveProjectFromWorkers: 'Cannot remove project from workers.',
		cannotRemoveProjectFromManager: 'Cannot remove project from manager.',
		tokensAreMissing: 'Tokens are missing.',
		refreshTokenIsMissing: 'Refresh token is missing.',
		refreshTokenHasExpired: 'Refresh token has expired.'
	},
	fields: {
		name: {
			text: 'name'
		},
		fullName: {
			text: 'full name'
		},
		firstName: {
			text: 'first name'
		},
		lastName: {
			text: 'last name'
		},
		password: {
			text: 'password',
			hidePassword: 'Hide password',
			showPassword: 'Show password',
			forgotYourPassword: 'Forgot your password?'
		},
		email: {
			text: 'email address'
		},
		search: {
			text: 'search'
		},
		phone: {
			text: 'phone'
		},
		role: {
			text: 'role'
		},
		title: {
			text: 'title'
		},
		description: {
			text: 'description'
		},
		status: {
			text: 'status'
		},
		responsible: {
			text: 'responsible'
		},
		preferredLanguage: {
			text: 'preferred language'
		},
		address: {
			text: 'address'
		},
		read: {
			text: 'read'
		},
		write: {
			text: 'write'
		}
	},
	buttonsOrLinks: {
		cancel: 'Cancel',
		confirm: 'Confirm',
		addSomething: 'Add { something }',
		editSomething: 'Edit { something }',
		deleteSomething: 'Delete { something }',
		saveSomething: 'Save { something }',
		logOut: 'Log out',
		logIn: 'Log in',
		goBackToDashboard: 'Go back to Dashboard'
	},
	components: {
		footer: {
			copyright: 'All rights reserved.',
			slogan: 'forge - Your indispensable assistant'
		},
		modal: {
			placeholders: {
				title: 'Modal Title',
				body: 'Modal content'
			},
			deleteMessage: 'Are you ok with deleting this { entity }?'
		},
		table: {
			actions: 'actions'
		},
		form: {
			placeholders: {
				selectEmptyOptionText: 'Select an option'
			}
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'role',
				multiple: 'roles'
			}
		},
		permissions: {
			entity: {
				single: 'permission',
				multiple: 'permissions'
			}
		},
		users: {
			entity: {
				single: 'user',
				multiple: 'users'
			},
			types: {
				admin: {
					single: 'admin',
					multiple: 'admins'
				},
				manager: {
					single: 'manager',
					multiple: 'managers'
				},
				client: {
					single: 'client',
					multiple: 'clients'
				},
				worker: {
					single: 'worker',
					multiple: 'workers'
				}
			}
		},
		projects: {
			entity: {
				single: 'project',
				multiple: 'projects'
			}
		},
		tasks: {
			entity: {
				single: 'task',
				multiple: 'tasks'
			}
		}
	}
} satisfies BaseTranslation;
