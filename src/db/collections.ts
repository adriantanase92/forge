import db from "./mongo.js";

export const users = db.collection("users");
export const permissions = db.collection("permissions");
export const roles = db.collection("roles");
export const projects = db.collection("projects");
export const tasks = db.collection("tasks");
export const invoices = db.collection("invoices");

export const collectionsList = [users, permissions, roles, projects, tasks, invoices];
