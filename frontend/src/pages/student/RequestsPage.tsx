import { useState } from 'react';
import { Eye, XCircle, Book, Layers, GraduationCap, PlusCircle, AlertCircle } from 'lucide-react';
import { Card, CardHeader, CardContent } from '../../components/ui/card';
import { Button } from '../../components/ui/button';
import { Modal } from '../../components/ui/modal';
import { cn } from '../../components/utils';
// import useStudentStore from '../../stores/student/userStore';
import { Request } from '../../types/request';

// Demo data
const DEMO_REQUESTS: Request[] = [
  {
    _id: '1',
    studentId: '1',
    type: 'course',
    courseId: 'c1',
    title: 'Advanced Machine Learning Course',
    status: 'approved',
    submittedAt:(new Date(1714521600 * 1000)),
    price: 299,
    accesType: 'lifetime',
  },
  {
    _id: '2',
    studentId: '1',
    type: 'book',
    bookId: 'b1',
    title: 'Cloud Computing Architectures',
    status: 'pending',
    submittedAt: (new Date(1716940800 * 1000)),
    price: 49,
  },
  {
    _id: '3',
    studentId: '1',
    type: 'course',
    courseId: 'c2',
    title: 'Advanced Data Science',
    status: 'rejected',
    submittedAt: (new Date(1715731200 * 1000)),
    price: 399,
    accesType: 'temporary',
    accessUntil: (new Date(1731312000 * 1000)),
    reason: 'Course prerequisites not met',
  },
  {
    _id: '4',
    studentId: '1',
    type: 'book',
    bookId: 'b2',
    title: 'Cybersecurity Essentials',
    status: 'pending',
    submittedAt: (new Date(1717372800 * 1000)),
    price: 79,
  },
];

type RequestTab = 'all' | 'pending' | 'approved' | 'rejected';

