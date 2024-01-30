import { Collection, ObjectId } from 'mongodb';
import { Permission, Project, Role, Task, User } from '../models';
import { faker } from '@faker-js/faker';
import { Language, Modules, UserRole } from '../enums';
import { formErrorObject } from './error-handling';
import {
    createPermissionsObjectFromArray,
    generateObjectIds,
    getHashedPasswordForRole,
    getRandomNumber,
    getRandomPastDate,
    groupTasksByProject
} from './helpers';
import { TaskStatus } from '../enums/Task';
import dotenv from 'dotenv';
import path from 'path';

// --------- dotenv ------------
dotenv.config({ path: path.resolve(__dirname, '../../../../.env') });

const numberOfUsersToGenerate = 15;
const numberOfProjectsToGenerate = 5;
const numberOfTasksToGenerate = 5;
const projectsIds = generateObjectIds(numberOfProjectsToGenerate);
const tasksIds = generateObjectIds(numberOfTasksToGenerate * numberOfProjectsToGenerate);
const tasksIdsPerProjectsIds = groupTasksByProject({
    projects: projectsIds,
    tasks: tasksIds,
    numberOfProjectsToGenerate,
    numberOfTasksToGenerate
});
const roles: UserRole[] = Object.values(UserRole);
const modules: Modules[] = Object.values(Modules);
const languages: Language[] = Object.values(Language);
const taskStatuses: TaskStatus[] = Object.values(TaskStatus);
const ownerObjectId = new ObjectId();
const adminObjectId = new ObjectId();
const managerObjectId = new ObjectId();
const clientObjectId = new ObjectId();
const workerObjectId = new ObjectId();
const adminUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => ({
        name: module,
        read: true,
        write: true
    }))
);
const managerUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === Modules.ROLES || module === Modules.PERMISSIONS) {
            return {
                name: module,
                read: false,
                write: false
            };
        } else if (module === Modules.USERS) {
            return {
                name: module,
                read: true,
                write: false
            };
        } else {
            return {
                name: module,
                read: true,
                write: true
            };
        }
    })
);
const clientUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === Modules.PROJECTS || module === Modules.TASKS) {
            return {
                name: module,
                read: true,
                write: true
            };
        } else {
            return {
                name: module,
                read: false,
                write: false
            };
        }
    })
);
const workerUserPermissions = createPermissionsObjectFromArray(
    modules.map((module) => {
        if (module === Modules.TASKS) {
            return {
                name: module,
                read: true,
                write: true
            };
        } else if (module === Modules.USERS || module === Modules.PROJECTS) {
            return {
                name: module,
                read: true,
                write: false
            };
        } else {
            return {
                name: module,
                read: false,
                write: false
            };
        }
    })
);

export const seedRoles = async (collection: Collection<Role>): Promise<void> => {
    try {
        const rolesToInsert = roles.map((role) => ({
            name: role,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        }));
        await collection.insertMany(rolesToInsert);
    } catch (e) {
        console.error(formErrorObject({ errorKey: 'error_seeding_roles', error: e }));
    } finally {
        console.info('Roles collection seeded');
    }
};

export const seedPermissions = async (collection: Collection<Permission>): Promise<void> => {
    try {
        const permissionsToInsert = modules.map((module) => ({
            name: module,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        }));
        await collection.insertMany(permissionsToInsert);
    } catch (e) {
        console.error(formErrorObject({ errorKey: 'error_seeding_permissions', error: e }));
    } finally {
        console.info('Permissions collection seeded');
    }
};

export const seedUsers = async (collection: Collection<User>): Promise<void> => {
    try {
        const adminUser = {
            _id: adminObjectId,
            firstName: `${process.env.ADMIN_FIRST_NAME}`,
            lastName: `${process.env.ADMIN_LAST_NAME}`,
            email: `${process.env.ADMIN_EMAIL}`,
            phone: `${process.env.ADMIN_PHONE}`,
            password: await getHashedPasswordForRole(UserRole.ADMIN),
            role: UserRole.ADMIN,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: adminUserPermissions,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        };

        const ownerUser = {
            _id: ownerObjectId,
            firstName: 'Adrian',
            lastName: 'Owner',
            email: 'owner.test.user@forge.com',
            phone: faker.phone.number(),
            password: await getHashedPasswordForRole(UserRole.ADMIN),
            role: UserRole.OWNER,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: adminUserPermissions,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        };

        const managerTestUser = {
            _id: managerObjectId,
            firstName: 'Manager',
            lastName: 'TestUser',
            email: 'manager.test.user@forge.com',
            phone: faker.phone.number(),
            password: await getHashedPasswordForRole(UserRole.MANAGER),
            role: UserRole.MANAGER,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: managerUserPermissions,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        };

        const clientTestUser = {
            _id: clientObjectId,
            firstName: 'Client',
            lastName: 'TestUser',
            email: 'client.test.user@forge.com',
            phone: faker.phone.number(),
            password: await getHashedPasswordForRole(UserRole.CLIENT),
            role: UserRole.CLIENT,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: clientUserPermissions,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        };

        const workerTestUser = {
            _id: workerObjectId,
            firstName: 'Worker',
            lastName: 'TestUser',
            email: 'worker.test.user@forge.com',
            phone: faker.phone.number(),
            password: await getHashedPasswordForRole(UserRole.WORKER),
            role: UserRole.WORKER,
            preferredLanguage: Language.EN,
            projects: projectsIds,
            permissions: workerUserPermissions,
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        };

        const generateUsers = async (numberOfUsersToGenerate: number): Promise<User[]> => {
            const userGenerationPromises = Array.from(
                { length: numberOfUsersToGenerate },
                async () => {
                    const firstName = faker.person.firstName();
                    const lastName = faker.person.lastName();
                    const role = faker.helpers.arrayElement(
                        roles.filter((role) => role !== 'admin' && role !== 'owner')
                    );
                    const password = await getHashedPasswordForRole(role as UserRole);
                    const permissionsByRole = {
                        [UserRole.ADMIN]: adminUserPermissions,
                        [UserRole.MANAGER]: managerUserPermissions,
                        [UserRole.CLIENT]: clientUserPermissions,
                        [UserRole.WORKER]: workerUserPermissions,
                        [UserRole.OWNER]: adminUserPermissions
                    };

                    return {
                        firstName,
                        lastName,
                        email: faker.internet.email({ firstName, lastName }),
                        phone: faker.phone.number(),
                        password,
                        role,
                        preferredLanguage: faker.helpers.arrayElement(languages),
                        projects: [],
                        permissions: permissionsByRole[role],
                        address: {
                            country: faker.location.country(),
                            county: faker.location.county(),
                            city: faker.location.city(),
                            street: faker.location.street(),
                            locationNumber: faker.location.buildingNumber(),
                            zipCode: faker.location.zipCode()
                        },
                        changeLog: {
                            createdAt: getRandomPastDate(getRandomNumber(1, 365))
                        }
                    };
                }
            );

            return Promise.all(userGenerationPromises);
        };

        const usersToInsert = await generateUsers(numberOfUsersToGenerate);

        await collection.insertMany([
            adminUser,
            ownerUser,
            clientTestUser,
            workerTestUser,
            managerTestUser,
            ...usersToInsert
        ]);
    } catch (e) {
        console.error(formErrorObject({ errorKey: 'error_seeding_users', error: e }));
    } finally {
        console.info('Users collection seeded');
    }
};

export const seedProjects = async (collection: Collection<Project>): Promise<void> => {
    try {
        const projectsToInsert = projectsIds.map((projectId) => ({
            _id: new ObjectId(projectId),
            name: faker.commerce.productName(),
            description: faker.lorem.paragraph(),
            clients: [clientObjectId],
            workers: [workerObjectId],
            manager: managerObjectId,
            tasks: tasksIdsPerProjectsIds[projectId.toString()].map(
                (taskId: string) => new ObjectId(taskId)
            ),
            changeLog: {
                createdAt: getRandomPastDate(getRandomNumber(1, 365))
            }
        }));

        await collection.insertMany(projectsToInsert);
    } catch (e) {
        console.error(formErrorObject({ errorKey: 'error_seeding_projects', error: e }));
    } finally {
        console.info('Projects collection seeded');
    }
};

export const seedTasks = async (collection: Collection<Task>): Promise<void> => {
    try {
        const tasksToInsert = [];
        for (const [projectId, taskIds] of Object.entries(tasksIdsPerProjectsIds)) {
            const arrayToInsert = (taskIds as string[]).map((taskId: string) => ({
                _id: new ObjectId(taskId),
                title: faker.lorem.lines({ min: 1, max: 1 }),
                description: faker.lorem.paragraph(),
                project: new ObjectId(projectId),
                responsible: [workerObjectId],
                status: faker.helpers.arrayElement(taskStatuses),
                changeLog: {
                    createdAt: getRandomPastDate(getRandomNumber(1, 365))
                }
            }));
            tasksToInsert.push(arrayToInsert);
        }

        await collection.insertMany(tasksToInsert.flat());
    } catch (e) {
        console.error(formErrorObject({ errorKey: 'error_seeding_tasks', error: e }));
    } finally {
        console.info('Tasks collection seeded');
    }
};
