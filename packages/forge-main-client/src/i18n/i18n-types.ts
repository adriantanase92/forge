// This file was auto-generated by 'typesafe-i18n'. Any manual changes will be overwritten.
/* eslint-disable */
import type { BaseTranslation as BaseTranslationType, LocalizedString, RequiredParams } from 'typesafe-i18n';
import type { GenericNumberParameter, GenericStringParameter } from './types';

export type BaseTranslation = BaseTranslationType;
export type BaseLocale = 'en';

export type Locales = 'en' | 'fr' | 'nl';

export type Translation = RootTranslation;

export type Translations = RootTranslation;

export type RoutesTranslations = {
    href: RequiredParams<'0'>;
    public: {
        logIn: string;
    };
    protected: {
		logOut: string;
		dashboard: string;
		users: string;
		roles: string;
		permissions: string;
		projects: string;
		tasks: string;
		profile: string;
	}
};

export type AppTranslations = {
	name: string;
	versionInfo: string;
}

export type MenusTranslations = {
	sidebar: {
		dashboard: string;
		users: string;
		permissions: string;
		roles: string;
		projects: string;
		noItemsFoundMessage: string;
	}
};

export type PagesTranslations = {
	logIn: {
		subtitle: string;
	};
	dashboard: {
		title: string;
		projectsTitle: string;
		usersInOrganization: string;
		myProjects: string;
	};
	users: {
		user: {
			generalInfo: string;
		}
	};
	notFound: {
		title: string;
	};
};

export type NotificationsTranslations = {
	somethingDeletedSuccessfully: string;
	somethingAddedSuccessfully: string;
	somethingEditedSuccessfully: string;
};

export type ErrorsTranslations = {
    required: string;
    requiredSelect: string;
    requiredDate: string;
    invalidDate: string;
    invalidForm: string;
    invalidEmail: string;
    invalidPassword: string;
    invalidCombination: string;
    minCharacters: string;
    maxCharacters: string;
    minValue: string;
    maxValue: string;
    noSomethingFound: string;
    internalServerError: string;
    emailNotFound: string;
    emailAddressAlreadyInUse: string;
    noDataFound: string;
    noInformation: string;
	errorFetchingSomethingFromServer: string;
	unexpectedResponseStructure:  string;
	cannotGetPermissions: string;
	cannotGetPermission: string;
	cannotCreatePermission: string;
	cannotUpdatePermission: string;
	cannotDeletePermission: string;
	cannotGetRoles: string;
	cannotGetRole: string;
	cannotCreateRole: string;
	cannotUpdateRole: string;
	cannotDeleteRole: string;
	cannotGetUsers: string;
	cannotGetUser: string;
	cannotCreateUser: string;
	cannotUpdateUser: string;
	cannotReplaceManagerWithOwnerOnProject: string;
	cannotRemoveUserFromProject: string;
	cannotRemoveUserFromTasks: string;
	cannotDeleteUser: string;
	cannotGetTasks: string;
	cannotGetTask: string;
	cannotCreateTask: string;
	cannotAddTaskToProject: string;
	cannotUpdateTask: string;
	cannotRemoveTaskFromProject: string;
	cannotDeleteTask: string;
	cannotGetProjects: string;
	cannotGetProject: string;
	cannotCreateProject: string;
	cannotUpdateProject: string;
	cannotAddProjectToClients: string;
	cannotAddProjectToWorkers: string;
	cannotAddProjectToManager: string;
	cannotDeleteProject: string;
	cannotRemoveProjectFromClients: string;
	cannotRemoveProjectFromWorkers: string;
	cannotRemoveProjectFromManager: string;
	tokensAreMissing: string;
	refreshTokenIsMissing: string;
	refreshTokenHasExpired: string;
};

export type FieldsTranslations = {
	name: {
		text: string;
	};
    fullName: {
        text: string;
    };
	firstName: {
		text: string;
	};
	lastName: {
		text: string;
	};
	password: {
		text: string;
		hidePassword: string;
		showPassword: string;
		forgotYourPassword: string;
	};
	email: {
		text: string;
	};
	search: {
		text: string;
	};
	phone: {
		text: string;
	};
	role: {
		text: string;
	};
	title: {
		text: string;
	};
	description: {
		text: string;
	};
	status: {
		text: string;
	};
	responsible: {
		text: string;
	};
	preferredLanguage: {
		text: string;
	};
	address: {
		text: string;
	};
	read: {
		text: string;
	};
	write: {
		text: string;
	};
};

export type ButtonsOrLinksTranslations = {
	cancel: string;
	confirm: string;
	addSomething: string;
	editSomething: string;
	deleteSomething: string;
	saveSomething: string;
	logOut: string;
	logIn: string;
	goBackToDashboard: string;
};

