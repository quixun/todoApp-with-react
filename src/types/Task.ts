export type Task = {
  id: string;
  description: string;
  completedAt: string | null;
  deletedAt: string | null;
};

export type ApiResponse = {
  page: number;
  limit: number;
  total: number;
  tasks: Task[];
};

