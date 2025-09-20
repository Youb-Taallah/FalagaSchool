import { CheckCircle, Layers, FileText, Book } from 'lucide-react';
import { Request } from '../../../types/request';

interface ApproveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  requestData: Request | null;
}

const ApproveModal = ({ isOpen, onClose, onConfirm, requestData }: ApproveModalProps) => {
  if (!isOpen || !requestData) return null;

  const getTypeSpecificDetails = () => {
    switch (requestData.type) {
      case 'course':
        return (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-3">
              <Layers className="h-5 w-5 text-violet-500" />
              <span className="text-sm font-medium text-gray-700">Course Access Request</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm border-t border-b border-gray-100 py-3">
              <div className="text-gray-500">Course ID:</div>
              <div className="font-medium">{requestData.courseId}</div>
              <div className="text-gray-500">Access Type:</div>
              <div className="font-medium capitalize">{requestData.accesType}</div>
              {requestData.accesType === 'temporary' && requestData.accessUntil && (
                <>
                  <div className="text-gray-500">End Date:</div>
                  <div className="font-medium">{requestData.accessUntil.toLocaleDateString()}</div>
                </>
              )}
            </div>
          </div>
        );
      case 'chapter':
        return (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-3">
              <FileText className="h-5 w-5 text-indigo-500" />
              <span className="text-sm font-medium text-gray-700">Chapter Access Request</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm border-t border-b border-gray-100 py-3">
              <div className="text-gray-500">Course ID:</div>
              <div className="font-medium">{requestData.courseId}</div>
              <div className="text-gray-500">Chapter ID:</div>
              <div className="font-medium">{requestData.chapterId}</div>
              <div className="text-gray-500">Access Type:</div>
              <div className="font-medium capitalize">{requestData.accesType}</div>
              {requestData.accesType === 'temporary' && requestData.accessUntil && (
                <>
                  <div className="text-gray-500">End Date:</div>
                  <div className="font-medium">{requestData.accessUntil.toLocaleDateString()}</div>
                </>
              )}
            </div>
          </div>
        );
      case 'book':
        return (
          <div className="py-2">
            <div className="flex items-center gap-2 mb-3">
              <Book className="h-5 w-5 text-blue-500" />
              <span className="text-sm font-medium text-gray-700">Book Access Request</span>
            </div>
            <div className="grid grid-cols-2 gap-3 text-sm border-t border-b border-gray-100 py-3">
              <div className="text-gray-500">Book ID:</div>
              <div className="font-medium">{requestData.bookId}</div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="fixed z-50 inset-0 overflow-y-auto" aria-labelledby="modal-title" role="dialog" aria-modal="true">
      <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>

        <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">&#8203;</span>
        
        <div className="inline-block align-bottom bg-white rounded-xl text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-emerald-100 sm:mx-0 sm:h-10 sm:w-10">
                <CheckCircle className="h-6 w-6 text-emerald-600" />
              </div>
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                <h3 className="text-lg leading-6 font-medium text-gray-900" id="modal-title">Approve Request</h3>
                <div className="mt-2">
                  <p className="text-sm text-gray-500">
                    You are about to approve access to the following item for {requestData.studentId}:
                  </p>
                  
                  <div className="mt-2 text-sm">
                    <h4 className="font-medium text-gray-900">{requestData.title}</h4>
                    <p className="text-emerald-600 font-medium">${requestData.price.toFixed(2)}</p>
                  </div>
                  
                  {getTypeSpecificDetails()}
                  
                </div>
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="w-full inline-flex justify-center rounded-lg border border-transparent shadow-sm px-4 py-2 bg-emerald-600 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-emerald-500 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onConfirm}
            >
              Approve
            </button>
            <button
              type="button"
              className="mt-3 w-full inline-flex justify-center rounded-lg border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
              onClick={onClose}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApproveModal;