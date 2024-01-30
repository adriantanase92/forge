import { FastifyInstance } from 'fastify';
import type { Db, Project, ProjectDocument } from '../models';
import {
    QueryString,
    RouteParams,
    createOne,
    deleteOne,
    formErrorObject,
    getAll,
    getOne,
    updateOne
} from '../utils';
import { ObjectId, WithId } from 'mongodb';
import { authenticate } from '../middlewares';

async function projectRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>(
        '/projects',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const response = await getAll<ProjectDocument>({
                    db,
                    collection: db.projects,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_projects',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.get<{ Querystring: QueryString; Params: RouteParams }>(
        '/projects/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const { id } = request.params;
                const response = await getOne<ProjectDocument>({
                    db,
                    collection: db.projects,
                    id,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_project',
                            error: response.error
                        })
                    );
                } else {
                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.post<{ Body: Project }>(
        '/projects',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const newProject = request.body;
                const response = await createOne<ProjectDocument, Project>({
                    collection: db.projects,
                    newItemData: newProject
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_create_project',
                            error: response.error
                        })
                    );
                } else {
                    const { _id: newProjectId } = response.data as WithId<ProjectDocument>;

                    // Update clients
                    if (newProject.clients && newProject.clients.length > 0) {
                        await db.users.updateMany(
                            { _id: { $in: newProject.clients } },
                            { $push: { projects: newProjectId } }
                        );
                    }

                    // Update workers
                    if (newProject.workers && newProject.workers.length > 0) {
                        await db.users.updateMany(
                            { _id: { $in: newProject.workers } },
                            { $push: { projects: newProjectId } }
                        );
                    }

                    // Update manager
                    if (newProject.manager) {
                        await db.users.updateOne(
                            { _id: newProject.manager },
                            { $push: { projects: newProjectId } }
                        );
                    }
                    reply.code(201).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.patch<{ Params: RouteParams; Body: Partial<Project> }>(
        '/projects/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const projectId = new ObjectId(id);
                const updatedProjectData = request.body;

                // Fetch the current project
                const currentProject = await db.projects.findOne({ _id: projectId });
                if (!currentProject) {
                    reply.code(404).send(formErrorObject({ errorKey: 'project_not_found' }));
                    return;
                }

                const response = await updateOne<ProjectDocument>({
                    collection: db.projects,
                    id,
                    dataToUpdate: updatedProjectData
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_update_project',
                            error: response.error
                        })
                    );
                } else {
                    // Handle changes in clients
                    if (currentProject && updatedProjectData.clients) {
                        if (currentProject.clients && currentProject.clients.length > 0) {
                            // Remove project ID from clients no longer associated
                            const clientsToRemove = currentProject.clients.filter(
                                (clientId) =>
                                    !(updatedProjectData.clients as ObjectId[]).includes(clientId)
                            );
                            const removeResponse = await db.users.updateMany(
                                { _id: { $in: clientsToRemove } },
                                { $pull: { projects: new ObjectId(projectId) } }
                            );

                            if ('error' in removeResponse) {
                                reply.code(500).send(
                                    formErrorObject({
                                        errorKey: 'cannot_remove_project_from_clients',
                                        error: removeResponse.error
                                    })
                                );
                            }
                        }

                        // Add project ID to new clients
                        const clientsToAdd = updatedProjectData.clients.filter(
                            (clientId: ObjectId) =>
                                !(currentProject.clients as ObjectId[]).includes(clientId)
                        );
                        const addResponse = await db.users.updateMany(
                            { _id: { $in: clientsToAdd } },
                            { $push: { projects: new ObjectId(projectId) } }
                        );

                        if ('error' in addResponse) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_add_project_to_clients',
                                    error: addResponse.error
                                })
                            );
                        }
                    }

                    // Handle changes in workers
                    if (currentProject && updatedProjectData.workers) {
                        if (currentProject.workers && currentProject.workers.length > 0) {
                            const workersToRemove = currentProject.workers.filter(
                                (workerId) =>
                                    !(updatedProjectData.workers as ObjectId[]).includes(workerId)
                            );
                            const removeResponse = await db.users.updateMany(
                                { _id: { $in: workersToRemove } },
                                { $pull: { projects: new ObjectId(projectId) } }
                            );

                            if ('error' in removeResponse) {
                                reply.code(500).send(
                                    formErrorObject({
                                        errorKey: 'cannot_remove_project_from_workers',
                                        error: removeResponse.error
                                    })
                                );
                            }
                        }

                        const workersToAdd = updatedProjectData.workers.filter(
                            (workerId) => !(currentProject.workers as ObjectId[]).includes(workerId)
                        );
                        const addResponse = await db.users.updateMany(
                            { _id: { $in: workersToAdd } },
                            { $push: { projects: new ObjectId(projectId) } }
                        );

                        if ('error' in addResponse) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_add_project_to_workers',
                                    error: addResponse.error
                                })
                            );
                        }
                    }

                    // Handle changes in manager
                    if (
                        updatedProjectData.manager &&
                        !updatedProjectData.manager.equals(currentProject.manager)
                    ) {
                        // Remove project ID from the old manager's project list
                        const removeResponse = await db.users.updateOne(
                            { _id: currentProject.manager },
                            { $pull: { projects: new ObjectId(projectId) } }
                        );

                        if ('error' in removeResponse) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_remove_project_from_manager',
                                    error: removeResponse.error
                                })
                            );
                        }

                        // Add project ID to the new manager's project list
                        const addResponse = await db.users.updateOne(
                            { _id: updatedProjectData.manager },
                            { $push: { projects: new ObjectId(projectId) } }
                        );

                        if ('error' in addResponse) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_add_project_to_manager',
                                    error: addResponse.error
                                })
                            );
                        }
                    }

                    reply.code(201).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.delete<{ Params: RouteParams }>(
        '/projects/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const projectId = new ObjectId(id);

                // Fetch the project to get references
                const projectToDelete = await db.projects.findOne({ _id: projectId });
                if (!projectToDelete) {
                    reply.code(404).send(
                        formErrorObject({
                            errorKey: 'project_not_found'
                        })
                    );
                    return;
                }

                const response = await deleteOne<ProjectDocument>({
                    collection: db.projects,
                    id
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_delete_project',
                            error: response.error
                        })
                    );
                } else {
                    // Remove the project from clients' projects list
                    const removeProjectFromClients = await db.users.updateMany(
                        { _id: { $in: projectToDelete.clients } },
                        { $pull: { projects: new ObjectId(projectId) } }
                    );

                    if ('error' in removeProjectFromClients) {
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'cannot_remove_project_from_clients',
                                error: removeProjectFromClients.error
                            })
                        );
                    }

                    // Remove the project from workers' projects list
                    const removeProjectFromWokers = await db.users.updateMany(
                        { _id: { $in: projectToDelete.workers } },
                        { $pull: { projects: new ObjectId(projectId) } }
                    );

                    if ('error' in removeProjectFromWokers) {
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'cannot_remove_project_from_workers',
                                error: removeProjectFromWokers.error
                            })
                        );
                    }

                    // Remove the project from the manager's projects list
                    const removeProjectFromManager = await db.users.updateOne(
                        { _id: projectToDelete.manager },
                        { $pull: { projects: new ObjectId(projectId) } }
                    );

                    if ('error' in removeProjectFromManager) {
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'cannot_remove_project_from_manager',
                                error: removeProjectFromManager.error
                            })
                        );
                    }

                    // Delete all tasks associated with the project
                    await db.tasks.deleteMany({ project: new ObjectId(projectId) });

                    reply.code(200).send({ data: response.data });
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );
}

export default projectRoutes;
