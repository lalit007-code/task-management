export interface Project {
  id: number;
  name: string;
  description?: string;
  startDate?: string;
  endDate?: string;
}

export enum Priority {
  Urgent = "Urgent",
  High = "High",
  Medium = "Medium",
  Low = "Low",
  Backlog = "Backlog",
}

export enum Status {
  ToDo = "To Do",
  WorkInProgress = "Work In Progress",
  UnderReview = "Under Review",
  Completed = "Completed",
}
export interface User {
  userId?: number;
  username: string;
  email: string;
  profilePictureUrl?: string;
  congnitoId?: string;
  teamId?: number;
}

export interface Attachment {
  id: number;
  fileUrl: number;
  fileName: string;
  taskId: string;
  uploadedById: number;
}

export interface Comment {
  id: number;
  taskId: number;
  userId: number;
  text: string;
}

export interface Task {
  id: number;
  projectId: string;
  title: string;
  description?: string;
  status?: Status;
  priority?: Priority;
  tags?: string;
  startDate?: string;
  dueDate?: string;
  points?: string;
  authorUserId?: string;
  assignedUserId?: string;

  author?: User;
  assignee?: User;
  comments?: Comment[];
  attachments?: Attachment[];
}