export type ComponentsTranslations = {
	footer: {
		copyright: string;
		slogan: string;
	};
    modal: {
		placeholders: {
			title: string;
			body: string;
		};
		deleteMessage: string;
    };
    table: {
        actions: string;
    };
	form: {
		placeholders: {
			selectEmptyOptionText: string;
		}
	};
};

export type ModulesTranslations = {
	modules: {
		roles: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		permissions: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		users: {
			entity: {
				single: string;
				multiple: string;
			};
			types: {
				admin: {
					single: string;
					multiple: string;
				},
				manager: {
					single: string;
					multiple: string;
				},
				client: {
					single: string;
					multiple: string;
				},
				worker: {
					single: string;
					multiple: string;
				}
			};
		};
		projects: {
			entity: {
				single: string;
				multiple: string;
			}
		};
		tasks: {
			entity: {
				single: string;
				multiple: string;
			}
		};
	}
}

type RootTranslation = {
    routes: RoutesTranslations;
	app: AppTranslations;
    menus: MenusTranslations;
    pages: PagesTranslations;
    notifications: NotificationsTranslations;
    errors: ErrorsTranslations;
    fields: FieldsTranslations;
    buttonsOrLinks: ButtonsOrLinksTranslations;
    components: ComponentsTranslations;
    modules: ModulesTranslations;
};

