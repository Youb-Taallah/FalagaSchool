import { useState, useEffect } from 'react';
import { Search, Grid2X2, List, BookOpen, GraduationCap, Layers } from 'lucide-react';
import { Input } from '../../components/ui/input';
import { Button } from '../../components/ui/button';
import useStudentStore from '../../stores/student/studentStore';
import { useCoursesStore } from '../../stores/public/coursesStore';
import { useBooksStore } from '../../stores/public/booksStore';
import { cn } from '../../components/utils';
import { Course, Chapter } from '../../types/course';
import { Book } from '../../types/book';
import { LibraryCards } from '../../components/student/LibraryCards';


type ViewMode = 'grid' | 'list';
type ContentType = 'courses' | 'chapters' | 'books';

export function LibraryPage() {

  const { currentStudent, loading: studentLoading } = useStudentStore();

  const { books, isLoading: booksLoading } = useBooksStore();
  const { courses, isLoading: coursesLoading, getCourseById, getChapter } = useCoursesStore();

  const [viewMode, setViewMode] = useState<ViewMode>('grid');
  const [activeTab, setActiveTab] = useState<ContentType>('courses');
  const [searchQuery, setSearchQuery] = useState('');

  const [enrolledCourses, setEnrolledCourses] = useState<Course[]>([]);
  const [enrolledChapters, setEnrolledChapters] = useState<Chapter[]>([]);
  const [boughtBooks, setBoughtBooks] = useState<Book[]>([]);


  // UseEffects to get owned courses, chapters and books 

  useEffect(() => {
    if (!currentStudent?.enrolledCourses) {
      setEnrolledCourses([]);
      return;
    }
  
    const fetchEnrolledCourses = async () => {
      const courses: Course[] = [];
      
      for (const enrollment of currentStudent?.enrolledCourses || []) {
        try {
          const course = await getCourseById(enrollment.courseId);
          if (course) {
            courses.push(course);
          }
        } catch (error) {
          console.error(`Error fetching course ${enrollment.courseId}:`, error);
        }
      }
  
      setEnrolledCourses(courses);
    };
  
    fetchEnrolledCourses();
  }, [currentStudent, getCourseById]);

  // Effect for enrolled chapters
  useEffect(() => {
    if (!currentStudent?.enrolledChapters) {
      setEnrolledChapters([]);
      return;
    }

    const fetchEnrolledChapters = async () => {
      const chapters: Chapter[] = [];
      
      for (const enrollment of currentStudent?.enrolledChapters || []) {
        try {
          const chapter = getChapter(enrollment.courseId, enrollment.chapterId);
          if (chapter) {
            // Include the courseId in the chapter data for reference
            chapters.push({ ...chapter, courseId: enrollment.courseId });
          }
        } catch (error) {
          console.error(`Error fetching chapter ${enrollment.chapterId} from course ${enrollment.courseId}:`, error);
        }
      }

      setEnrolledChapters(chapters);
    };    

    fetchEnrolledChapters();
  }, [courses, currentStudent?.enrolledChapters, getChapter]);

  // Effect for bought books
  useEffect(() => {
    if (!currentStudent?.boughtBooks) {
      setBoughtBooks([]);
      return;
    }

    const booksMap = new Map(books.map(book => [book.id, book]));
    const bought = currentStudent.boughtBooks
      .map(purchase => booksMap.get(purchase.bookId))
      .filter(Boolean) as Book[];

    setBoughtBooks(bought);
  }, [books, currentStudent?.boughtBooks]);

  const tabs = [
    { id: 'courses' as const, label: 'Courses', icon: GraduationCap, count: enrolledCourses.length },
    { id: 'chapters' as const, label: 'Chapters', icon: Layers, count: enrolledChapters.length },
    { id: 'books' as const, label: 'Books', icon: BookOpen, count: boughtBooks.length },
  ];

  const filteredContent = () => {
    const query = searchQuery.toLowerCase();
    switch (activeTab) {
      case 'courses':
        return enrolledCourses.filter(course => 
          course?.title.toLowerCase().includes(query) ||
          course?.description.toLowerCase().includes(query)
        );
      case 'chapters':
        return enrolledChapters.filter(chapter =>
          chapter?.title.toLowerCase().includes(query)
        );
      case 'books':
        return boughtBooks.filter(book =>
          book?.title.toLowerCase().includes(query) ||
          book?.description.toLowerCase().includes(query)
        );
      default:
        return [];
    }
  };

  const content = filteredContent();
  const isLoading = coursesLoading || booksLoading || studentLoading;

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">My Library</h1>
          <p className="text-gray-500">Access all your learning materials in one place</p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
            <Input
              type="search"
              placeholder="Search library..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 w-[250px]"
            />
          </div>
          <div className="flex border rounded-lg">
            <Button
              variant={viewMode === 'grid' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="rounded-r-none"
            >
              <Grid2X2 size={18} />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'primary' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="rounded-l-none"
            >
              <List size={18} />
            </Button>
          </div>
        </div>
      </div>

      <div className="mb-6">
        <div className="border-b border-gray-200">
          <div className="flex space-x-8 overflow-x-auto">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 relative flex items-center space-x-2 whitespace-nowrap",
                  activeTab === tab.id
                    ? "text-blue-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
                <span className="ml-1.5 text-xs font-medium rounded-full bg-gray-100 px-2 py-0.5">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-blue-600" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-blue-100 rounded-full"></div>
            <p className="mt-2 text-gray-500">Loading your library...</p>
          </div>
        </div>
      ) : (
        <LibraryCards
          viewMode={viewMode}
          activeTab={activeTab}
          courses={content as Course[]}
          chapters={content as Chapter[]}
          books={content as Book[]}
          enrollments={{
            courses: currentStudent?.enrolledCourses || [],
            chapters: currentStudent?.enrolledChapters || [],
            books: currentStudent?.boughtBooks || []
          }}
        />
      )}
    </div>
  );
}