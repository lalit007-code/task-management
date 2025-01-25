import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getTask = async (req: Request, res: Response): Promise<void> => {
  //need project id from client in the query to fetch the task
  const { projectId } = req.query;
  console.log("projectId--", projectId);

  try {
    const tasks = await prisma.task.findMany({
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
  } catch (error: any) {
    res.status(500).json({
      message: `Error fetching tasks ${error.message}`,
    });
  }
};

export const createTask = async (
  req: Request,
  res: Response
): Promise<void> => {
  const {
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
  } = req.body;

  try {
    const newTask = await prisma.task.create({
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
  } catch (error: any) {
    res.status(500).json({
      message: `Error creating task ${error.message}`,
    });
  }
};

export const updateTaskStatus = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { taskId } = req.params;
  const { status } = req.body;
  console.log("taskId--", taskId);
  try {
    const updatedTask = await prisma.task.update({
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
  } catch (error: any) {
    res.status(500).json({
      message: `Error updating task ${error.message}`,
    });
  }
};
