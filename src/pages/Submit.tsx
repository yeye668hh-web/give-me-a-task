import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Send, CheckCircle } from 'lucide-react';
import { TaskType, TaskLocation, TaskDuration, TaskDifficulty, TYPE_LABELS, TYPE_ICONS, LOCATION_LABELS, DURATION_LABELS, DIFFICULTY_LABELS } from '@/types';

export default function Submit() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '' as TaskType | '',
    location: '' as TaskLocation | '',
    duration: '' as TaskDuration | '',
    difficulty: '' as TaskDifficulty | '',
    author: '',
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title || !formData.description || !formData.type || !formData.location || !formData.duration || !formData.difficulty || !formData.author) {
      alert('请填写所有必填项');
      return;
    }
    
    setIsSubmitted(true);
    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 pt-20 flex items-center justify-center">
        <div className="text-center">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="text-green-500" size={40} />
          </div>
          <h3 className="text-2xl font-bold text-gray-900 mb-2">提交成功！</h3>
          <p className="text-gray-600">你的创意任务正在等待审核...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pt-20">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-gray-500 hover:text-gray-700 mb-6"
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          返回首页
        </Link>

        <div className="bg-white rounded-3xl shadow-xl p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">✍️ 提交任务</h1>
          <p className="text-gray-500 mb-8">分享你的创意任务，让更多人参与挑战</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">任务标题 *</label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                placeholder="例如：学10个新单词"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">任务描述 *</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="详细描述你的任务，包括完成步骤、注意事项等..."
                rows={4}
                className="w-full px-4 py-3 border border-gray-200 rounded-xl resize-none focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">任务类型 *</label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">请选择类型</option>
                  {(Object.keys(TYPE_LABELS) as TaskType[]).map((type) => (
                    <option key={type} value={type}>
                      {TYPE_ICONS[type]} {TYPE_LABELS[type]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">地点 *</label>
                <select
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">请选择地点</option>
                  {(Object.keys(LOCATION_LABELS) as TaskLocation[]).map((location) => (
                    <option key={location} value={location}>
                      {LOCATION_LABELS[location]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">时间 *</label>
                <select
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">请选择时间</option>
                  {(Object.keys(DURATION_LABELS) as TaskDuration[]).map((duration) => (
                    <option key={duration} value={duration}>
                      {DURATION_LABELS[duration]}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">难度 *</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">请选择难度</option>
                  {(Object.keys(DIFFICULTY_LABELS) as TaskDifficulty[]).map((difficulty) => (
                    <option key={difficulty} value={difficulty}>
                      {DIFFICULTY_LABELS[difficulty]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">你的昵称 *</label>
              <input
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                placeholder="输入你的昵称"
                className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-primary-500 text-white rounded-2xl font-bold text-lg hover:bg-primary-600 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Send size={20} />
              提交任务
            </button>
          </form>

          <div className="mt-8 p-4 bg-gray-50 rounded-xl">
            <h3 className="font-medium text-gray-700 mb-2">📝 提交须知</h3>
            <ul className="text-sm text-gray-500 space-y-1">
              <li>• 任务内容需积极健康，符合法律法规</li>
              <li>• 任务描述清晰易懂，让其他用户知道如何完成</li>
              <li>• 提交后需要等待审核，审核通过后会展示在平台上</li>
              <li>• 请勿提交重复或相似的任务</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
