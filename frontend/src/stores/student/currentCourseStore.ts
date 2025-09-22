import { create } from 'zustand';
import { Course, VideoLesson, Section, Chapter } from '../../types/course';

interface CurrentCourseState {
  course: Course | null;
  currentChapterId: string | null;
  currentSectionId: string | null;
  currentLessonId: string | null;
  expandedSections: string[];
  
  setCourse: (course: Course) => void;
  setCurrentChapter: (chapterId: string) => void;
  setCurrentSection: (sectionId: string) => void;
  setCurrentLesson: (lessonId: string) => void;
  toggleSectionExpanded: (sectionId: string) => void;
  getCurrentChapter: () => Chapter | null;
  getCurrentSection: () => Section | null;
  getCurrentLesson: () => VideoLesson | null;
}

export const useCurrentCourseStore = create<CurrentCourseState>((set, get) => ({
  course: null,
  currentChapterId: null,
  currentSectionId: null,
  currentLessonId: null,
  expandedSections: [],
  
  setCourse: (course) => {
    set({ 
      course,
      // Reset states when course changes
      currentChapterId: course.chapters.length > 0 ? course.chapters[0]._id : null,
      currentSectionId: course.chapters.length > 0 && course.chapters[0].sections.length > 0 ? 
        course.chapters[0].sections[0]._id : null,
      currentLessonId: course.chapters.length > 0 && 
        course.chapters[0].sections.length > 0 &&
        course.chapters[0].sections[0].lessons.length > 0 ?
        course.chapters[0].sections[0].lessons[0]._id : null,
      expandedSections: course.chapters.length > 0 && course.chapters[0].sections.length > 0 ? 
        [course.chapters[0].sections[0]._id] : [],
    });
  },
  
  setCurrentChapter: (chapterId) => {
    const { course } = get();
    if (!course) return;

    const chapter = course.chapters.find(ch => ch._id === chapterId);
    if (!chapter) return;

    const firstSection = chapter.sections[0];
    const firstLesson = firstSection?.lessons[0];

    set({
      currentChapterId: chapterId,
      currentSectionId: firstSection?._id || null,
      currentLessonId: firstLesson?._id || null,
      expandedSections: firstSection ? [firstSection._id] : []
    });
  },
  
  setCurrentSection: (sectionId) => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return;
    
    const chapter = course.chapters.find(ch => ch._id === currentChapterId);
    if (!chapter) return;

    const section = chapter.sections.find(s => s._id === sectionId);
    if (!section) return;
    
    set({ 
      currentSectionId: sectionId,
      currentLessonId: section.lessons.length > 0 ? section.lessons[0]._id : null,
      expandedSections: [...get().expandedSections, sectionId]
    });
  },
  
  setCurrentLesson: (lessonId) => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return;
    
    // Find which chapter and section this lesson belongs to
    for (const chapter of course.chapters) {
      if (chapter._id !== currentChapterId) continue;
      
      for (const section of chapter.sections) {
        const lesson = section.lessons.find(l => l._id === lessonId);
        if (lesson) {
          set({ 
            currentSectionId: section._id,
            currentLessonId: lessonId,
            expandedSections: [...get().expandedSections.filter(id => id !== section._id), section._id]
          });
          return;
        }
      }
    }
  },
  
  toggleSectionExpanded: (sectionId) => {
    const { expandedSections } = get();
    if (expandedSections.includes(sectionId)) {
      set({ expandedSections: expandedSections.filter(id => id !== sectionId) });
    } else {
      set({ expandedSections: [...expandedSections, sectionId] });
    }
  },
  
  getCurrentChapter: () => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return null;
    
    return course.chapters.find(chapter => chapter._id === currentChapterId) || null;
  },
  
  getCurrentSection: () => {
    const { course, currentChapterId, currentSectionId } = get();
    if (!course || !currentChapterId || !currentSectionId) return null;
    
    const chapter = course.chapters.find(ch => ch._id === currentChapterId);
    if (!chapter) return null;
    
    return chapter.sections.find(section => section._id === currentSectionId) || null;
  },
  
  getCurrentLesson: () => {
    const { course, currentChapterId, currentSectionId, currentLessonId } = get();
    if (!course || !currentChapterId || !currentSectionId || !currentLessonId) return null;
    
    const chapter = course.chapters.find(ch => ch._id === currentChapterId);
    if (!chapter) return null;
    
    const section = chapter.sections.find(s => s._id === currentSectionId);
    if (!section) return null;
    
    return section.lessons.find(lesson => lesson._id === currentLessonId) || null;
  }
}));