export function RequestsPage() {
  const [activeTab, setActiveTab] = useState<RequestTab>('all');
  const [requests, setRequests] = useState<Request[]>(DEMO_REQUESTS);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showCancelModal, setShowCancelModal] = useState(false);

  const filteredRequests = requests.filter(request => {
    if (activeTab === 'all') return true;
    return request.status === activeTab;
  });

  const handleViewRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowViewModal(true);
  };

  const handleCancelRequest = (request: Request) => {
    setSelectedRequest(request);
    setShowCancelModal(true);
  };

  const confirmCancelRequest = () => {
    if (!selectedRequest) return;
    
    setRequests(prevRequests => 
      prevRequests.filter(request => request._id !== selectedRequest._id)
    );
    setShowCancelModal(false);
    setSelectedRequest(null);
  };

  const getTypeIcon = (type: Request['type']) => {
    switch (type) {
      case 'course':
        return <GraduationCap className="w-5 h-5" />;
      case 'chapter':
        return <Layers className="w-5 h-5" />;
      case 'book':
        return <Book className="w-5 h-5" />;
    }
  };

  const getStatusBadge = (status: Request['status']) => {
    const baseClasses = "px-2.5 py-0.5 rounded-full text-xs font-medium";
    switch (status) {
      case 'approved':
        return <span className={cn(baseClasses, "bg-green-100 text-green-800")}>Approved</span>;
      case 'rejected':
        return <span className={cn(baseClasses, "bg-red-100 text-red-800")}>Rejected</span>;
      case 'pending':
        return <span className={cn(baseClasses, "bg-yellow-100 text-yellow-800")}>Pending</span>;
    }
  };

  const tabs: { id: RequestTab; label: string; count: number }[] = [
    { id: 'all', label: 'All Requests', count: requests.length },
    { id: 'pending', label: 'Pending', count: requests.filter(r => r.status === 'pending').length },
    { id: 'approved', label: 'Approved', count: requests.filter(r => r.status === 'approved').length },
    { id: 'rejected', label: 'Rejected', count: requests.filter(r => r.status === 'rejected').length },
  ];

  return (
    <div className="container mx-auto max-w-6xl">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Requests</h1>
          <p className="text-gray-500 dark:text-gray-400">
            Track your course and book access requests
          </p>
        </div>
        <Button leftIcon={<PlusCircle size={16} />}>
          New Request
        </Button>
      </div>

      <Card>
        <CardHeader className="border-b">
          <div className="flex space-x-4">
            {tabs.map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={cn(
                  "pb-4 relative",
                  activeTab === tab.id
                    ? "text-indigo-600 font-medium"
                    : "text-gray-500 hover:text-gray-700"
                )}
              >
                {tab.label}
                <span className="ml-2 text-xs font-medium rounded-full bg-gray-100 px-2 py-0.5">
                  {tab.count}
                </span>
                {activeTab === tab.id && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-indigo-600" />
                )}
              </button>
            ))}
          </div>
        </CardHeader>
        <CardContent>
          <div className="mt-4">
            <table className="w-full">
              <thead>
                <tr className="text-left text-sm text-gray-500 border-b">
                  <th className="pb-3 font-medium">TYPE</th>
                  <th className="pb-3 font-medium">TITLE</th>
                  <th className="pb-3 font-medium">DATE</th>
                  <th className="pb-3 font-medium">STATUS</th>
                  <th className="pb-3 font-medium">ACTIONS</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRequests.map(request => (
                  <tr key={request._id} className="text-sm">
                    <td className="py-4">
                      <div className="flex items-center text-gray-600">
                        {getTypeIcon(request.type)}
                        <span className="ml-2 capitalize">{request.type}</span>
                      </div>
                    </td>
                    <td className="py-4">{request.title}</td>
                    <td className="py-4 text-gray-500">
                      {request.submittedAt.toLocaleDateString()}
                    </td>
                    <td className="py-4">
                      {getStatusBadge(request.status)}
                    </td>
                    <td className="py-4">
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          leftIcon={<Eye size={16} />}
                          onClick={() => handleViewRequest(request)}
                        >
                          View
                        </Button>
                        {request.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            leftIcon={<XCircle size={16} />}
                            onClick={() => handleCancelRequest(request)}
                          >
                            Cancel
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {filteredRequests.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                No requests found.
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* View Request Modal */}
      <Modal
        isOpen={showViewModal}
        onClose={() => {
          setShowViewModal(false);
          setSelectedRequest(null);
        }}
        title="Request Details"
      >
        {selectedRequest && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2 text-gray-600">
              {getTypeIcon(selectedRequest.type)}
              <span className="capitalize">{selectedRequest.type} Request</span>
            </div>
            
            <div className="space-y-3">
              <div>
                <p className="text-sm text-gray-500">Title</p>
                <p className="font-medium">{selectedRequest.title}</p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Status</p>
                <div className="mt-1">{getStatusBadge(selectedRequest.status)}</div>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Submitted On</p>
                <p className="font-medium">
                  {selectedRequest.submittedAt.toLocaleDateString()}
                </p>
              </div>
              
              <div>
                <p className="text-sm text-gray-500">Price</p>
                <p className="font-medium">${selectedRequest.price}</p>
              </div>
              
              {'accesType' in selectedRequest && (
                <div>
                  <p className="text-sm text-gray-500">Access Type</p>
                  <p className="font-medium capitalize">{selectedRequest.accesType}</p>
                </div>
              )}
              
              {'accessUntil' in selectedRequest && selectedRequest.accessUntil && (
                <div>
                  <p className="text-sm text-gray-500">Access Until</p>
                  <p className="font-medium">
                    {selectedRequest.accessUntil.toLocaleDateString()}
                  </p>
                </div>
              )}
              
              {selectedRequest.reason && (
                <div>
                  <p className="text-sm text-gray-500">Reason</p>
                  <p className="font-medium">{selectedRequest.reason}</p>
                </div>
              )}
            </div>
          </div>
        )}
      </Modal>

      {/* Cancel Request Modal */}
      <Modal
        isOpen={showCancelModal}
        onClose={() => {
          setShowCancelModal(false);
          setSelectedRequest(null);
        }}
        title="Cancel Request"
      >
        <div className="space-y-4">
          <div className="flex items-start space-x-3 text-yellow-600">
            <AlertCircle className="w-5 h-5 mt-0.5" />
            <div>
              <p className="font-medium">Are you sure you want to cancel this request?</p>
              <p className="text-sm text-gray-500 mt-1">
                This action cannot be undone. The request will be permanently removed.
              </p>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2 mt-6">
            <Button
              variant="outline"
              onClick={() => {
                setShowCancelModal(false);
                setSelectedRequest(null);
              }}
            >
              No, keep it
            </Button>
            <Button
              variant="destructive"
              onClick={confirmCancelRequest}
            >
              Yes, cancel request
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}