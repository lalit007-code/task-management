"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateTaskStatus = exports.createTask = exports.getTask = void 0;
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const getTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //need project id from client in the query to fetch the task
    const { projectId } = req.query;
    console.log("projectId--", projectId);
    try {
        const tasks = yield prisma.task.findMany({
            where: {
                projectId: Number(projectId),
            },
            include: {
                author: true,
                assignee: true,
                comments: true,
                attachments: true,
            },
        });
        console.log("tasks-", tasks);
        res.json({
            message: "fetched tasks successfully",
            tasks,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error fetching tasks ${error.message}`,
        });
    }
});
exports.getTask = getTask;
const createTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { title, description, status, priority, tags, startDate, dueDate, points, projectId, authorUserId, assignedUserId, } = req.body;
    try {
        const newTask = yield prisma.task.create({
            data: {
                title,
                description,
                status,
                priority,
                tags,
                startDate,
                dueDate,
                points,
                projectId,
                authorUserId,
                assignedUserId,
            },
        });
        res.status(201).json({
            message: "task created successfully",
            newTask,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error creating task ${error.message}`,
        });
    }
});
exports.createTask = createTask;
const updateTaskStatus = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { taskId } = req.params;
    const { status } = req.body;
    console.log("taskId--", taskId);
    try {
        const updatedTask = yield prisma.task.update({
            where: {
                id: Number(taskId),
            },
            data: {
                status: status,
            },
        });
        res.status(200).json({
            message: "task update successfully",
            updatedTask,
        });
    }
    catch (error) {
        res.status(500).json({
            message: `Error updating task ${error.message}`,
        });
    }
});
exports.updateTaskStatus = updateTaskStatus;
