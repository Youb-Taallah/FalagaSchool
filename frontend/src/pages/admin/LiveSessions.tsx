import React, { useState, useEffect } from 'react';
import { LiveSessionCard } from '../../components/admin/LiveSessionCard';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '../../components/ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../components/ui/select';
import { Button } from '../../components/ui/button';
import { Input } from '../../components/ui/input';
import { Textarea } from '../../components/ui/textarea';
import { Label } from '../../components/ui/label';
import { PlusIcon, SearchIcon } from 'lucide-react';

// Mock data - replace with actual API calls in production
const mockCourses = [
  { id: '1', title: 'React Fundamentals' },
  { id: '2', title: 'Advanced JavaScript' },
  { id: '3', title: 'UI/UX Design Principles' },
];

const mockLiveSessions = [
  {
    id: '1',
    courseId: '1',
    title: 'React Hooks Deep Dive',
    date: '2025-05-15T18:00:00',
    duration: 90,
    ressources: [{ id: '1', title: 'Hooks Cheatsheet', url: '/resources/hooks-cheatsheet.pdf' }],
    note: 'Come prepared with questions about useEffect',
    link: 'https://zoom.us/j/123456789',
  },
  {
    id: '2',
    courseId: '1',
    title: 'Building Custom React Hooks',
    date: '2025-05-22T18:00:00',
    duration: 60,
    ressources: [],
    note: 'We will code together during this session',
    link: 'https://zoom.us/j/987654321',
  },
  {
    id: '3',
    courseId: '2',
    title: 'JavaScript Closures Masterclass',
    date: '2025-05-20T19:00:00',
    duration: 120,
    ressources: [{ id: '1', title: 'Closure Examples', url: '/resources/closure-examples.js' }],
    link: 'https://zoom.us/j/567891234',
  },
];

