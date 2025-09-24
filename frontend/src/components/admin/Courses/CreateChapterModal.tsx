/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Chapter } from '../../../types/course';

interface CreateChapterModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (chapterData: Partial<Chapter>) => void;
  editingChapter?: Chapter | null;
}

export const CreateChapterModal: React.FC<CreateChapterModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingChapter
}) => {
  const [formData, setFormData] = useState(() => ({
    title: editingChapter?.title || '',
    description: editingChapter?.description || '',
    duration: editingChapter?.duration || '00:00:00',
    resources: editingChapter?.ressources?.map(r => ({ title: r.title, url: r.url })) || [{ title: '', url: '' }],
    lifetimePrice: editingChapter?.pricing?.lifetime || '',
    monthlyPrice: editingChapter?.pricing?.[1] || '',
    quarterlyPrice: editingChapter?.pricing?.[3] || '',
    yearlyPrice: editingChapter?.pricing?.[10] || ''
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form data when editingChapter changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: editingChapter?.title || '',
        description: editingChapter?.description || '',
        duration: editingChapter?.duration || '00:00:00',
        resources: editingChapter?.ressources?.map(r => ({ title: r.title, url: r.url })) || [{ title: '', url: '' }],
        lifetimePrice: editingChapter?.pricing?.lifetime || '',
        monthlyPrice: editingChapter?.pricing?.[1] || '',
        quarterlyPrice: editingChapter?.pricing?.[3] || '',
        yearlyPrice: editingChapter?.pricing?.[10] || ''
      });
      setErrors({});
    }
  }, [editingChapter, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Chapter title is required';
    if (formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters';

    // Validate resources
    formData.resources.forEach((resource, index) => {
      if (resource.title && !resource.url) {
        newErrors[`resource_url_${index}`] = 'URL is required when title is provided';
      }
      if (resource.url && !resource.title) {
        newErrors[`resource_title_${index}`] = 'Title is required when URL is provided';
      }
    });

    // Validate pricing if provided
    if (formData.lifetimePrice && Number(formData.lifetimePrice) <= 0) {
      newErrors.lifetimePrice = 'Lifetime price must be greater than 0';
    }
    if (formData.monthlyPrice && Number(formData.monthlyPrice) <= 0) {
      newErrors.monthlyPrice = 'Monthly price must be greater than 0';
    }
    if (formData.quarterlyPrice && Number(formData.quarterlyPrice) <= 0) {
      newErrors.quarterlyPrice = 'Quarterly price must be greater than 0';
    }
    if (formData.yearlyPrice && Number(formData.yearlyPrice) <= 0) {
      newErrors.yearlyPrice = 'Yearly price must be greater than 0';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const chapterData: Partial<Chapter> = {
      title: formData.title.trim(),
      description: formData.description.trim() || undefined,
      duration: formData.duration,
      ressources: formData.resources
        .filter(r => r.title.trim() && r.url.trim())
        .map(r => ({
          _id: Math.random().toString(36).substr(2, 9),
          title: r.title.trim(),
          url: r.url.trim()
        })),
      ...(formData.lifetimePrice || formData.monthlyPrice || formData.quarterlyPrice || formData.yearlyPrice) && {
        pricing: {
          ...(formData.lifetimePrice && { lifetime: Number(formData.lifetimePrice) }),
          ...(formData.monthlyPrice && { 1: Number(formData.monthlyPrice) }),
          ...(formData.quarterlyPrice && { 3: Number(formData.quarterlyPrice) }),
          ...(formData.yearlyPrice && { 10: Number(formData.yearlyPrice) })
        }
      }
    };

    onSubmit(chapterData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const addResource = () => {
    setFormData(prev => ({
      ...prev,
      resources: [...prev.resources, { title: '', url: '' }]
    }));
  };

  const removeResource = (index: number) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.filter((_, i) => i !== index)
    }));
  };

  const updateResource = (index: number, field: 'title' | 'url', value: string) => {
    setFormData(prev => ({
      ...prev,
      resources: prev.resources.map((resource, i) => 
        i === index ? { ...resource, [field]: value } : resource
      )
    }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-3xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingChapter ? 'Edit Chapter' : 'Create New Chapter'}
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
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Chapter Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter chapter title"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Enter chapter description (optional)"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Duration (HH:MM:SS)
              </label>
              <input
                type="text"
                value={formData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="input-field"
                placeholder="00:00:00"
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
              />
            </div>
          </div>

          {/* Resources */}
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-semibold text-gray-900">Resources</h3>
              <button
                type="button"
                onClick={addResource}
                className="btn-secondary text-sm"
              >
                Add Resource
              </button>
            </div>
            <div className="space-y-3">
              {formData.resources.map((resource, index) => (
                <div key={index} className="grid grid-cols-1 md:grid-cols-2 gap-3 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Resource Title
                    </label>
                    <input
                      type="text"
                      value={resource.title}
                      onChange={(e) => updateResource(index, 'title', e.target.value)}
                      className={`input-field ${errors[`resource_title_${index}`] ? 'border-red-500' : ''}`}
                      placeholder="e.g., Course Materials"
                    />
                    {errors[`resource_title_${index}`] && (
                      <p className="text-red-600 text-sm mt-1">{errors[`resource_title_${index}`]}</p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <div className="flex-1">
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Resource URL
                      </label>
                      <input
                        type="url"
                        value={resource.url}
                        onChange={(e) => updateResource(index, 'url', e.target.value)}
                        className={`input-field ${errors[`resource_url_${index}`] ? 'border-red-500' : ''}`}
                        placeholder="https://example.com/resource"
                      />
                      {errors[`resource_url_${index}`] && (
                        <p className="text-red-600 text-sm mt-1">{errors[`resource_url_${index}`]}</p>
                      )}
                    </div>
                    {formData.resources.length > 1 && (
                      <button
                        type="button"
                        onClick={() => removeResource(index)}
                        className="mt-6 p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Chapter-specific Pricing (Optional) */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Chapter Pricing (Optional)</h3>
            <p className="text-sm text-gray-600 mb-4">Set specific pricing for this chapter if different from course pricing</p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lifetime Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.lifetimePrice}
                  onChange={(e) => handleInputChange('lifetimePrice', e.target.value)}
                  className={`input-field ${errors.lifetimePrice ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="99.99"
                />
                {errors.lifetimePrice && <p className="text-red-600 text-sm mt-1">{errors.lifetimePrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.monthlyPrice}
                  onChange={(e) => handleInputChange('monthlyPrice', e.target.value)}
                  className={`input-field ${errors.monthlyPrice ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="9.99"
                />
                {errors.monthlyPrice && <p className="text-red-600 text-sm mt-1">{errors.monthlyPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Quarterly Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.quarterlyPrice}
                  onChange={(e) => handleInputChange('quarterlyPrice', e.target.value)}
                  className={`input-field ${errors.quarterlyPrice ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="24.99"
                />
                {errors.quarterlyPrice && <p className="text-red-600 text-sm mt-1">{errors.quarterlyPrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Yearly Price ($)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.yearlyPrice}
                  onChange={(e) => handleInputChange('yearlyPrice', e.target.value)}
                  className={`input-field ${errors.yearlyPrice ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="79.99"
                />
                {errors.yearlyPrice && <p className="text-red-600 text-sm mt-1">{errors.yearlyPrice}</p>}
              </div>
            </div>
          </div>

          {/* Actions */}
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
              {editingChapter ? 'Update Chapter' : 'Create Chapter'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};