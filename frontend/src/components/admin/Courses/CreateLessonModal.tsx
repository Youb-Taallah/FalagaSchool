/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { X, Play, Eye, EyeOff } from 'lucide-react';
import { VideoLesson } from '../../../types/course';

interface CreateLessonModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (lessonData: Partial<VideoLesson>) => void;
  editingLesson?: VideoLesson | null;
}

export const CreateLessonModal: React.FC<CreateLessonModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingLesson
}) => {
  const [formData, setFormData] = useState(() => ({
    title: editingLesson?.title || '',
    description: editingLesson?.description || '',
    duration: editingLesson?.duration || '00:00',
    videoUrl: editingLesson?.videoUrl || '',
    preview: editingLesson?.preview || false
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form data when editingLesson changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: editingLesson?.title || '',
        description: editingLesson?.description || '',
        duration: editingLesson?.duration || '00:00',
        videoUrl: editingLesson?.videoUrl || '',
        preview: editingLesson?.preview || false
      });
      setErrors({});
    }
  }, [editingLesson, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Lesson title is required';
    if (formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters';
    
    if (!formData.duration.trim()) newErrors.duration = 'Duration is required';
    if (!/^\d{1,2}:\d{2}$/.test(formData.duration)) {
      newErrors.duration = 'Duration must be in MM:SS format (e.g., 15:30)';
    }

    if (formData.videoUrl && !isValidUrl(formData.videoUrl)) {
      newErrors.videoUrl = 'Please enter a valid URL';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const isValidUrl = (string: string) => {
    try {
      new URL(string);
      return true;
    } catch (_) {
      return false;
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const lessonData: Partial<VideoLesson> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      duration: formData.duration,
      videoUrl: formData.videoUrl.trim() || undefined,
      preview: formData.preview
    };

    onSubmit(lessonData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingLesson ? 'Edit Video Lesson' : 'Create New Video Lesson'}
            </h2>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Lesson Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter lesson title"
                autoFocus
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Enter lesson description (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (MM:SS) *
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className={`input-field ${errors.duration ? 'border-red-500' : ''}`}
                placeholder="15:30"
                pattern="[0-9]{1,2}:[0-9]{2}"
              />
              {errors.duration && <p className="text-red-600 text-sm mt-1">{errors.duration}</p>}
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                <Play className="w-4 h-4" />
                Preview Lesson
              </label>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleInputChange('preview', !formData.preview)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
                    formData.preview 
                      ? 'bg-green-50 border-green-200 text-green-700' 
                      : 'bg-gray-50 border-gray-200 text-gray-600'
                  }`}
                >
                  {formData.preview ? (
                    <>
                      <Eye className="w-4 h-4" />
                      Preview Enabled
                    </>
                  ) : (
                    <>
                      <EyeOff className="w-4 h-4" />
                      Preview Disabled
                    </>
                  )}
                </button>
              </div>
              <p className="text-xs text-gray-500 mt-1">
                Preview lessons can be watched by non-enrolled students
              </p>
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Video URL
              </label>
              <input
                type="url"
                value={formData.videoUrl}
                onChange={(e) => handleInputChange('videoUrl', e.target.value)}
                className={`input-field ${errors.videoUrl ? 'border-red-500' : ''}`}
                placeholder="https://example.com/video.mp4"
              />
              {errors.videoUrl && <p className="text-red-600 text-sm mt-1">{errors.videoUrl}</p>}
              <p className="text-xs text-gray-500 mt-1">
                Optional: Add video URL after lesson creation
              </p>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="btn-secondary"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn-primary"
            >
              {editingLesson ? 'Update Lesson' : 'Create Lesson'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};