const LiveSessionsPage = () => {
  const [sessions, setSessions] = useState([]);
  const [filteredSessions, setFilteredSessions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [currentSession, setCurrentSession] = useState({
    id: '',
    courseId: '',
    title: '',
    date: '',
    duration: 60,
    ressources: [],
    note: '',
    link: '',
  });
  const [newResource, setNewResource] = useState({ title: '', url: '' });

  // Fetch courses and sessions on component mount
  useEffect(() => {
    // Replace with actual API calls
    setCourses(mockCourses);
    setSessions(mockLiveSessions);
    setFilteredSessions(mockLiveSessions);
  }, []);

  // Filter sessions based on selected course and search term
  useEffect(() => {
    let filtered = sessions;
    
    if (selectedCourse) {
      filtered = filtered.filter(session => session.courseId === selectedCourse);
    }
    
    if (searchTerm) {
      filtered = filtered.filter(session => 
        session.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        session.note?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    setFilteredSessions(filtered);
  }, [selectedCourse, searchTerm, sessions]);

  const handleAddSession = () => {
    setIsEditMode(false);
    setCurrentSession({
      id: '',
      courseId: selectedCourse || '',
      title: '',
      date: '',
      duration: 60,
      ressources: [],
      note: '',
      link: '',
    });
    setIsDialogOpen(true);
  };

  const handleEditSession = (session) => {
    setIsEditMode(true);
    setCurrentSession({
      ...session,
      date: session.date.substring(0, 16), // Format date for datetime-local input
    });
    setIsDialogOpen(true);
  };

  const handleDeleteSession = (sessionId) => {
    // In production, call API to delete session
    setSessions(prevSessions => prevSessions.filter(session => session.id !== sessionId));
  };

  const handleSaveSession = () => {
    if (isEditMode) {
      // Update existing session
      setSessions(prevSessions => 
        prevSessions.map(session => 
          session.id === currentSession.id ? currentSession : session
        )
      );
    } else {
      // Add new session
      const newSession = {
        ...currentSession,
        id: Date.now().toString(), // In production, use proper ID generation
      };
      setSessions(prevSessions => [...prevSessions, newSession]);
    }
    setIsDialogOpen(false);
  };

  const handleAddResource = () => {
    if (newResource.title && newResource.url) {
      setCurrentSession(prev => ({
        ...prev,
        ressources: [...prev.ressources, { id: Date.now().toString(), ...newResource }]
      }));
      setNewResource({ title: '', url: '' });
    }
  };

  const handleRemoveResource = (resourceId) => {
    setCurrentSession(prev => ({
      ...prev,
      ressources: prev.ressources.filter(resource => resource.id !== resourceId)
    }));
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="px-6 py-8 max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Live Sessions</h1>
        <Button 
          onClick={handleAddSession}
          className="bg-indigo-600 hover:bg-indigo-700 text-white"
        >
          <PlusIcon className="w-4 h-4 mr-2" />
          Add Session
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div className="relative">
            <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
            <Input
              placeholder="Search sessions..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Select value={selectedCourse} onValueChange={setSelectedCourse}>
            <SelectTrigger>
              <SelectValue placeholder="Filter by course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Courses</SelectItem>
              {courses.map(course => (
                <SelectItem key={course.id} value={course.id}>
                  {course.title}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          {filteredSessions.length > 0 ? (
            filteredSessions.map(session => (
              <LiveSessionCard
                key={session.id}
                session={session}
                courseName={courses.find(c => c.id === session.courseId)?.title || 'Unknown Course'}
                onEdit={() => handleEditSession(session)}
                onDelete={() => handleDeleteSession(session.id)}
                formatDate={formatDate}
              />
            ))
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>No live sessions found. Create a new session to get started.</p>
            </div>
          )}
        </div>
      </div>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>{isEditMode ? 'Edit Live Session' : 'Add New Live Session'}</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="course">Course</Label>
              <Select 
                value={currentSession.courseId} 
                onValueChange={(value) => setCurrentSession(prev => ({ ...prev, courseId: value }))}
              >
                <SelectTrigger id="course">
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
                <SelectContent>
                  {courses.map(course => (
                    <SelectItem key={course.id} value={course.id}>
                      {course.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="title">Session Title</Label>
              <Input
                id="title"
                value={currentSession.title}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, title: e.target.value }))}
                placeholder="Enter session title"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="date">Date & Time</Label>
              <Input
                id="date"
                type="datetime-local"
                value={currentSession.date}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, date: e.target.value }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration">Duration (minutes)</Label>
              <Input
                id="duration"
                type="number"
                value={currentSession.duration}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, duration: parseInt(e.target.value) || 0 }))}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="link">Session Link</Label>
              <Input
                id="link"
                value={currentSession.link || ''}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, link: e.target.value }))}
                placeholder="https://zoom.us/j/..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="note">Notes</Label>
              <Textarea
                id="note"
                value={currentSession.note || ''}
                onChange={(e) => setCurrentSession(prev => ({ ...prev, note: e.target.value }))}
                placeholder="Additional information about the session"
                rows={3}
              />
            </div>

            <div className="space-y-3 border-t border-b py-4">
              <h3 className="font-medium">Resources</h3>
              
              {currentSession.ressources.length > 0 && (
                <div className="space-y-2">
                  {currentSession.ressources.map(resource => (
                    <div key={resource.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md">
                      <div>
                        <p className="font-medium">{resource.title}</p>
                        <p className="text-sm text-gray-500 truncate">{resource.url}</p>
                      </div>
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => handleRemoveResource(resource.id)}
                        className="text-red-500 hover:text-red-700"
                      >
                        Remove
                      </Button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="grid grid-cols-3 gap-2">
                <Input
                  className="col-span-1"
                  placeholder="Resource title"
                  value={newResource.title}
                  onChange={(e) => setNewResource(prev => ({ ...prev, title: e.target.value }))}
                />
                <Input
                  className="col-span-1"
                  placeholder="Resource URL"
                  value={newResource.url}
                  onChange={(e) => setNewResource(prev => ({ ...prev, url: e.target.value }))}
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleAddResource}
                  disabled={!newResource.title || !newResource.url}
                  className="col-span-1"
                >
                  Add Resource
                </Button>
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button 
              onClick={handleSaveSession}
              disabled={!currentSession.title || !currentSession.date || !currentSession.courseId}
              className="bg-indigo-600 hover:bg-indigo-700 text-white"
            >
              {isEditMode ? 'Update Session' : 'Create Session'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default LiveSessionsPage;