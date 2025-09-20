import { useState } from 'react';
import { 
  XCircle,  
  Search, 
  Filter, 
  Book, 
  FileText, 
  Layers
} from 'lucide-react';
import { Request } from '../../types/request';
import RequestCard from '../../components/admin/Requests/RequestCard';
import RejectModal from '../../components/admin/Requests/RejectModal';
import ApproveModal from '../../components/admin/Requests/ApproveModal';
import { Timestamp } from 'firebase/firestore';

// Mock data for demonstration - using type-safe structure
const MOCK_REQUESTS: Request[] = [
  {
    id: '1',
    studentId: 'STD12345',
    title: 'Advanced JavaScript Course Access',
    status: 'pending',
    submittedAt: Timestamp.fromDate(new Date('2025-04-28T10:30:00')),
    price: 49.99,
    note: 'I need this course for my upcoming project.',
    type: 'course',
    courseId: 'JS-ADV-101',
    accesType: 'lifetime',
    accessUntil: Timestamp.fromDate(new Date('2025-07-29'))
  },
  {
    id: '2',
    studentId: 'STD67890',
    title: 'React Fundamentals Chapter',
    status: 'pending',
    submittedAt: Timestamp.fromDate(new Date('2025-04-29T14:15:00')),
    price: 19.99,
    type: 'chapter',
    courseId: 'REACT-101',
    chapterId: 'CH-3',
    accesType: 'temporary',
    accessUntil: Timestamp.fromDate(new Date('2025-07-29'))
  },
  {
    id: '3',
    studentId: 'STD54321',
    title: 'Data Structures & Algorithms Book',
    status: 'approved',
    submittedAt: Timestamp.fromDate(new Date('2025-04-25T09:45:00')),
    reviewedAt: Timestamp.fromDate(new Date('2025-04-26T11:20:00')),
    price: 29.99,
    type: 'book',
    bookId: 'DSA-BOOK-123'
  },
  {
    id: '4',
    studentId: 'STD13579',
    title: 'Machine Learning Basics',
    status: 'rejected',
    submittedAt: Timestamp.fromDate(new Date('2025-04-22T16:30:00')),
    reviewedAt: Timestamp.fromDate(new Date('2025-04-23T10:05:00')),
    price: 59.99,
    reason: 'Student already has access to similar content.',
    type: 'course',
    courseId: 'ML-101',
    accesType: 'lifetime',
    accessUntil: Timestamp.fromDate(new Date('2025-07-29'))
  }
];
// Main Requests Page Component
const RequestsPage = () => {
  const [requests, setRequests] = useState<Request[]>(MOCK_REQUESTS);
  const [filter, setFilter] = useState('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [rejectModalOpen, setRejectModalOpen] = useState(false);
  const [approveModalOpen, setApproveModalOpen] = useState(false);
  const [selectedRequestId, setSelectedRequestId] = useState<string | null>(null);
  const [expandedRequests, setExpandedRequests] = useState<Record<string, boolean>>({});
  
  // Get the selected request data
  const selectedRequest = requests.find(req => req.id === selectedRequestId);

  // Filter requests based on status and search query
  const filteredRequests = requests.filter(request => {
    // Filter by status
    if (filter !== 'all' && request.status !== filter) return false;
    
    // Apply search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        request.title.toLowerCase().includes(query) ||
        request.studentId.toLowerCase().includes(query) ||
        request.id.toLowerCase().includes(query) ||
        request.type.toLowerCase().includes(query) ||
        ('courseId' in request && request.courseId.toLowerCase().includes(query)) ||
        ('chapterId' in request && request.chapterId.toLowerCase().includes(query)) ||
        ('bookId' in request && request.bookId.toLowerCase().includes(query))
      );
    }
    
    return true;
  });
  // Sort by submission date (newest first)
  filteredRequests.sort((a, b) => b.submittedAt.toDate().getTime() - a.submittedAt.toDate().getTime());

  const handleApprove = (requestId: string) => {
    setSelectedRequestId(requestId);
    setApproveModalOpen(true);
  };

  const handleApproveConfirm = () => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === selectedRequestId 
          ? { 
              ...req, 
              status: 'approved',
              reviewedAt: Timestamp.fromDate(new Date()),
              reason: undefined
            } 
          : req
      )
    );
    setApproveModalOpen(false);
    setSelectedRequestId(null);
  };

  const handleReject = (requestId: string) => {
    setSelectedRequestId(requestId);
    setRejectModalOpen(true);
  };

  const handleRejectConfirm = (reason: string) => {
    setRequests(prevRequests => 
      prevRequests.map(req => 
        req.id === selectedRequestId 
          ? { 
              ...req, 
              status: 'rejected',
              reviewedAt: Timestamp.fromDate(new Date()),
              reason: reason
            } 
          : req
      )
    );
    setRejectModalOpen(false);
    setSelectedRequestId(null);
  };

  const toggleExpandRequest = (requestId: string) => {
    setExpandedRequests(prev => ({
      ...prev,
      [requestId]: !prev[requestId]
    }));
  };

