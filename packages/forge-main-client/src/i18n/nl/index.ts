import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('nl'),
	app: {
		name: 'forge',
		versionInfo: 'Versie { version }'
	},
	menus: {
		sidebar: {
			dashboard: 'Dashboard',
			users: 'Gebruikers',
			permissions: 'Rechten',
			roles: 'Rollen',
			projects: 'Projecten',
			noItemsFoundMessage: 'Geen zijbalkmenu-items gevonden!'
		}
	},
	pages: {
		logIn: {
			subtitle: 'naar uw persoonlijke { appName }-paneel'
		},
		dashboard: {
			title: 'Mijn Dashboard'
		},
		users: {
			user: {
				generalInfo: 'Algemene informatie'
			}
		},
		notFound: {
			title: 'Oeps!! Niet hier'
		}
	},
	notifications: {
		somethingDeletedSuccessfully: '{ something } is succesvol verwijderd!',
		somethingAddedSuccessfully: '{ something } succesvol toegevoegd!',
		somethingEditedSuccessfully: '{ something } succesvol bewerkt!'
	},
	errors: {
		required: 'Je bent vergeten om { field } in te vullen.',
		requiredSelect: 'Je bent vergeten een optie te selecteren.',
		requiredDate: 'Selecteer een datum.',
		invalidDate: 'Voer een correcte datum in.',
		invalidForm: 'Ongeldig formulier.',
		invalidEmail: 'Oeps, fout format (juist: naam@forge.be).',
		invalidPassword:
			'Je paswoord moet minimaal 8 tekens bevatten, één hoofdletter, één cijfer en één van deze symbolen (!@#$%^&*).',
		invalidCombination: 'Oeps, deze combinatie herkennen we niet.',
		minCharacters: 'Minimaal { number } tekens vereist.',
		maxCharacters: 'Maximum van { number } tekens overschreden.',
		minValue: 'Waarde mag niet lager zijn dan { number }.',
		maxValue: 'Waarde mag niet hoger zijn dan { number }.',
		noSomethingFound: '{ something } niet gevonden.',
		internalServerError: 'Oeps, er is een interne serverfout.',
		emailNotFound: 'Oeps, we kunnen dit e-mailadres niet vinden.',
		emailAddressAlreadyInUse: 'Dit e-mailadres bestaat al.',
		noDataFound: 'Geen data gevonden!',
		noInformation: 'Geen informatie.',
		errorFetchingSomethingFromServer: 'Fout bij het ophalen van { something } van de server.',
		unexpectedResponseStructure: 'Onverwachte reactiestructuur.',
		cannotGetPermissions: 'Kan geen rechten krijgen.',
		cannotGetPermission: 'Kan geen toestemming krijgen.',
		cannotCreatePermission: 'Kan geen toestemming maken.',
		cannotUpdatePermission: 'Kan toestemming niet updaten.',
		cannotDeletePermission: 'Kan toestemming niet verwijderen.',
		cannotGetRoles: 'Kan geen rollen krijgen.',
		cannotGetRole: 'Kan geen rol krijgen.',
		cannotCreateRole: 'Kan geen rol maken.',
		cannotUpdateRole: 'Kan rol niet updaten.',
		cannotDeleteRole: 'Kan rol niet verwijderen.',
		cannotGetUsers: 'Kan geen gebruikers krijgen.',
		cannotGetUser: 'Kan gebruiker niet ophalen.',
		cannotCreateUser: 'Kan gebruiker niet aanmaken.',
		cannotUpdateUser: 'Kan gebruiker niet updaten.',
		cannotReplaceManagerWithOwnerOnProject:
			'Kan manager niet vervangen door eigenaar van project.',
		cannotRemoveUserFromProject: 'Kan gebruiker niet verwijderen uit project.',
		cannotRemoveUserFromTasks: 'Kan gebruiker niet verwijderen uit taken.',
		cannotDeleteUser: 'Kan gebruiker niet verwijderen.',
		cannotGetTasks: 'Kan geen taken krijgen.',
		cannotGetTask: 'Kan taak niet krijgen.',
		cannotCreateTask: 'Kan taak niet maken.',
		cannotAddTaskToProject: 'Kan taak niet aan project toevoegen.',
		cannotUpdateTask: 'Kan taak niet bijwerken.',
		cannotRemoveTaskFromProject: 'Kan taak niet uit project verwijderen.',
		cannotDeleteTask: 'Kan taak niet verwijderen.',
		cannotGetProjects: 'Kan geen projecten krijgen.',
		cannotGetProject: 'Kan project niet ophalen.',
		cannotCreateProject: 'Kan project niet maken.',
		cannotUpdateProject: 'Kan project niet bijwerken.',
		cannotAddProjectToClients: 'Kan project niet toevoegen aan klanten.',
		cannotAddProjectToWorkers: 'Kan project niet toevoegen aan werknemers.',
		cannotAddProjectToManager: 'Kan project niet toevoegen aan manager.',
		cannotDeleteProject: 'Kan project niet verwijderen.',
		cannotRemoveProjectFromClients: 'Kan project niet verwijderen van clients.',
		cannotRemoveProjectFromWorkers: 'Kan project niet verwijderen van werknemers.',
		cannotRemoveProjectFromManager: 'Kan project niet verwijderen uit manager.',
		tokensAreMissing: 'Tokens ontbreken.',
		refreshTokenIsMissing: 'Vernieuwingstoken ontbreekt.',
		refreshTokenHasExpired: 'Vernieuwingstoken is verlopen.'
	},
	fields: {
		name: {
			text: 'naam'
		},
		fullName: {
			text: 'volledige naam'
		},
		firstName: {
			text: 'voornaam'
		},
		lastName: {
			text: 'familienaam'
		},
		password: {
			text: 'paswoord',
			hidePassword: 'Verberg paswoord',
			showPassword: 'Laat paswoord zien',
			forgotYourPassword: 'Je paswoord vergeten?'
		},
		email: {
			text: 'e-mailadres'
		},
		search: {
			text: 'zoekopdracht'
		},
		phone: {
			text: 'telefoon'
		},
		role: {
			text: 'rol'
		},
		title: {
			text: 'titel'
		},
		description: {
			text: 'beschrijving'
		},
		status: {
			text: 'toestand'
		},
		responsible: {
			text: 'verantwoordelijk'
		},
		preferredLanguage: {
			text: 'voorkeurstaal'
		},
		address: {
			text: 'adres'
		},
		read: {
			text: 'lezen'
		},
		write: {
			text: 'schrijven'
		}
	},
	buttonsOrLinks: {
		cancel: 'Annuleren',
		confirm: 'Bevestigen',
		addSomething: '{ something } toevoegen',
		editSomething: '{ something } bewerken',
		deleteSomething: 'Verwijder { something }',
		saveSomething: 'Bewaar { something }',
		logOut: 'Uitloggen',
		logIn: 'Log in',
		goBackToDashboard: 'Ga terug naar Dashboard'
	},
	components: {
		footer: {
			copyright: 'Alle rechten voorbehouden.',
			slogan: 'forge - Uw onmisbare assistent'
		},
		modal: {
			placeholders: {
				title: 'Modale titel',
				body: 'Modale inhoud'
			},
			deleteMessage: 'Vind je het goed om dit te verwijderen { entity }?'
		},
		table: {
			actions: 'acties'
		},
		form: {
			placeholders: {
				selectEmptyOptionText: 'Kies een optie'
			}
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'rol',
				multiple: 'rollen'
			}
		},
		permissions: {
			entity: {
				single: 'toestemming',
				multiple: 'rechten'
			}
		},
		users: {
			entity: {
				single: 'gebruiker',
				multiple: 'gebruikers'
			},
			types: {
				admin: {
					single: 'beheerder',
					multiple: 'beheerders'
				},
				manager: {
					single: 'manager',
					multiple: 'managers'
				},
				client: {
					single: 'cliënt',
					multiple: 'klanten'
				},
				worker: {
					single: 'arbeider',
					multiple: 'werknemers'
				}
			}
		},
		projects: {
			entity: {
				single: 'project',
				multiple: 'projecten'
			}
		},
		tasks: {
			entity: {
				single: 'taak',
				multiple: 'taken'
			}
		}
	}
} satisfies BaseTranslation;
