/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Section } from '../../../types/course';

interface CreateSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (sectionData: Partial<Section>) => void;
  editingSection?: Section | null;
}

export const CreateSectionModal: React.FC<CreateSectionModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  editingSection
}) => {
  const [formData, setFormData] = useState(() => ({
    title: editingSection?.title || ''
  }));

  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form data when editingSection changes
  React.useEffect(() => {
    if (isOpen) {
      setFormData({
        title: editingSection?.title || ''
      });
      setErrors({});
    }
  }, [editingSection, isOpen]);

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.title.trim()) newErrors.title = 'Section title is required';
    if (formData.title.length < 3) newErrors.title = 'Title must be at least 3 characters';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) return;

    const sectionData: Partial<Section> = {
      title: formData.title.trim()
    };

    onSubmit(sectionData);
  };

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl max-w-md w-full">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gray-900">
              {editingSection ? 'Edit Section' : 'Create New Section'}
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
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Section Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className={`input-field ${errors.title ? 'border-red-500' : ''}`}
              placeholder="Enter section title"
              autoFocus
            />
            {errors.title && <p className="text-red-600 text-sm mt-1">{errors.title}</p>}
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-gray-200">
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
              {editingSection ? 'Update Section' : 'Create Section'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};