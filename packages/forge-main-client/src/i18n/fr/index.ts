import type { BaseTranslation } from '$i18n/i18n-types';
import { localeRoutes } from '$i18n/routes';

export default {
	routes: localeRoutes('fr'),
	app: {
		name: 'forge',
		versionInfo: 'Version { version }'
	},
	menus: {
		sidebar: {
			dashboard: 'Tableau de bord',
			users: 'Utilisateurs',
			permissions: 'Autorisations',
			roles: 'Les rôles',
			projects: 'Projets',
			noItemsFoundMessage: 'Aucun élément de menu de la barre latérale trouvé!'
		}
	},
	pages: {
		logIn: {
			subtitle: 'à votre panneau { appName } personnel'
		},
		dashboard: {
			title: 'Mon tableau de bord'
		},
		users: {
			user: {
				generalInfo: 'Informations générales'
			}
		},
		notFound: {
			title: 'Oups !! Pas ici'
		}
	},
	notifications: {
		somethingDeletedSuccessfully: '{ something } a été supprimé avec succès!',
		somethingAddedSuccessfully: '{ something } ajouté avec succès!',
		somethingEditedSuccessfully: '{ something } modifié avec succès!'
	},
	errors: {
		required: 'Vous avez oublié de renseigner votre { field }.',
		requiredSelect: 'Vous avez oublié de sélectionner une option.',
		requiredDate: 'Veuillez sélectionner une date.',
		invalidDate: 'Veuillez entrer une date valide.',
		invalidForm: 'Forme non valide.',
		invalidEmail: 'Adresse email invalide - exemple: name@forge.com.',
		invalidPassword:
			'Votre mot de passe doit contenir au moins 8 caractères, une lettre majuscule, un chiffre et un de ces symboles (!@#$%^&*).',
		invalidCombination: 'Une combinaison invalide.',
		minCharacters: 'Minimum de { number } caractères requis.',
		maxCharacters: 'Nombre maximal de { number } caractères dépassé.',
		minValue: 'La valeur ne doit pas être inférieure à { number }.',
		maxValue: 'La valeur ne doit pas être supérieure à { number }.',
		noSomethingFound: 'Aucun { something } trouvé.',
		internalServerError: 'Erreur interne du serveur.',
		emailNotFound: "Cette adresse e-mail n'a pas été trouvée.",
		emailAddressAlreadyInUse: "L'adresse email existe déjà.",
		noDataFound: 'Aucune donnée disponible!',
		noInformation: 'Aucune information.',
		errorFetchingSomethingFromServer:
			'Erreur lors de la récupération de { something } depuis le serveur.',
		unexpectedResponseStructure: 'Structure de réponse inattendue.',
		cannotGetPermissions: "Impossible d'obtenir les autorisations.",
		cannotGetPermission: "Impossible d'obtenir l'autorisation.",
		cannotCreatePermission: 'Impossible de créer une autorisation.',
		cannotUpdatePermission: "Impossible de mettre à jour l'autorisation.",
		cannotDeletePermission: "Impossible de supprimer l'autorisation.",
		cannotGetRoles: "Impossible d'obtenir des rôles.",
		cannotGetRole: "Impossible d'obtenir le rôle.",
		cannotCreateRole: 'Impossible de créer un rôle.',
		cannotUpdateRole: 'Impossible de mettre à jour le rôle.',
		cannotDeleteRole: 'Impossible de supprimer le rôle.',
		cannotGetUsers: "Impossible d'obtenir des utilisateurs.",
		cannotGetUser: "Impossible d'obtenir l'utilisateur.",
		cannotCreateUser: 'Impossible de créer un utilisateur.',
		cannotUpdateUser: "Impossible de mettre à jour l'utilisateur.",
		cannotReplaceManagerWithOwnerOnProject:
			'Impossible de remplacer le gestionnaire par le propriétaire sur le projet.',
		cannotRemoveUserFromProject: "Impossible de supprimer l'utilisateur du projet.",
		cannotRemoveUserFromTasks: 'Impossible de supprimer un utilisateur des tâches.',
		cannotDeleteUser: "Impossible de supprimer l'utilisateur.",
		cannotGetTasks: "Impossible d'obtenir des tâches.",
		cannotGetTask: "Impossible d'obtenir la tâche.",
		cannotCreateTask: 'Impossible de créer une tâche.',
		cannotAddTaskToProject: "Impossible d'ajouter une tâche au projet.",
		cannotUpdateTask: 'Impossible de mettre à jour la tâche.',
		cannotRemoveTaskFromProject: 'Impossible de supprimer une tâche du projet.',
		cannotDeleteTask: 'Impossible de supprimer la tâche.',
		cannotGetProjects: "Impossible d'obtenir des projets.",
		cannotGetProject: "Impossible d'obtenir le projet.",
		cannotCreateProject: 'Impossible de créer un projet.',
		cannotUpdateProject: 'Impossible de mettre à jour le projet.',
		cannotAddProjectToClients: "Impossible d'ajouter un projet aux clients.",
		cannotAddProjectToWorkers: "Impossible d'ajouter un projet aux travailleurs.",
		cannotAddProjectToManager: "Impossible d'ajouter un projet au gestionnaire.",
		cannotDeleteProject: 'Impossible de supprimer le projet.',
		cannotRemoveProjectFromClients: 'Impossible de supprimer le projet des clients.',
		cannotRemoveProjectFromWorkers: 'Impossible de supprimer le projet des travailleurs.',
		cannotRemoveProjectFromManager: 'Impossible de supprimer le projet du gestionnaire.',
		tokensAreMissing: 'Il manque des jetons.',
		refreshTokenIsMissing: "Le jeton d'actualisation est manquant.",
		refreshTokenHasExpired: "Le jeton d'actualisation a expiré."
	},
	fields: {
		name: {
			text: 'nom'
		},
		fullName: {
			text: 'nom et prénom'
		},
		firstName: {
			text: 'prénom'
		},
		lastName: {
			text: 'nom de famille'
		},
		password: {
			text: 'mot de passe',
			hidePassword: 'Masquer le mot de passe',
			showPassword: 'Montrer le mot de passe',
			forgotYourPassword: 'Mot de passe oublié?'
		},
		email: {
			text: 'adresse e-mail'
		},
		search: {
			text: 'recherche'
		},
		phone: {
			text: 'téléphone'
		},
		role: {
			text: 'rôle'
		},
		title: {
			text: 'titre'
		},
		description: {
			text: 'description'
		},
		status: {
			text: 'statut'
		},
		responsible: {
			text: 'responsable'
		},
		preferredLanguage: {
			text: 'langue préférée'
		},
		address: {
			text: 'adresse'
		},
		read: {
			text: 'lire'
		},
		write: {
			text: 'écrire'
		}
	},
	buttonsOrLinks: {
		cancel: 'Annuler',
		confirm: 'Confirmer',
		addSomething: 'Ajoute { something }',
		editSomething: 'Modifier { something }',
		deleteSomething: 'Supprimer { something }',
		saveSomething: 'Enregistrer { something }',
		logOut: 'Se déconnecter',
		logIn: 'Connectez-vous',
		goBackToDashboard: 'Revenir au tableau de bord'
	},
	components: {
		footer: {
			copyright: 'Tous droits réservés.',
			slogan: 'forge - Votre assistant indispensable'
		},
		modal: {
			placeholders: {
				title: 'Titre modal',
				body: 'Contenu modal'
			},
			deleteMessage: "Êtes-vous d'accord pour supprimer ceci { entity }?"
		},
		table: {
			actions: 'actions'
		},
		form: {
			placeholders: {
				selectEmptyOptionText: 'Choisir une option'
			}
		}
	},
	modules: {
		roles: {
			entity: {
				single: 'rôle',
				multiple: 'les rôles'
			}
		},
		permissions: {
			entity: {
				single: 'autorisation',
				multiple: 'autorisations'
			}
		},
		users: {
			entity: {
				single: 'utilisateur',
				multiple: 'utilisateurs'
			},
			types: {
				admin: {
					single: 'administrateur',
					multiple: 'administrateurs'
				},
				manager: {
					single: 'directeur',
					multiple: 'gestionnaires'
				},
				client: {
					single: 'client',
					multiple: 'clients'
				},
				worker: {
					single: 'ouvrier',
					multiple: 'ouvriers'
				}
			}
		},
		projects: {
			entity: {
				single: 'projet',
				multiple: 'projets'
			}
		},
		tasks: {
			entity: {
				single: 'tâche',
				multiple: 'tâches'
			}
		}
	}
} satisfies BaseTranslation;
