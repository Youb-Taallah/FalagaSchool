/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useAuth } from '@clerk/clerk-react';
import { CourseList } from '../../components/admin/Courses/CourseList';
import { CreateCourseModal } from '../../components/admin/Courses/CreateCourseModal';
import { CreateChapterModal } from '../../components/admin/Courses/CreateChapterModal';
import { CreateSectionModal } from '../../components/admin/Courses/CreateSectionModal';
import { CreateLessonModal } from '../../components/admin/Courses/CreateLessonModal';
import { CourseDetail } from '../../components/admin/Courses/CourseDetail';
import { Course, Chapter, Section, VideoLesson } from '../../types/course';
import {
  createCourse,
  updateCourse,
  getCourseById,
  publishCourse,
  unpublishCourse,
  createChapter,
  updateChapter,
  deleteChapter,
  createSection,
  updateSection,
  deleteSection,
  createVideoLesson,
  updateVideoLesson,
  deleteVideoLesson
} from '../../services/admin/courseService';

type AppView = 'list' | 'detail';

export const Courses: React.FC = () => {
  const { getToken } = useAuth();
  const [currentView, setCurrentView] = useState<AppView>('list');
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [loading, setLoading] = useState(false);

  // Chapter modal state
  const [isChapterModalOpen, setIsChapterModalOpen] = useState(false);
  const [editingChapter, setEditingChapter] = useState<Chapter | null>(null);
  const [currentChapterCourseId, setCurrentChapterCourseId] = useState<string>('');

  // Section modal state
  const [isSectionModalOpen, setIsSectionModalOpen] = useState(false);
  const [editingSection, setEditingSection] = useState<Section | null>(null);
  const [currentSectionChapterId, setCurrentSectionChapterId] = useState<string>('');
  const [currentSectionCourseId, setCurrentSectionCourseId] = useState<string>('');

  // Lesson modal state
  const [isLessonModalOpen, setIsLessonModalOpen] = useState(false);
  const [editingLesson, setEditingLesson] = useState<VideoLesson | null>(null);
  const [currentLessonSectionId, setCurrentLessonSectionId] = useState<string>('');
  const [currentLessonChapterId, setCurrentLessonChapterId] = useState<string>('');
  const [currentLessonCourseId, setCurrentLessonCourseId] = useState<string>('');

  // Helper function to refresh course data
  const refreshCourseData = async (courseId: string) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await getCourseById(token, courseId);
      if (response.success && response.course) {
        setSelectedCourse(response.course);
      }
    } catch (error) {
      console.error('Error refreshing course data:', error);
    }
  };

  // Course Management
  const handleCreateCourse = () => {
    setEditingCourse(null);
    setIsCreateModalOpen(true);
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse(course);
    setIsCreateModalOpen(true);
  };

  const handleViewCourse = async (course: Course) => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      // Fetch full course details including chapters/sections/lessons
      const response = await getCourseById(token, course._id);
      if (response.success && response.course) {
        setSelectedCourse(response.course);
        setCurrentView('detail');
      }
    } catch (error) {
      console.error('Error fetching course details:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteCourse = (courseId: string) => {
    // This is handled in CourseList component
    console.log('Course deleted:', courseId);
  };

  const handleSubmitCourse = async (courseData: Partial<Course>) => {
    try {
      setLoading(true);
      const token = await getToken();
      if (!token) return;

      let response;
      if (editingCourse) {
        // Update existing course
        response = await updateCourse(token, editingCourse._id, courseData);
      } else {
        // Create new course
        response = await createCourse(token, courseData as any);
      }

      if (response.success) {
        setIsCreateModalOpen(false);
        setEditingCourse(null);
        
        // If we're viewing this course, refresh the data
        if (editingCourse && selectedCourse?._id === editingCourse._id) {
          await refreshCourseData(editingCourse._id);
        }
      }
    } catch (error) {
      console.error('Error submitting course:', error);
    } finally {
      setLoading(false);
    }
  };

  // Chapter Management
  const handleCreateChapter = (courseId: string) => {
    setEditingChapter(null);
    setCurrentChapterCourseId(courseId);
    setIsChapterModalOpen(true);
  };

  const handleEditChapter = (courseId: string, chapter: Chapter) => {
    setEditingChapter(chapter);
    setCurrentChapterCourseId(courseId);
    setIsChapterModalOpen(true);
  };

  const handleDeleteChapter = async (courseId: string, chapterId: string) => {
    if (!confirm('Are you sure you want to delete this chapter and all its content?')) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const response = await deleteChapter(token, courseId, chapterId);
      if (response.success) {
        await refreshCourseData(courseId);
      }
    } catch (error) {
      console.error('Error deleting chapter:', error);
    }
  };

  const handleSubmitChapter = async (chapterData: Partial<Chapter>) => {
    try {
      const token = await getToken();
      if (!token) return;

      let response;
      if (editingChapter) {
        // Update existing chapter
        response = await updateChapter(token, currentChapterCourseId, editingChapter._id, chapterData);
      } else {
        // Create new chapter
        response = await createChapter(token, currentChapterCourseId, chapterData as any);
      }

      if (response.success) {
        setIsChapterModalOpen(false);
        setEditingChapter(null);
        setCurrentChapterCourseId('');
        await refreshCourseData(currentChapterCourseId);
      }
    } catch (error) {
      console.error('Error submitting chapter:', error);
    }
  };

  // Section Management
  const handleCreateSection = (courseId: string, chapterId: string) => {
    setEditingSection(null);
    setCurrentSectionCourseId(courseId);
    setCurrentSectionChapterId(chapterId);
    setIsSectionModalOpen(true);
  };

  const handleEditSection = (courseId: string, chapterId: string, section: Section) => {
    setEditingSection(section);
    setCurrentSectionCourseId(courseId);
    setCurrentSectionChapterId(chapterId);
    setIsSectionModalOpen(true);
  };

  const handleDeleteSection = async (courseId: string, chapterId: string, sectionId: string) => {
    if (!confirm('Are you sure you want to delete this section and all its lessons?')) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const response = await deleteSection(token, courseId, chapterId, sectionId);
      if (response.success) {
        await refreshCourseData(courseId);
      }
    } catch (error) {
      console.error('Error deleting section:', error);
    }
  };

  const handleSubmitSection = async (sectionData: Partial<Section>) => {
    try {
      const token = await getToken();
      if (!token) return;

      let response;
      if (editingSection) {
        // Update existing section
        response = await updateSection(token, currentSectionCourseId, currentSectionChapterId, editingSection._id, sectionData);
      } else {
        // Create new section
        response = await createSection(token, currentSectionCourseId, currentSectionChapterId, sectionData as any);
      }

      if (response.success) {
        setIsSectionModalOpen(false);
        setEditingSection(null);
        setCurrentSectionChapterId('');
        setCurrentSectionCourseId('');
        await refreshCourseData(currentSectionCourseId);
      }
    } catch (error) {
      console.error('Error submitting section:', error);
    }
  };

  // Lesson Management
  const handleCreateLesson = (courseId: string, chapterId: string, sectionId: string) => {
    setEditingLesson(null);
    setCurrentLessonCourseId(courseId);
    setCurrentLessonChapterId(chapterId);
    setCurrentLessonSectionId(sectionId);
    setIsLessonModalOpen(true);
  };

  const handleEditLesson = (courseId: string, chapterId: string, sectionId: string, lesson: VideoLesson) => {
    setEditingLesson(lesson);
    setCurrentLessonCourseId(courseId);
    setCurrentLessonChapterId(chapterId);
    setCurrentLessonSectionId(sectionId);
    setIsLessonModalOpen(true);
  };

  const handleDeleteLesson = async (courseId: string, chapterId: string, sectionId: string, lessonId: string) => {
    if (!confirm('Are you sure you want to delete this lesson?')) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const response = await deleteVideoLesson(token, courseId, chapterId, sectionId, lessonId);
      if (response.success) {
        await refreshCourseData(courseId);
      }
    } catch (error) {
      console.error('Error deleting lesson:', error);
    }
  };

  const handleSubmitLesson = async (lessonData: Partial<VideoLesson>) => {
    try {
      const token = await getToken();
      if (!token) return;

      let response;
      if (editingLesson) {
        // Update existing lesson
        response = await updateVideoLesson(
          token, 
          currentLessonCourseId, 
          currentLessonChapterId, 
          currentLessonSectionId, 
          editingLesson._id, 
          lessonData
        );
      } else {
        // Create new lesson
        response = await createVideoLesson(
          token, 
          currentLessonCourseId, 
          currentLessonChapterId, 
          currentLessonSectionId, 
          lessonData as any
        );
      }

      if (response.success) {
        setIsLessonModalOpen(false);
        setEditingLesson(null);
        setCurrentLessonSectionId('');
        setCurrentLessonChapterId('');
        setCurrentLessonCourseId('');
        await refreshCourseData(currentLessonCourseId);
      }
    } catch (error) {
      console.error('Error submitting lesson:', error);
    }
  };

  const handlePublishCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to publish this course? It will be visible to students.')) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const response = await publishCourse(token, courseId);
      if (response.success) {
        await refreshCourseData(courseId);
      }
    } catch (error) {
      console.error('Error publishing course:', error);
    }
  };

  const handleUnpublishCourse = async (courseId: string) => {
    if (!confirm('Are you sure you want to unpublish this course? It will no longer be visible to students.')) {
      return;
    }

    try {
      const token = await getToken();
      if (!token) return;

      const response = await unpublishCourse(token, courseId);
      if (response.success) {
        await refreshCourseData(courseId);
      }
    } catch (error) {
      console.error('Error unpublishing course:', error);
    }
  };

  const handleBackToList = () => {
    setCurrentView('list');
    setSelectedCourse(null);
  };

  if (loading && currentView === 'detail') {
    return (
      <div className="flex items-center justify-center min-h-96">
        <div className="flex items-center space-x-2">
          <div className="w-6 h-6 border-2 border-primary-600 border-t-transparent rounded-full animate-spin"></div>
          <span className="text-gray-600">Loading course details...</span>
        </div>
      </div>
    );
  }

  return (
    <>
      {currentView === 'list' ? (
        <CourseList
          onCreateCourse={handleCreateCourse}
          onEditCourse={handleEditCourse}
          onViewCourse={handleViewCourse}
          onDeleteCourse={handleDeleteCourse}
        />
      ) : (
        selectedCourse && (
          <CourseDetail
            course={selectedCourse}
            onBack={handleBackToList}
            onEditCourse={handleEditCourse}
            onCreateChapter={handleCreateChapter}
            onEditChapter={handleEditChapter}
            onDeleteChapter={handleDeleteChapter}
            onCreateSection={handleCreateSection}
            onEditSection={handleEditSection}
            onDeleteSection={handleDeleteSection}
            onCreateLesson={handleCreateLesson}
            onEditLesson={handleEditLesson}
            onDeleteLesson={handleDeleteLesson}
            onPublishCourse={handlePublishCourse}
            onUnpublishCourse={handleUnpublishCourse}
          />
        )
      )}

      {/* Create/Edit Course Modal */}
      <CreateCourseModal
        isOpen={isCreateModalOpen}
        onClose={() => {
          setIsCreateModalOpen(false);
          setEditingCourse(null);
        }}
        onSubmit={handleSubmitCourse}
        editingCourse={editingCourse}
      />

      {/* Create/Edit Chapter Modal */}
      <CreateChapterModal
        isOpen={isChapterModalOpen}
        onClose={() => {
          setIsChapterModalOpen(false);
          setEditingChapter(null);
          setCurrentChapterCourseId('');
        }}
        onSubmit={handleSubmitChapter}
        editingChapter={editingChapter}
      />

      {/* Create/Edit Section Modal */}
      <CreateSectionModal
        isOpen={isSectionModalOpen}
        onClose={() => {
          setIsSectionModalOpen(false);
          setEditingSection(null);
          setCurrentSectionChapterId('');
          setCurrentSectionCourseId('');
        }}
        onSubmit={handleSubmitSection}
        editingSection={editingSection}
      />

      {/* Create/Edit Lesson Modal */}
      <CreateLessonModal
        isOpen={isLessonModalOpen}
        onClose={() => {
          setIsLessonModalOpen(false);
          setEditingLesson(null);
          setCurrentLessonSectionId('');
          setCurrentLessonChapterId('');
          setCurrentLessonCourseId('');
        }}
        onSubmit={handleSubmitLesson}
        editingLesson={editingLesson}
      />
    </>
  );
};