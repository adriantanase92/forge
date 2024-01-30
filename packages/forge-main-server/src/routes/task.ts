import { FastifyInstance } from 'fastify';
import type { Db, Task, TaskDocument } from '../models';
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
import { ObjectId } from 'mongodb';
import { authenticate } from '../middlewares';

async function taskRoutes(app: FastifyInstance, db: Db) {
    app.get<{ Querystring: QueryString }>(
        '/tasks',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const response = await getAll<TaskDocument>({
                    db,
                    collection: db.tasks,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_tasks',
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

    app.get<{ Params: RouteParams; Querystring: QueryString }>(
        '/tasks/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const query = request.query;
                const { id } = request.params;
                const response = await getOne<TaskDocument>({
                    db,
                    collection: db.tasks,
                    id,
                    requestQuery: query
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_get_task',
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

    app.post<{ Body: Task }>(
        '/tasks',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const newTask = request.body;
                const response = await createOne<TaskDocument, Task>({
                    collection: db.tasks,
                    newItemData: newTask
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_create_task',
                            error: response.error
                        })
                    );
                } else {
                    const projectResponse = await db.projects.updateOne(
                        { _id: new ObjectId((response.data as TaskDocument).project) },
                        {
                            $push: { tasks: new ObjectId((response.data as TaskDocument)._id) }
                        }
                    );

                    if ('error' in projectResponse) {
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'cannot_add_task_to_project',
                                error: projectResponse.error
                            })
                        );
                    } else {
                        reply.code(201).send({ data: response.data });
                    }
                }
            } catch (e) {
                reply
                    .code(500)
                    .send(formErrorObject({ errorKey: 'internal_server_error', error: e }));
            }
        }
    );

    app.patch<{ Params: RouteParams; Body: Partial<Task> }>(
        '/tasks/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const updatedTask = request.body;
                const response = await updateOne<TaskDocument>({
                    collection: db.tasks,
                    id,
                    dataToUpdate: updatedTask
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_update_task',
                            error: response.error
                        })
                    );
                } else {
                    const currentTask = await db.tasks.findOne({ _id: new ObjectId(id) });

                    // Check if the project ID has changed
                    if (
                        updatedTask.project &&
                        currentTask &&
                        updatedTask.project.toString() !== currentTask.project.toString()
                    ) {
                        const removeTaskFromOldProjectResponse = await db.projects.updateOne(
                            { _id: new ObjectId(currentTask.project) },
                            { $pull: { tasks: new ObjectId(id) } }
                        );

                        if ('error' in removeTaskFromOldProjectResponse) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_remove_task_from_project',
                                    error: removeTaskFromOldProjectResponse.error
                                })
                            );
                        }

                        const addNewTaskToNewProject = await db.projects.updateOne(
                            { _id: new ObjectId(updatedTask.project) },
                            { $push: { tasks: new ObjectId(id) } }
                        );

                        if ('error' in addNewTaskToNewProject) {
                            reply.code(500).send(
                                formErrorObject({
                                    errorKey: 'cannot_add_task_to_project',
                                    error: addNewTaskToNewProject.error
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
        '/tasks/:id',
        { preValidation: [authenticate] },
        async (request, reply) => {
            try {
                const { id } = request.params;
                const taskToDelete = await db.tasks.findOne({ _id: new ObjectId(id) });

                if (taskToDelete) {
                    const deleteTaskFromProjectResponse = await db.projects.updateOne(
                        { _id: new ObjectId(taskToDelete.project) },
                        { $pull: { tasks: new ObjectId(id) } }
                    );

                    if ('error' in deleteTaskFromProjectResponse) {
                        reply.code(500).send(
                            formErrorObject({
                                errorKey: 'cannot_remove_task_from_project',
                                error: deleteTaskFromProjectResponse.error
                            })
                        );
                    }
                }

                const response = await deleteOne<TaskDocument>({
                    collection: db.tasks,
                    id
                });

                if ('error' in response) {
                    reply.code(500).send(
                        formErrorObject({
                            errorKey: 'cannot_delete_task',
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
}

export default taskRoutes;
