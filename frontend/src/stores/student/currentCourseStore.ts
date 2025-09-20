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
  markLessonAsCompleted: (lessonId: string) => void;
  getProgress: () => { percentage: number; completed: number; total: number };
  getChapterProgress: (chapterId: string) => { percentage: number; completed: number; total: number };
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
      currentChapterId: course.chapters.length > 0 ? course.chapters[0].id : null,
      currentSectionId: course.chapters.length > 0 && course.chapters[0].sections.length > 0 ? 
        course.chapters[0].sections[0].id : null,
      currentLessonId: course.chapters.length > 0 && 
        course.chapters[0].sections.length > 0 &&
        course.chapters[0].sections[0].lessons.length > 0 ?
        course.chapters[0].sections[0].lessons[0].id : null,
      expandedSections: course.chapters.length > 0 && course.chapters[0].sections.length > 0 ? 
        [course.chapters[0].sections[0].id] : [],
    });
  },
  
  setCurrentChapter: (chapterId) => {
    const { course } = get();
    if (!course) return;

    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return;

    const firstSection = chapter.sections[0];
    const firstLesson = firstSection?.lessons[0];

    set({
      currentChapterId: chapterId,
      currentSectionId: firstSection?.id || null,
      currentLessonId: firstLesson?.id || null,
      expandedSections: firstSection ? [firstSection.id] : []
    });
  },
  
  setCurrentSection: (sectionId) => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return;
    
    const chapter = course.chapters.find(ch => ch.id === currentChapterId);
    if (!chapter) return;

    const section = chapter.sections.find(s => s.id === sectionId);
    if (!section) return;
    
    set({ 
      currentSectionId: sectionId,
      currentLessonId: section.lessons.length > 0 ? section.lessons[0].id : null,
      expandedSections: [...get().expandedSections, sectionId]
    });
  },
  
  setCurrentLesson: (lessonId) => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return;
    
    // Find which chapter and section this lesson belongs to
    for (const chapter of course.chapters) {
      if (chapter.id !== currentChapterId) continue;
      
      for (const section of chapter.sections) {
        const lesson = section.lessons.find(l => l.id === lessonId);
        if (lesson) {
          set({ 
            currentSectionId: section.id,
            currentLessonId: lessonId,
            expandedSections: [...get().expandedSections.filter(id => id !== section.id), section.id]
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
  
  markLessonAsCompleted: (lessonId) => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return;
    
    const updatedCourse = { ...course };
    
    for (const chapter of updatedCourse.chapters) {
      if (chapter.id !== currentChapterId) continue;
      
      for (const section of chapter.sections) {
        const lessonIndex = section.lessons.findIndex(l => l.id === lessonId);
        if (lessonIndex !== -1) {
          section.lessons[lessonIndex] = {
            ...section.lessons[lessonIndex],
            completed: true
          };
          set({ course: updatedCourse });
          return;
        }
      }
    }
  },
  
  getProgress: () => {
    const { course } = get();
    if (!course) return { percentage: 0, completed: 0, total: 0 };
    
    let completed = 0;
    let total = 0;
    
    course.chapters.forEach(chapter => {
      chapter.sections.forEach(section => {
        total += section.lessons.length;
        completed += section.lessons.filter(lesson => lesson.completed).length;
      });
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { percentage, completed, total };
  },
  
  getChapterProgress: (chapterId) => {
    const { course } = get();
    if (!course) return { percentage: 0, completed: 0, total: 0 };
    
    const chapter = course.chapters.find(ch => ch.id === chapterId);
    if (!chapter) return { percentage: 0, completed: 0, total: 0 };
    
    let completed = 0;
    let total = 0;
    
    chapter.sections.forEach(section => {
      total += section.lessons.length;
      completed += section.lessons.filter(lesson => lesson.completed).length;
    });
    
    const percentage = total > 0 ? Math.round((completed / total) * 100) : 0;
    
    return { percentage, completed, total };
  },
  
  getCurrentChapter: () => {
    const { course, currentChapterId } = get();
    if (!course || !currentChapterId) return null;
    
    return course.chapters.find(chapter => chapter.id === currentChapterId) || null;
  },
  
  getCurrentSection: () => {
    const { course, currentChapterId, currentSectionId } = get();
    if (!course || !currentChapterId || !currentSectionId) return null;
    
    const chapter = course.chapters.find(ch => ch.id === currentChapterId);
    if (!chapter) return null;
    
    return chapter.sections.find(section => section.id === currentSectionId) || null;
  },
  
  getCurrentLesson: () => {
    const { course, currentChapterId, currentSectionId, currentLessonId } = get();
    if (!course || !currentChapterId || !currentSectionId || !currentLessonId) return null;
    
    const chapter = course.chapters.find(ch => ch.id === currentChapterId);
    if (!chapter) return null;
    
    const section = chapter.sections.find(s => s.id === currentSectionId);
    if (!section) return null;
    
    return section.lessons.find(lesson => lesson.id === currentLessonId) || null;
  }
}));