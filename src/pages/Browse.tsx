import { useState, useMemo } from 'react';
import { Filter } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import FilterPanel from '@/components/FilterPanel';
import { filterTasks, mockTasks } from '@/data/tasks';
import { TaskLocation, TaskDuration, TaskType, TaskDifficulty } from '@/types';

export default function Browse() {
  const [filters, setFilters] = useState({
    locations: [] as TaskLocation[],
    durations: [] as TaskDuration[],
    types: [] as TaskType[],
    difficulties: [] as TaskDifficulty[],
  });

  const filteredTasks = useMemo(() => {
    return filterTasks({
      locations: filters.locations,
      durations: filters.durations,
      types: filters.types,
      difficulties: filters.difficulties,
    });
  }, [filters]);

  const hasFilters = filters.locations.length > 0 || 
    filters.durations.length > 0 || 
    filters.types.length > 0 || 
    filters.difficulties.length > 0;

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">📋 分类浏览</h1>
            <p className="text-gray-500 mt-1">
              {hasFilters 
                ? `已筛选出 ${filteredTasks.length} 个任务` 
                : `共 ${mockTasks.length} 个任务`
              }
            </p>
          </div>
          <button
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-white rounded-lg shadow-sm border"
            onClick={() => {}}
          >
            <Filter size={18} />
            <span>筛选</span>
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="hidden lg:block w-72 flex-shrink-0">
            <FilterPanel filters={filters} onFiltersChange={setFilters} />
          </div>

          <div className="flex-1">
            <FilterPanel filters={filters} onFiltersChange={setFilters} isMobile />

            {filteredTasks.length === 0 ? (
              <div className="text-center py-16">
                <div className="text-6xl mb-4">😕</div>
                <h3 className="text-xl font-medium text-gray-700 mb-2">没有找到匹配的任务</h3>
                <p className="text-gray-500">试试调整筛选条件吧</p>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredTasks.map((task) => (
                  <TaskCard key={task.id} task={task} />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
