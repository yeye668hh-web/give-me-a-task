import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, CheckCircle, Share2, Clock, MapPin, User, Calendar } from 'lucide-react';
import { getTaskById } from '@/data/tasks';
import { TYPE_LABELS, TYPE_ICONS, TYPE_COLORS, LOCATION_LABELS, DURATION_LABELS, DIFFICULTY_LABELS, DIFFICULTY_COLORS } from '@/types';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [isFavorite, setIsFavorite] = useState(false);
  const [likesCount, setLikesCount] = useState(0);

  const task = getTaskById(id || '');

  useEffect(() => {
    if (task) {
      setLikesCount(task.likes);
    }
  }, [task]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikesCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleFavorite = () => {
    setIsFavorite(!isFavorite);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: task?.title,
        text: task?.description,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('链接已复制到剪贴板');
    }
  };

  if (!task) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h3 className="text-xl font-medium text-gray-700 mb-2">任务不存在</h3>
          <Link to="/" className="text-primary-600 font-medium">返回首页</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/browse"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回分类浏览
        </Link>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-primary-400 to-primary-500 p-8 text-white">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center text-2xl">
                {TYPE_ICONS[task.type]}
              </div>
              <div>
                <span className="inline-block px-3 py-1 bg-white/20 rounded-full text-sm mb-2">
                  {TYPE_LABELS[task.type]}
                </span>
                <h1 className="text-2xl font-bold">{task.title}</h1>
              </div>
            </div>
          </div>

          <div className="p-8">
            <div className="flex flex-wrap gap-3 mb-6">
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                <MapPin size={16} />
                {LOCATION_LABELS[task.location]}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                <Clock size={16} />
                {DURATION_LABELS[task.duration]}
              </span>
              <span className="inline-flex items-center gap-1.5 px-4 py-2 bg-gray-100 text-gray-700 rounded-xl">
                <span className={`w-2 h-2 rounded-full ${DIFFICULTY_COLORS[task.difficulty]}`} />
                {DIFFICULTY_LABELS[task.difficulty]}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-lg font-bold text-gray-900 mb-3">任务描述</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {task.description}
              </p>
            </div>

            <div className="flex items-center gap-6 py-4 border-y border-gray-100 mb-8">
              <div className="flex items-center gap-2">
                <Heart size={20} className={isLiked ? 'text-red-500' : 'text-gray-400'} />
                <span className="font-medium text-gray-700">{likesCount}</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle size={20} className="text-green-500" />
                <span className="font-medium text-gray-700">{task.completed} 人完成</span>
              </div>
            </div>

            <div className="flex items-center gap-4 p-4 bg-gray-50 rounded-xl mb-8">
              <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center">
                <User className="text-primary-600" size={24} />
              </div>
              <div className="flex-1">
                <p className="font-medium text-gray-900">{task.author}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {task.createdAt}
                  </span>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleLike}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isLiked 
                    ? 'bg-red-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <Heart size={20} fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? '已点赞' : '点赞'}
              </button>
              <button
                onClick={handleFavorite}
                className={`flex-1 flex items-center justify-center gap-2 px-6 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                  isFavorite 
                    ? 'bg-purple-500 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                <svg className="w-5 h-5" fill={isFavorite ? 'currentColor' : 'none'} stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                {isFavorite ? '已收藏' : '收藏'}
              </button>
              <button
                onClick={handleShare}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 transition-all duration-300"
              >
                <Share2 size={20} />
                分享
              </button>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <h3 className="text-lg font-bold text-gray-900 mb-4">💬 评论</h3>
          <div className="bg-white rounded-2xl shadow-sm p-6">
            <div className="flex gap-4 mb-6">
              <div className="w-10 h-10 bg-gray-200 rounded-full flex-shrink-0" />
              <div className="flex-1">
                <textarea
                  placeholder="写下你的评论..."
                  className="w-full p-4 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
                  rows={3}
                />
                <button className="mt-3 ml-auto flex items-center justify-center px-6 py-2 bg-primary-500 text-white rounded-xl font-medium hover:bg-primary-600 transition-colors">
                  发表评论
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-primary-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <User className="text-primary-600" size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">用户A</span>
                    <span className="text-sm text-gray-500">2小时前</span>
                  </div>
                  <p className="text-gray-600">这个任务很有趣，我已经完成了！感觉收获很大 😊</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                      <Heart size={16} />
                      点赞
                    </button>
                    <button className="text-sm text-gray-500 hover:text-primary-600">
                      回复
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="w-10 h-10 bg-secondary-100 rounded-full flex-shrink-0 flex items-center justify-center">
                  <User className="text-secondary-600" size={18} />
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-medium text-gray-900">用户B</span>
                    <span className="text-sm text-gray-500">5小时前</span>
                  </div>
                  <p className="text-gray-600">期待更多这样的任务！👍</p>
                  <div className="flex items-center gap-4 mt-2">
                    <button className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-500">
                      <Heart size={16} />
                      点赞
                    </button>
                    <button className="text-sm text-gray-500 hover:text-primary-600">
                      回复
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