export type TranslationFunctions = {
    routes: {
        href: (arg0: unknown) => LocalizedString;
        public: {
            logIn: () => LocalizedString;
        };
        protected: {
            logOut: () => LocalizedString;
			dashboard: () => LocalizedString;
			users: () => LocalizedString;
			roles: () => LocalizedString;
			permissions: () => LocalizedString;
			projects: () => LocalizedString;
			tasks: () => LocalizedString;
			profile: () => LocalizedString;
        };
    };
	app: {
		name: () => LocalizedString;
		versionInfo: ({ version }: GenericStringParameter) => LocalizedString;
	};
	menus: {
		sidebar: {
			dashboard: () => LocalizedString;
			users: () => LocalizedString;
			permissions: () => LocalizedString;
			roles: () => LocalizedString;
			projects: () => LocalizedString;
			noItemsFoundMessage: () => LocalizedString;
		};
	};
	pages: {
		logIn: {
			subtitle: ({ appName }: GenericStringParameter) => LocalizedString;
		};
		dashboard: {
			title: () => LocalizedString;
			projectsTitle: () => LocalizedString;
			usersInOrganization: () => LocalizedString;
			myProjects: () => LocalizedString;
		};
		users: {
			user: {
				generalInfo: () => LocalizedString;
			}
		};
		notFound: {
			title: () => LocalizedString;
		};
	};
	notifications: {
		somethingDeletedSuccessfully: ({ something }: GenericStringParameter) => LocalizedString;
		somethingAddedSuccessfully: ({ something }: GenericStringParameter) => LocalizedString;
		somethingEditedSuccessfully: ({ something }: GenericStringParameter) => LocalizedString;
	};
	errors: {
		required: ({ field }: GenericStringParameter) => LocalizedString;
        requiredSelect: () => LocalizedString;
        requiredDate: () => LocalizedString;
        invalidDate: () => LocalizedString;
        invalidForm: () => LocalizedString;
        invalidEmail: () => LocalizedString;
        invalidPassword: () => LocalizedString;
        invalidCombination: () => LocalizedString;
        minCharacters: ({ number }: GenericNumberParameter) => LocalizedString;
        maxCharacters: ({ number }: GenericNumberParameter) => LocalizedString;
        minValue: ({ number }: GenericNumberParameter) => LocalizedString;
        maxValue: ({ number }: GenericNumberParameter) => LocalizedString;
        noSomethingFound: ({ something }: GenericStringParameter) => LocalizedString;
        internalServerError: () => LocalizedString;
        emailNotFound: () => LocalizedString;
        security_code_not_found: () => LocalizedString;
        security_code_expired: () => LocalizedString;
        emailAddressAlreadyInUse: () => LocalizedString;
        noDataFound: () => LocalizedString;
        noInformation: () => LocalizedString;
		errorFetchingSomethingFromServer: ({ something }: GenericStringParameter) => LocalizedString;
		unexpectedResponseStructure: () => LocalizedString;
		cannotGetPermissions: () => LocalizedString;
		cannotGetPermission: () => LocalizedString;
		cannotCreatePermission: () => LocalizedString;
		cannotUpdatePermission: () => LocalizedString;
		cannotDeletePermission: () => LocalizedString;
		cannotGetRoles: () => LocalizedString;
		cannotGetRole: () => LocalizedString;
		cannotCreateRole: () => LocalizedString;
		cannotUpdateRole: () => LocalizedString;
		cannotDeleteRole: () => LocalizedString;
		cannotGetUsers: () => LocalizedString;
		cannotGetUser: () => LocalizedString;
		cannotCreateUser: () => LocalizedString;
		cannotUpdateUser: () => LocalizedString;
		cannotReplaceManagerWithOwnerOnProject: () => LocalizedString;
		cannotRemoveUserFromProject: () => LocalizedString;
		cannotRemoveUserFromTasks: () => LocalizedString;
		cannotDeleteUser: () => LocalizedString;
		cannotGetTasks: () => LocalizedString;
		cannotGetTask: () => LocalizedString;
		cannotCreateTask: () => LocalizedString;
		cannotAddTaskToProject: () => LocalizedString;
		cannotUpdateTask: () => LocalizedString;
		cannotRemoveTaskFromProject: () => LocalizedString;
		cannotDeleteTask: () => LocalizedString;
		cannotGetProjects: () => LocalizedString;
		cannotGetProject: () => LocalizedString;
		cannotCreateProject: () => LocalizedString;
		cannotUpdateProject: () => LocalizedString;
		cannotAddProjectToClients: () => LocalizedString;
		cannotAddProjectToWorkers: () => LocalizedString;
		cannotAddProjectToManager: () => LocalizedString;
		cannotDeleteProject: () => LocalizedString;
		cannotRemoveProjectFromClients: () => LocalizedString;
		cannotRemoveProjectFromWorkers: () => LocalizedString;
		cannotRemoveProjectFromManager: () => LocalizedString;
		tokensAreMissing: () => LocalizedString;
		refreshTokenIsMissing: () => LocalizedString;
		refreshTokenHasExpired: () => LocalizedString;
    };
    fields: {
		name: {
			text: () => LocalizedString;
		};
        fullName: {
            text: () => LocalizedString;
        };
		firstName: {
			text: () => LocalizedString;
		};
		lastName: {
			text: () => LocalizedString;
		};
		password: {
			text: () => LocalizedString;
			hidePassword: () => LocalizedString;
			showPassword: () => LocalizedString;
			forgotYourPassword: () => LocalizedString;
		};
		email: {
			text: () => LocalizedString;
		};
		search: {
			text: () => LocalizedString;
		};
		phone: {
			text: () => LocalizedString;
		};
		role: {
			text: () => LocalizedString;
		};
		title: {
			text: () => LocalizedString;
		};
		description: {
			text: () => LocalizedString;
		};
		status: {
			text: () => LocalizedString;
		};
		responsible: {
			text: () => LocalizedString;
		};
		preferredLanguage: {
			text: () => LocalizedString;
		};
		address: {
			text: () => LocalizedString;
		};
		read: {
			text: () => LocalizedString;
		};
		write: {
			text: () => LocalizedString;
		};
    };
    buttonsOrLinks: {
		cancel: () => LocalizedString;
		confirm: () => LocalizedString;
		addSomething: ({ something }: GenericStringParameter) => LocalizedString;
		editSomething: ({ something }: GenericStringParameter) => LocalizedString;
		deleteSomething: ({ something }: GenericStringParameter) => LocalizedString;
		saveSomething: ({ something }: GenericStringParameter) => LocalizedString;
		logOut: () => LocalizedString;
		logIn: () => LocalizedString;
		goBackToDashboard: () => LocalizedString;
	};
    components: {
		footer: {
			copyright: () => LocalizedString;
			slogan: () => LocalizedString;
		};
        modal: {
			placeholders: {
				title: () => LocalizedString;
				body: () => LocalizedString;
			};
			deleteMessage: ({ entity }: GenericStringParameter) => LocalizedString;
        };
        table: {
            actions: () => LocalizedString;
        };
		form: {
			placeholders: {
				selectEmptyOptionText: () => LocalizedString;
			}
		};
    };
	modules: {
		roles: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		permissions: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		users: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			};
			types: {
				admin: {
					single: () => LocalizedString;
					multiple: () => LocalizedString;
				},
				manager: {
					single: () => LocalizedString;
					multiple: () => LocalizedString;
				},
				client: {
					single: () => LocalizedString;
					multiple: () => LocalizedString;
				},
				worker: {
					single: () => LocalizedString;
					multiple: () => LocalizedString;
				}
			};
		};
		projects: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
		tasks: {
			entity: {
				single: () => LocalizedString;
				multiple: () => LocalizedString;
			}
		};
	}
};
export type Formatters = {};
