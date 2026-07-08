export type TaskType = 'learning' | 'relaxation' | 'creative' | 'challenge' | 'social' | 'food' | 'sports' | 'life';

export type TaskLocation = 'indoor' | 'outdoor';

export type TaskDuration = 'short' | 'long';

export type TaskDifficulty = 'easy' | 'medium' | 'hard';

export interface Task {
  id: string;
  title: string;
  description: string;
  type: TaskType;
  location: TaskLocation;
  duration: TaskDuration;
  difficulty: TaskDifficulty;
  likes: number;
  completed: number;
  author: string;
  createdAt: string;
}

export interface UserData {
  favoriteTasks: string[];
  completedTasks: string[];
  submittedTasks: Task[];
}

export interface FilterState {
  locations: TaskLocation[];
  durations: TaskDuration[];
  types: TaskType[];
  difficulties: TaskDifficulty[];
}

export const TYPE_LABELS: Record<TaskType, string> = {
  learning: '学习',
  relaxation: '放松',
  creative: '创意',
  challenge: '挑战',
  social: '社交',
  food: '美食',
  sports: '运动',
  life: '生活',
};

export const TYPE_ICONS: Record<TaskType, string> = {
  learning: '📚',
  relaxation: '☕',
  creative: '🎨',
  challenge: '🔥',
  social: '👥',
  food: '🍳',
  sports: '⚽',
  life: '🏠',
};

export const TYPE_COLORS: Record<TaskType, string> = {
  learning: 'bg-blue-100 text-blue-800',
  relaxation: 'bg-green-100 text-green-800',
  creative: 'bg-purple-100 text-purple-800',
  challenge: 'bg-red-100 text-red-800',
  social: 'bg-pink-100 text-pink-800',
  food: 'bg-orange-100 text-orange-800',
  sports: 'bg-teal-100 text-teal-800',
  life: 'bg-amber-100 text-amber-800',
};

export const LOCATION_LABELS: Record<TaskLocation, string> = {
  indoor: '室内',
  outdoor: '室外',
};

export const LOCATION_ICONS: Record<TaskLocation, string> = {
  indoor: '🏠',
  outdoor: '🌳',
};

export const DURATION_LABELS: Record<TaskDuration, string> = {
  short: '短期',
  long: '长期',
};

export const DURATION_ICONS: Record<TaskDuration, string> = {
  short: '⏱️',
  long: '📅',
};

export const DIFFICULTY_LABELS: Record<TaskDifficulty, string> = {
  easy: '简单',
  medium: '中等',
  hard: '困难',
};

export const DIFFICULTY_COLORS: Record<TaskDifficulty, string> = {
  easy: 'bg-green-500',
  medium: 'bg-yellow-500',
  hard: 'bg-red-500',
};
