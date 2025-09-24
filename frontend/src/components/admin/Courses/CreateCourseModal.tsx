/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X, Upload } from 'lucide-react';
import { Course } from '../../../types/course';

interface CreateCourseModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (courseData: Partial<Course>) => void;
  editingCourse?: Course | null;
}

export const CreateCourseModal: React.FC<CreateCourseModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingCourse
}) => {
  const [formData, setFormData] = useState(() => ({
    title: editingCourse?.title || '',
    description: editingCourse?.description || '',
    thumbnail: editingCourse?.thumbnail || '',
    level: editingCourse?.level || 'Beginner' as const,
    duration: editingCourse?.duration || '00:00:00',
    totalLessons: editingCourse?.totalLessons || 0,
    tags: editingCourse?.tags?.join(', ') || '',
    requirements: editingCourse?.requirements?.join('\n') || '',
    whatYouWillLearn: editingCourse?.whatYouWillLearn?.join('\n') || '',
    lifetimePrice: editingCourse?.pricing?.lifetime || 99.99,
    monthlyPrice: editingCourse?.pricing?.[1] || '',
    quarterlyPrice: editingCourse?.pricing?.[3] || '',
    yearlyPrice: editingCourse?.pricing?.[10] || '',
    originalPrice: editingCourse?.originalPrice || '',
    sale: editingCourse?.sale || false,
    bestseller: editingCourse?.bestseller || false,
    discount: editingCourse?.discount || '',
    arabicLanguage: editingCourse?.arabicLanguage || false
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form data when editingCourse changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: editingCourse?.title || '',
        description: editingCourse?.description || '',
        thumbnail: editingCourse?.thumbnail || '',
        level: editingCourse?.level || 'Beginner' as const,
        duration: editingCourse?.duration || '00:00:00',
        totalLessons: editingCourse?.totalLessons || 0,
        tags: editingCourse?.tags?.join(', ') || '',
        requirements: editingCourse?.requirements?.join('\n') || '',
        whatYouWillLearn: editingCourse?.whatYouWillLearn?.join('\n') || '',
        lifetimePrice: editingCourse?.pricing?.lifetime || 99.99,
        monthlyPrice: editingCourse?.pricing?.[1] || '',
        quarterlyPrice: editingCourse?.pricing?.[3] || '',
        yearlyPrice: editingCourse?.pricing?.[10] || '',
        originalPrice: editingCourse?.originalPrice || '',
        sale: editingCourse?.sale || false,
        bestseller: editingCourse?.bestseller || false,
        discount: editingCourse?.discount || '',
        arabicLanguage: editingCourse?.arabicLanguage || false
      });
      setErrors({});
    }
  }, [editingCourse, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (formData.description.length < 10) newErrors.description = 'Description must be at least 10 characters';
    if (!formData.thumbnail.trim()) newErrors.thumbnail = 'Thumbnail URL is required';
    if (formData.lifetimePrice <= 0) newErrors.lifetimePrice = 'Lifetime price must be greater than 0';
    if (formData.totalLessons < 0) newErrors.totalLessons = 'Total lessons cannot be negative';

    // Validate pricing consistency
    if (formData.monthlyPrice && Number(formData.monthlyPrice) <= 0) {
      newErrors.monthlyPrice = 'Monthly price must be greater than 0';
    }
    if (formData.quarterlyPrice && Number(formData.quarterlyPrice) <= 0) {
      newErrors.quarterlyPrice = 'Quarterly price must be greater than 0';
    }
    if (formData.yearlyPrice && Number(formData.yearlyPrice) <= 0) {
      newErrors.yearlyPrice = 'Yearly price must be greater than 0';
    }

    if (formData.discount && (Number(formData.discount) < 0 || Number(formData.discount) > 100)) {
      newErrors.discount = 'Discount must be between 0 and 100';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const courseData: Partial<Course> = {
      title: formData.title.trim(),
      description: formData.description.trim(),
      thumbnail: formData.thumbnail.trim(),
      level: formData.level,
      duration: formData.duration,
      totalLessons: formData.totalLessons,
      tags: formData.tags.split(',').map(tag => tag.trim()).filter(Boolean),
      requirements: formData.requirements.split('\n').map(req => req.trim()).filter(Boolean),
      whatYouWillLearn: formData.whatYouWillLearn.split('\n').map(item => item.trim()).filter(Boolean),
      pricing: {
        lifetime: formData.lifetimePrice,
        ...(formData.monthlyPrice && { 1: Number(formData.monthlyPrice) }),
        ...(formData.quarterlyPrice && { 3: Number(formData.quarterlyPrice) }),
        ...(formData.yearlyPrice && { 10: Number(formData.yearlyPrice) })
      },
      ...(formData.originalPrice && { originalPrice: Number(formData.originalPrice) }),
      sale: formData.sale,
      bestseller: formData.bestseller,
      ...(formData.discount && { discount: Number(formData.discount) }),
      arabicLanguage: formData.arabicLanguage,
      isPublished: false // Always start as unpublished
    };

    onSubmit(courseData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingCourse ? 'Edit Course' : 'Create New Course'}
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
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Title *
              </label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                className={`input-field ${errors.title ? 'border-red-500' : ''}`}
                placeholder="Enter course title"
              />
              {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description *
              </label>
              <textarea
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                rows={4}
                className={`input-field resize-none ${errors.description ? 'border-red-500' : ''}`}
                placeholder="Enter course description"
              />
              {errors.description && <p className="text-red-600 text-sm mt-1">{errors.description}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Thumbnail URL *
              </label>
              <div className="relative">
                <input
                  type="url"
                  value={formData.thumbnail}
                  onChange={(e) => handleInputChange('thumbnail', e.target.value)}
                  className={`input-field ${errors.thumbnail ? 'border-red-500' : ''}`}
                  placeholder="https://example.com/image.jpg"
                />
                <Upload className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              </div>
              {errors.thumbnail && <p className="text-red-600 text-sm mt-1">{errors.thumbnail}</p>}
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Course Level *
              </label>
              <select
                value={formData.level}
                onChange={(e) => handleInputChange('level', e.target.value)}
                className="input-field"
              >
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Advanced">Advanced</option>
                <option value="All Levels">All Levels</option>
              </select>
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
                placeholder="24:30:00"
                pattern="[0-9]{2}:[0-9]{2}:[0-9]{2}"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Total Lessons
              </label>
              <input
                type="number"
                value={formData.totalLessons}
                onChange={(e) => handleInputChange('totalLessons', Number(e.target.value))}
                className={`input-field ${errors.totalLessons ? 'border-red-500' : ''}`}
                min="0"
                placeholder="0"
              />
              {errors.totalLessons && <p className="text-red-600 text-sm mt-1">{errors.totalLessons}</p>}
            </div>
          </div>

          {/* Tags and Learning Outcomes */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Tags (comma-separated)
              </label>
              <input
                type="text"
                value={formData.tags}
                onChange={(e) => handleInputChange('tags', e.target.value)}
                className="input-field"
                placeholder="React, JavaScript, Frontend"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Requirements (one per line)
              </label>
              <textarea
                value={formData.requirements}
                onChange={(e) => handleInputChange('requirements', e.target.value)}
                rows={3}
                className="input-field resize-none"
                placeholder="Basic JavaScript knowledge&#10;HTML & CSS fundamentals"
              />
            </div>

            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What You Will Learn (one per line)
              </label>
              <textarea
                value={formData.whatYouWillLearn}
                onChange={(e) => handleInputChange('whatYouWillLearn', e.target.value)}
                rows={4}
                className="input-field resize-none"
                placeholder="Build modern React applications&#10;Understand component lifecycle&#10;Master state management"
              />
            </div>
          </div>

          {/* Pricing */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Pricing</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Lifetime Price * (dt)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.lifetimePrice}
                  onChange={(e) => handleInputChange('lifetimePrice', Number(e.target.value))}
                  className={`input-field ${errors.lifetimePrice ? 'border-red-500' : ''}`}
                  min="0"
                  placeholder="99.99"
                />
                {errors.lifetimePrice && <p className="text-red-600 text-sm mt-1">{errors.lifetimePrice}</p>}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Monthly Price (dt)
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
                  Quarterly Price (dt)
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
                  Yearly Price (dt)
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

          {/* Additional Options */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Additional Options</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Original Price (dt) - for sale display
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={formData.originalPrice}
                  onChange={(e) => handleInputChange('originalPrice', e.target.value)}
                  className="input-field"
                  min="0"
                  placeholder="149.99"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Percentage (%)
                </label>
                <input
                  type="number"
                  value={formData.discount}
                  onChange={(e) => handleInputChange('discount', e.target.value)}
                  className={`input-field ${errors.discount ? 'border-red-500' : ''}`}
                  min="0"
                  max="100"
                  placeholder="25"
                />
                {errors.discount && <p className="text-red-600 text-sm mt-1">{errors.discount}</p>}
              </div>

              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-4">
                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.sale}
                      onChange={(e) => handleInputChange('sale', e.target.checked)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">On Sale</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.bestseller}
                      onChange={(e) => handleInputChange('bestseller', e.target.checked)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Bestseller</span>
                  </label>

                  <label className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={formData.arabicLanguage}
                      onChange={(e) => handleInputChange('arabicLanguage', e.target.checked)}
                      className="w-4 h-4 text-primary-600 focus:ring-primary-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">Arabic Language</span>
                  </label>
                </div>
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
              {editingCourse ? 'Update Course' : 'Create Course'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};