import axios from "axios";

const API_BASE_URL = "http://localhost:9090";

export interface Task {
  id: string;
  name: string;
  owner: string;
  command: string;
  taskExecutions: TaskExecution[];
}

export interface TaskExecution {
  startTime: string;
  endTime: string;
  output: string;
}

export const getTasks = async (): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks`);
  return response.data;
};

export const getTaskById = async (taskId: string): Promise<Task> => {
  const response = await axios.get(`${API_BASE_URL}/tasks/${taskId}`);
  return response.data;
};

export const createTask = async (task: Task): Promise<void> => {
  await axios.put(`${API_BASE_URL}/tasks`, task);
};

export const deleteTask = async (taskId: string): Promise<void> => {
  await axios.delete(`${API_BASE_URL}/tasks/${taskId}`);
};

export const searchTasksByName = async (name: string): Promise<Task[]> => {
  const response = await axios.get(`${API_BASE_URL}/tasks/search?name=${name}`);
  return response.data;
};

export const executeTask = async (taskId: string): Promise<void> => {
  await axios.put(`${API_BASE_URL}/tasks/${taskId}/execute`);
};

// Correct update task API
export const updateTask = async (taskId: string, task: Partial<Task>): Promise<void> => {
  await axios.patch(`${API_BASE_URL}/tasks/${taskId}`, task);
};
