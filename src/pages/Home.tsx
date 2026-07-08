import { Link } from 'react-router-dom';
import { Shuffle, Compass, Sparkles } from 'lucide-react';
import TaskCard from '@/components/TaskCard';
import { getHotTasks } from '@/data/tasks';

export default function Home() {
  const hotTasks = getHotTasks();

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-secondary-50">
      <section className="relative pt-24 pb-16 px-4 overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-secondary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse-slow" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-primary-100 rounded-full mix-blend-multiply filter blur-2xl opacity-20" />
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm rounded-full shadow-sm mb-6 animate-float">
            <Sparkles className="text-yellow-500" size={18} />
            <span className="text-sm font-medium text-gray-700">抖音热梗同款任务平台</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            🤪 给我个任务
            <span className="block text-primary-500 mt-2">开启你的随机挑战之旅</span>
          </h1>

          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto leading-relaxed">
            视频刷刷刷的你，是否会觉得人生些许空虚？空有手机在手，却萎靡不振！
            <br />
            那么，请速速加入「给我个任务」！打破日常单调，发现有趣的新事物。
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              to="/random"
              className="group w-full sm:w-auto px-8 py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-1 flex items-center justify-center gap-2"
            >
              <Shuffle className="animate-spin-slow" size={24} />
              <span>🎲 随机任务</span>
            </Link>
            <Link
              to="/browse"
              className="group w-full sm:w-auto px-8 py-4 bg-white text-gray-800 rounded-2xl font-bold text-lg hover:bg-gray-50 transition-all duration-300 shadow-md hover:shadow-lg hover:-translate-y-1 flex items-center justify-center gap-2 border"
            >
              <Compass size={24} />
              <span>📋 分类浏览</span>
            </Link>
          </div>

          <div className="mt-12 flex items-center justify-center gap-8 text-sm text-gray-500">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>24+ 创意任务</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-pulse" />
              <span>1000+ 完成挑战</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse" />
              <span>持续更新中</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">🔥 热门任务</h2>
              <p className="text-gray-500 mt-1">大家都在挑战的有趣任务</p>
            </div>
            <Link
              to="/browse"
              className="text-primary-600 font-medium hover:text-primary-700 flex items-center gap-1"
            >
              查看更多
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {hotTasks.map((task) => (
              <TaskCard key={task.id} task={task} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-12 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">为什么选择我们？</h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 mt-8">
            <div className="p-6 bg-primary-50 rounded-2xl">
              <div className="text-4xl mb-4">🎯</div>
              <h3 className="font-bold text-gray-800 mb-2">丰富多样</h3>
              <p className="text-gray-600 text-sm">涵盖学习、放松、创意、挑战等8大类别，总有适合你的任务</p>
            </div>
            <div className="p-6 bg-secondary-50 rounded-2xl">
              <div className="text-4xl mb-4">✨</div>
              <h3 className="font-bold text-gray-800 mb-2">轻松有趣</h3>
              <p className="text-gray-600 text-sm">任务简单易上手，随时随地都能开始挑战，享受完成的成就感</p>
            </div>
            <div className="p-6 bg-purple-50 rounded-2xl">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="font-bold text-gray-800 mb-2">社区互动</h3>
              <p className="text-gray-600 text-sm">提交你的创意任务，与其他用户分享，一起发现更多有趣的事</p>
            </div>
          </div>
        </div>
      </section>

      <footer className="py-8 px-4 bg-gray-50 border-t">
        <div className="max-w-7xl mx-auto text-center text-gray-500 text-sm">
          <p>🎯 给我个任务 - 抖音热梗同款任务平台</p>
          <p className="mt-2">打破日常单调，发现有趣的新事物</p>
        </div>
      </footer>
    </div>
  );
}
