import { useState } from 'react';
import { ChevronDown, X } from 'lucide-react';
import { TaskLocation, TaskDuration, TaskType, TaskDifficulty, LOCATION_LABELS, LOCATION_ICONS, DURATION_LABELS, DURATION_ICONS, TYPE_LABELS, TYPE_ICONS, DIFFICULTY_LABELS } from '@/types';

interface FilterPanelProps {
  filters: {
    locations: TaskLocation[];
    durations: TaskDuration[];
    types: TaskType[];
    difficulties: TaskDifficulty[];
  };
  onFiltersChange: (filters: FilterPanelProps['filters']) => void;
  isMobile?: boolean;
}

const LOCATIONS: { value: TaskLocation; label: string; icon: string }[] = [
  { value: 'indoor', label: LOCATION_LABELS.indoor, icon: LOCATION_ICONS.indoor },
  { value: 'outdoor', label: LOCATION_LABELS.outdoor, icon: LOCATION_ICONS.outdoor },
];

const DURATIONS: { value: TaskDuration; label: string; icon: string }[] = [
  { value: 'short', label: DURATION_LABELS.short, icon: DURATION_ICONS.short },
  { value: 'long', label: DURATION_LABELS.long, icon: DURATION_ICONS.long },
];

const TYPES: { value: TaskType; label: string; icon: string }[] = [
  { value: 'learning', label: TYPE_LABELS.learning, icon: TYPE_ICONS.learning },
  { value: 'relaxation', label: TYPE_LABELS.relaxation, icon: TYPE_ICONS.relaxation },
  { value: 'creative', label: TYPE_LABELS.creative, icon: TYPE_ICONS.creative },
  { value: 'challenge', label: TYPE_LABELS.challenge, icon: TYPE_ICONS.challenge },
  { value: 'social', label: TYPE_LABELS.social, icon: TYPE_ICONS.social },
  { value: 'food', label: TYPE_LABELS.food, icon: TYPE_ICONS.food },
  { value: 'sports', label: TYPE_LABELS.sports, icon: TYPE_ICONS.sports },
  { value: 'life', label: TYPE_LABELS.life, icon: TYPE_ICONS.life },
];

const DIFFICULTIES: { value: TaskDifficulty; label: string }[] = [
  { value: 'easy', label: DIFFICULTY_LABELS.easy },
  { value: 'medium', label: DIFFICULTY_LABELS.medium },
  { value: 'hard', label: DIFFICULTY_LABELS.hard },
];

export default function FilterPanel({ filters, onFiltersChange, isMobile = false }: FilterPanelProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleLocation = (location: TaskLocation) => {
    const newLocations = filters.locations.includes(location)
      ? filters.locations.filter(l => l !== location)
      : [...filters.locations, location];
    onFiltersChange({ ...filters, locations: newLocations });
  };

  const toggleDuration = (duration: TaskDuration) => {
    const newDurations = filters.durations.includes(duration)
      ? filters.durations.filter(d => d !== duration)
      : [...filters.durations, duration];
    onFiltersChange({ ...filters, durations: newDurations });
  };

  const toggleType = (type: TaskType) => {
    const newTypes = filters.types.includes(type)
      ? filters.types.filter(t => t !== type)
      : [...filters.types, type];
    onFiltersChange({ ...filters, types: newTypes });
  };

  const toggleDifficulty = (difficulty: TaskDifficulty) => {
    const newDifficulties = filters.difficulties.includes(difficulty)
      ? filters.difficulties.filter(d => d !== difficulty)
      : [...filters.difficulties, difficulty];
    onFiltersChange({ ...filters, difficulties: newDifficulties });
  };

  const clearFilters = () => {
    onFiltersChange({
      locations: [],
      durations: [],
      types: [],
      difficulties: [],
    });
  };

  const hasActiveFilters = filters.locations.length > 0 || 
    filters.durations.length > 0 || 
    filters.types.length > 0 || 
    filters.difficulties.length > 0;

  if (isMobile) {
    return (
      <div className="mb-4 p-4 bg-white rounded-xl shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-gray-800">筛选条件</h3>
          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600"
            >
              <X size={14} />
              清除
            </button>
          )}
        </div>
        <div className="space-y-4">
          <FilterSection
            title="📍 地点"
            items={LOCATIONS}
            selected={filters.locations}
            onToggle={toggleLocation}
          />
          <FilterSection
            title="⏱️ 时间"
            items={DURATIONS}
            selected={filters.durations}
            onToggle={toggleDuration}
          />
          <FilterSection
            title="📚 类型"
            items={TYPES}
            selected={filters.types}
            onToggle={toggleType}
          />
          <FilterSection
            title="⭐ 难度"
            items={DIFFICULTIES}
            selected={filters.difficulties}
            onToggle={toggleDifficulty}
          />
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm p-5 h-fit sticky top-20">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-gray-800">筛选条件</h3>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1 text-sm text-gray-500 hover:text-primary-600"
          >
            <X size={14} />
            清除
          </button>
        )}
      </div>

      <div className="space-y-5">
        <FilterSection
          title="📍 地点"
          items={LOCATIONS}
          selected={filters.locations}
          onToggle={toggleLocation}
        />
        <FilterSection
          title="⏱️ 时间"
          items={DURATIONS}
          selected={filters.durations}
          onToggle={toggleDuration}
        />
        <FilterSection
          title="📚 类型"
          items={TYPES}
          selected={filters.types}
          onToggle={toggleType}
        />
        <FilterSection
          title="⭐ 难度"
          items={DIFFICULTIES}
          selected={filters.difficulties}
          onToggle={toggleDifficulty}
        />
      </div>
    </div>
  );
}

interface FilterSectionProps<T> {
  title: string;
  items: { value: T; label: string; icon?: string }[];
  selected: T[];
  onToggle: (value: T) => void;
}

function FilterSection<T>({ title, items, selected, onToggle }: FilterSectionProps<T>) {
  return (
    <div>
      <h4 className="text-sm font-medium text-gray-600 mb-2">{title}</h4>
      <div className="flex flex-wrap gap-2">
        {items.map((item) => (
          <button
            key={String(item.value)}
            onClick={() => onToggle(item.value)}
            className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-lg text-sm transition-all duration-200 ${
              selected.includes(item.value)
                ? 'bg-primary-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
            }`}
          >
            {item.icon && <span>{item.icon}</span>}
            <span>{item.label}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
