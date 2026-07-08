import { useState, useEffect } from 'react';
import { Shuffle, CheckCircle, RotateCcw } from 'lucide-react';
import { getRandomTask, mockTasks } from '@/data/tasks';
import { Task, TYPE_LABELS, TYPE_ICONS, TYPE_COLORS, LOCATION_LABELS, DURATION_LABELS, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types';

export default function Random() {
  const [currentTask, setCurrentTask] = useState<Task | null>(null);
  const [completedTasks, setCompletedTasks] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCompleteAnimation, setShowCompleteAnimation] = useState(false);

  useEffect(() => {
    const savedCompleted = localStorage.getItem('completedTasks');
    if (savedCompleted) {
      setCompletedTasks(JSON.parse(savedCompleted));
    }
    getNewTask();
  }, []);

  const getNewTask = () => {
    setIsLoading(true);
    setTimeout(() => {
      const task = getRandomTask(completedTasks);
      setCurrentTask(task);
      setIsLoading(false);
    }, 500);
  };

  const handleComplete = () => {
    if (!currentTask) return;
    
    setShowCompleteAnimation(true);
    setTimeout(() => {
      const newCompleted = [...completedTasks, currentTask.id];
      setCompletedTasks(newCompleted);
      localStorage.setItem('completedTasks', JSON.stringify(newCompleted));
      setShowCompleteAnimation(false);
      getNewTask();
    }, 1000);
  };

  const handleSkip = () => {
    getNewTask();
  };

  const getCompletedTaskDetails = (id: string) => {
    return mockTasks.find(t => t.id === id);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50 pt-20">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-bold text-gray-900">🎲 随机任务</h1>
          <p className="text-gray-500 mt-1">让命运决定你的下一个挑战</p>
        </div>

        <div className="relative">
          <div className="absolute -top-10 -left-10 w-32 h-32 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />
          <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30" />

          <div className="bg-white rounded-3xl shadow-xl p-8 sm:p-10 relative z-10">
            {isLoading ? (
              <div className="flex flex-col items-center justify-center py-16">
                <div className="w-16 h-16 border-4 border-primary-200 border-t-primary-500 rounded-full animate-spin mb-4" />
                <p className="text-gray-500">正在寻找有趣的任务...</p>
              </div>
            ) : currentTask ? (
              <div className={`transition-all duration-500 ${showCompleteAnimation ? 'scale-105 opacity-50' : ''}`}>
                <div className="flex items-center justify-between mb-6">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${TYPE_COLORS[currentTask.type]}`}>
                    <span className="text-lg">{TYPE_ICONS[currentTask.type]}</span>
                    <span>{TYPE_LABELS[currentTask.type]}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${DIFFICULTY_COLORS[currentTask.difficulty]}`} />
                    <span className="text-sm text-gray-500">{DIFFICULTY_LABELS[currentTask.difficulty]}</span>
                  </div>
                </div>

                <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4 text-center">
                  {currentTask.title}
                </h2>

                <p className="text-gray-600 text-center mb-8 leading-relaxed">
                  {currentTask.description}
                </p>

                <div className="flex flex-wrap justify-center gap-3 mb-8">
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                    <span>🏠</span>
                    <span>{LOCATION_LABELS[currentTask.location]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                    <span>⏱️</span>
                    <span>{DURATION_LABELS[currentTask.duration]}</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                    <span>👍</span>
                    <span>{currentTask.likes} 人点赞</span>
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                    <span>✅</span>
                    <span>{currentTask.completed} 人完成</span>
                  </span>
                </div>

                <div className="flex gap-4">
                  <button
                    onClick={handleSkip}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-gray-100 text-gray-700 rounded-2xl font-bold text-lg hover:bg-gray-200 transition-all duration-300"
                  >
                    <RotateCcw size={20} />
                    换一个
                  </button>
                  <button
                    onClick={handleComplete}
                    className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                  >
                    <CheckCircle size={20} />
                    我完成了！
                  </button>
                </div>
              </div>
            ) : null}
          </div>

          <div className="absolute -top-4 -right-4 animate-bounce-slow">
            <span className="text-4xl">✨</span>
          </div>
          <div className="absolute -bottom-4 -left-4 animate-bounce-slow" style={{ animationDelay: '0.5s' }}>
            <span className="text-4xl">🌟</span>
          </div>
        </div>

        {completedTasks.length > 0 && (
          <div className="mt-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-gray-900">✅ 已完成的任务</h3>
              <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-medium">
                {completedTasks.length} 个
              </span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {completedTasks.map((taskId, index) => {
                const task = getCompletedTaskDetails(taskId);
                if (!task) return null;
                return (
                  <div
                    key={taskId}
                    className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-sm"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <div className={`w-10 h-10 rounded-full ${TYPE_COLORS[task.type]} flex items-center justify-center text-lg flex-shrink-0`}>
                      {TYPE_ICONS[task.type]}
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium text-gray-800">{task.title}</h4>
                      <p className="text-sm text-gray-500">{TYPE_LABELS[task.type]} · {LOCATION_LABELS[task.location]}</p>
                    </div>
                    <CheckCircle className="text-green-500" size={20} />
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {completedTasks.length === 0 && (
          <div className="mt-12 text-center">
            <div className="text-4xl mb-4">🎯</div>
            <p className="text-gray-500">完成任务后会在这里显示哦</p>
          </div>
        )}

        {completedTasks.length === mockTasks.length && (
          <div className="mt-12 bg-gradient-to-r from-yellow-100 to-orange-100 rounded-2xl p-6 text-center">
            <div className="text-5xl mb-4">🏆</div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">恭喜！你完成了所有任务！</h3>
            <p className="text-gray-600">你真是太棒了，挑战达人！</p>
          </div>
        )}
      </div>
    </div>
  );
}
