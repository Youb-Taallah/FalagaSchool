import { 
    CheckCircle, 
    XCircle, 
    Clock, 
    FileText, 
    Layers, 
    Book, 
    Calendar, 
    User, 
    DollarSign, 
    AlertCircle, 
    ChevronRight,
    ChevronDown
  } from 'lucide-react';
  import { Request } from '../../../types/request';
  
  // Request Type Icon Component
  const RequestTypeIcon = ({ type }: { type: 'course' | 'chapter' | 'book' }) => {
    switch (type) {
      case 'course':
        return <Layers className="h-5 w-5 text-violet-500" />;
      case 'chapter':
        return <FileText className="h-5 w-5 text-indigo-500" />;
      case 'book':
        return <Book className="h-5 w-5 text-blue-500" />;
      default:
        return null;
    }
  };
  
  // Status Badge Component
  const StatusBadge = ({ status }: { status: 'pending' | 'approved' | 'rejected' }) => {
    switch (status) {
      case 'pending':
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800">
            <Clock className="h-3 w-3" />
            <span>Pending</span>
          </div>
        );
      case 'approved':
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-100 text-emerald-800">
            <CheckCircle className="h-3 w-3" />
            <span>Approved</span>
          </div>
        );
      case 'rejected':
        return (
          <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-rose-100 text-rose-800">
            <XCircle className="h-3 w-3" />
            <span>Rejected</span>
          </div>
        );
      default:
        return null;
    }
  };
  
  // Request Card Component
  const RequestCard = ({ 
    request, 
    onApprove, 
    onReject, 
    expanded, 
    onToggle 
  }: { 
    request: Request, 
    onApprove: (requestId: string) => void, 
    onReject: (requestId: string) => void, 
    expanded: boolean, 
    onToggle: (requestId: string) => void 
  }) => {
    const getRequestTypeDetails = (request: Request) => {
      switch (request.type) {
        case 'course':
          return (
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Course ID:</div>
                <div className="font-medium">{request.courseId}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Access Type:</div>
                <div className="font-medium capitalize">{request.accesType}</div>
              </div>
              {request.accesType === 'temporary' && request.accessUntil && (
                <div className="flex items-center gap-2">
                  <div className="min-w-24 text-gray-500">End Date:</div>
                  <div className="font-medium">{request.accessUntil.toDate().toLocaleDateString()}</div>
                </div>
              )}
            </div>
          );
        case 'chapter':
          return (
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Course ID:</div>
                <div className="font-medium">{request.courseId}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Chapter ID:</div>
                <div className="font-medium">{request.chapterId}</div>
              </div>
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Access Type:</div>
                <div className="font-medium capitalize">{request.accesType}</div>
              </div>
              {request.accesType === 'temporary' && request.accessUntil && (
                <div className="flex items-center gap-2">
                  <div className="min-w-24 text-gray-500">End Date:</div>
                  <div className="font-medium">{request.accessUntil.toDate().toLocaleDateString()}</div>
                </div>
              )}
            </div>
          );
        case 'book':
          return (
            <div className="text-sm space-y-1">
              <div className="flex items-center gap-2">
                <div className="min-w-24 text-gray-500">Book ID:</div>
                <div className="font-medium">{request.bookId}</div>
              </div>
            </div>
          );
        default:
          return null;
      }
    };
  
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-200 hover:shadow-md">
        <div 
          className="p-4 cursor-pointer" 
          onClick={() => onToggle(request.id)}
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex-shrink-0 bg-gray-50 p-2 rounded-lg">
                <RequestTypeIcon type={request.type} />
              </div>
              <div>
                <h3 className="text-base font-medium text-gray-900 line-clamp-1">{request.title}</h3>
                <div className="flex items-center mt-1 space-x-2">
                  <StatusBadge status={request.status} />
                  <span className="text-xs text-gray-500 capitalize">{request.type}</span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-4">
              {request.status === 'pending' && (
                <div className="flex space-x-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onApprove(request.id);
                    }}
                    className="rounded-full h-9 w-9 flex items-center justify-center bg-emerald-50 border border-emerald-200 text-emerald-600 hover:bg-emerald-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 transition-colors"
                  >
                    <CheckCircle className="h-5 w-5" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onReject(request.id);
                    }}
                    className="rounded-full h-9 w-9 flex items-center justify-center bg-rose-50 border border-rose-200 text-rose-600 hover:bg-rose-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500 transition-colors"
                  >
                    <XCircle className="h-5 w-5" />
                  </button>
                </div>
              )}
              <div className="text-gray-400">
                {expanded ? <ChevronDown className="h-5 w-5" /> : <ChevronRight className="h-5 w-5" />}
              </div>
            </div>
          </div>
        </div>
        
        {expanded && (
          <div className="px-4 pb-4 pt-1 bg-gray-50 border-t border-gray-100">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Student ID: <span className="font-medium text-gray-900">{request.studentId}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <DollarSign className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Price: <span className="font-medium text-gray-900">${request.price.toFixed(2)}</span></span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-gray-500" />
                  <span className="text-sm text-gray-500">Submitted: <span className="font-medium text-gray-900">{request.submittedAt.toLocaleString()}</span></span>
                </div>
                {request.reviewedAt && (
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-500" />
                    <span className="text-sm text-gray-500">Reviewed: <span className="font-medium text-gray-900">{request.reviewedAt.toLocaleString()}</span></span>
                  </div>
                )}
              </div>
              <div>
                {getRequestTypeDetails(request)}
              </div>
            </div>
            
            {request.note && (
              <div className="mt-4 bg-white border border-gray-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <FileText className="h-4 w-4 text-indigo-500" />
                  <span className="font-medium text-sm text-gray-700">Student Note</span>
                </div>
                <p className="text-sm text-gray-600">{request.note}</p>
              </div>
            )}
            
            {request.reason && (
              <div className="mt-4 bg-rose-50 border border-rose-200 p-3 rounded-lg">
                <div className="flex items-center gap-2 mb-1">
                  <AlertCircle className="h-4 w-4 text-rose-500" />
                  <span className="font-medium text-sm text-rose-700">Rejection Reason</span>
                </div>
                <p className="text-sm text-rose-600">{request.reason}</p>
              </div>
            )}
          </div>
        )}
      </div>
    );
  };
  
  export default RequestCard;