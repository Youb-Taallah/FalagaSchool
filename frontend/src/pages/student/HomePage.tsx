import { Card, CardHeader, CardTitle, CardContent } from '../../components/ui/card';
import useStudentStore from '../../stores/student/studentStore';


export function HomePage() {
  const student = useStudentStore(state => state.currentStudent);
  
  return (
    <div className="container mx-auto max-w-6xl">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-gray-500 dark:text-gray-400">
          Welcome back, {student?.name || 'Student'}
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Courses</p>
                <p className="font-medium">{student?.enrolledCourses?.length || 0}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500 dark:text-gray-400">Enrolled Chapters</p>
                <p className="font-medium">{student?.enrolledChapters?.length || 0}</p>
              </div>
            </div>
          </CardContent>
        </Card>
        
        <Card className="md:col-span-2 xl:col-span-1">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400">
              <p>No recent activity to display.</p>
            </div>
          </CardContent>
        </Card>
        
        <Card className="xl:col-span-1">
          <CardHeader>
            <CardTitle>Upcoming Deadlines</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center min-h-[200px] text-gray-500 dark:text-gray-400">
              <p>No upcoming deadlines.</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}