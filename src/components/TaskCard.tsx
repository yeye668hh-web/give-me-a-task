import { Link } from 'react-router-dom';
import { Heart, CheckCircle, Clock, MapPin } from 'lucide-react';
import { Task, TYPE_LABELS, TYPE_ICONS, TYPE_COLORS, LOCATION_LABELS, DURATION_LABELS, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types';

interface TaskCardProps {
  task: Task;
  isFavorite?: boolean;
  onLike?: (id: string) => void;
  onFavorite?: (id: string) => void;
  compact?: boolean;
}

export default function TaskCard({ task, isFavorite = false, onLike, onFavorite, compact = false }: TaskCardProps) {
  if (compact) {
    return (
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm hover:shadow-md transition-all duration-200 cursor-pointer group">
        <div className={`w-12 h-12 rounded-full ${TYPE_COLORS[task.type]} flex items-center justify-center text-xl flex-shrink-0`}>
          {TYPE_ICONS[task.type]}
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-800 truncate group-hover:text-primary-600 transition-colors">
            {task.title}
          </h3>
          <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Clock size={14} />
              {DURATION_LABELS[task.duration]}
            </span>
            <span className="flex items-center gap-1">
              <MapPin size={14} />
              {LOCATION_LABELS[task.location]}
            </span>
            <span className="flex items-center gap-1">
              <Heart size={14} />
              {task.likes}
            </span>
          </div>
        </div>
        <Link
          to={`/task/${task.id}`}
          className="px-3 py-1.5 bg-primary-50 text-primary-600 rounded-lg text-sm font-medium hover:bg-primary-100 transition-colors"
        >
          查看
        </Link>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer">
      <div className="p-5">
        <div className="flex items-start justify-between mb-3">
          <div className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-sm font-medium ${TYPE_COLORS[task.type]}`}>
            <span>{TYPE_ICONS[task.type]}</span>
            <span>{TYPE_LABELS[task.type]}</span>
          </div>
          <button
            onClick={(e) => {
              e.stopPropagation();
              onFavorite?.(task.id);
            }}
            className={`p-1.5 rounded-full transition-colors ${
              isFavorite ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
            }`}
          >
            <Heart size={18} fill={isFavorite ? 'currentColor' : 'none'} />
          </button>
        </div>

        <h3 className="text-lg font-bold text-gray-800 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
          {task.title}
        </h3>

        <p className="text-gray-600 text-sm mb-4 line-clamp-3 leading-relaxed">
          {task.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
            <MapPin size={12} />
            {LOCATION_LABELS[task.location]}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
            <Clock size={12} />
            {DURATION_LABELS[task.duration]}
          </span>
          <span className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 rounded-md text-xs">
            <span className={`w-1.5 h-1.5 rounded-full ${DIFFICULTY_COLORS[task.difficulty]}`} />
            {DIFFICULTY_LABELS[task.difficulty]}
          </span>
        </div>

        <div className="flex items-center justify-between pt-3 border-t border-gray-100">
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <span className="flex items-center gap-1">
              <Heart size={14} />
              {task.likes}
            </span>
            <span className="flex items-center gap-1">
              <CheckCircle size={14} />
              {task.completed}
            </span>
          </div>
          <span className="text-xs text-gray-400">
            {task.author} · {task.createdAt}
          </span>
        </div>
      </div>

      <div className="px-5 pb-5">
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onLike?.(task.id);
            }}
            className="flex-1 px-4 py-2.5 bg-gray-100 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-200 transition-colors flex items-center justify-center gap-1.5"
          >
            <Heart size={16} />
            点赞
          </button>
          <Link
            to={`/task/${task.id}`}
            className="flex-1 px-4 py-2.5 bg-primary-500 text-white rounded-lg text-sm font-medium hover:bg-primary-600 transition-colors"
          >
            开始挑战
          </Link>
        </div>
      </div>
    </div>
  );
}