//   const counts = {
//     all: requests.length,
//     pending: requests.filter(r => r.status === 'pending').length,
//     approved: requests.filter(r => r.status === 'approved').length,
//     rejected: requests.filter(r => r.status === 'rejected').length
//   };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Student Requests</h1>
            <p className="mt-1 text-sm text-gray-500">
              Manage student requests for courses, chapters, and books
            </p>
          </div>
        </div>
        
        {/* Filters and Search */}
        <div className="mb-6 flex flex-col sm:flex-row gap-4 justify-between">
          <div className="inline-flex p-1 rounded-lg bg-gray-100 shadow-sm">
            <button
              onClick={() => setFilter('pending')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'pending' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setFilter('approved')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'approved' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Approved
            </button>
            <button
              onClick={() => setFilter('rejected')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'rejected' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              Rejected
            </button>
            <button
              onClick={() => setFilter('all')}
              className={`px-4 py-2 text-sm font-medium rounded-md ${
                filter === 'all' 
                  ? 'bg-white shadow-sm text-indigo-700' 
                  : 'text-gray-700 hover:bg-gray-50'
              }`}
            >
              All
            </button>
          </div>
        
          <div className="relative">
            <div className="flex items-center border border-gray-300 rounded-lg shadow-sm bg-white pl-3 pr-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500 focus-within:border-indigo-500">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by title, ID, or content..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="ml-2 w-full border-none focus:ring-0 focus:outline-none text-sm text-gray-800 placeholder-gray-400"
              />
              {searchQuery && (
                <button 
                  onClick={() => setSearchQuery('')} 
                  className="text-gray-400 hover:text-gray-500"
                >
                  <XCircle className="h-4 w-4" />
                </button>
              )}
            </div>
            <div className="absolute right-3 -bottom-5">
              <span className="text-xs text-gray-500">
                {filteredRequests.length} result{filteredRequests.length !== 1 ? 's' : ''}
              </span>
            </div>
          </div>
        </div>

        {/* Request Type Filter */}
        <div className="mb-6 flex flex-wrap gap-2">
          <div className="flex items-center gap-1 px-3 py-1.5 bg-white rounded-lg shadow-sm border border-gray-200">
            <Filter className="h-4 w-4 text-gray-400" />
            <span className="text-sm font-medium text-gray-600">Filter by type:</span>
          </div>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
            <Layers className="h-4 w-4 text-violet-500" />
            <span className="text-sm text-gray-700">Courses</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
            <FileText className="h-4 w-4 text-indigo-500" />
            <span className="text-sm text-gray-700">Chapters</span>
          </button>
          <button className="flex items-center gap-1 px-3 py-1.5 rounded-lg hover:bg-white hover:shadow-sm border border-transparent hover:border-gray-200 transition-all">
            <Book className="h-4 w-4 text-blue-500" />
            <span className="text-sm text-gray-700">Books</span>
          </button>
        </div>

        {/* Requests List */}
        {filteredRequests.length === 0 ? (
          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-10 text-center">
            <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-gray-100">
              <Search className="h-6 w-6 text-gray-400" />
            </div>
            <h3 className="mt-4 text-base font-medium text-gray-900">No requests found</h3>
            <p className="mt-1 text-sm text-gray-500">
              Try adjusting your search or filter criteria
            </p>
            <div className="mt-6">
              <button
                onClick={() => { setFilter('all'); setSearchQuery(''); }}
                className="inline-flex items-center px-3.5 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              >
                Clear all filters
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredRequests.map((request) => (
              <RequestCard 
                key={request.id} 
                request={request as unknown as Request} 
                onApprove={handleApprove} 
                onReject={handleReject}
                expanded={expandedRequests[request.id] || false}
                onToggle={() => toggleExpandRequest(request.id)}
              />
            ))}
          </div>
        )}
      </div>
      
      {/* Reject Modal */}
      <RejectModal 
        isOpen={rejectModalOpen}
        onClose={() => setRejectModalOpen(false)}
        onConfirm={handleRejectConfirm}
      />
      
      {/* Approve Modal */}
      <ApproveModal 
        isOpen={approveModalOpen}
        onClose={() => setApproveModalOpen(false)}
        onConfirm={handleApproveConfirm}
        requestData={selectedRequest as unknown as Request}
      />
    </div>
  );
};

export default RequestsPage;