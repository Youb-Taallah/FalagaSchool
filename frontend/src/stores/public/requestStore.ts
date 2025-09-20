import { create } from 'zustand';
import { Request } from '../../types/request';

interface RequestStore {
  requests: Request[];
  requestsLoading: boolean;
  requestsError: string | null;
  
  // Actions
  setRequests: (requests: Request[]) => void;
  addRequest: (request: Request) => void;
  setLoading: (loading: boolean) => void;
  setError: (error: string | null) => void;
  
  // Derived selectors
  getRequestsByStatus: (status: 'pending' | 'approved' | 'rejected') => Request[];
  getRequestsByType: (type: 'course' | 'chapter' | 'book') => Request[];
  getRequestById: (id: string) => Request | undefined;
}

export const useRequestStore = create<RequestStore>((set, get) => ({
  requests: [],
  requestsLoading: false,
  requestsError: null,
  
  setRequests: (requests) => set({ requests }),
  
  addRequest: (request) => set((state) => ({ requests: [...state.requests, request] })),
  
  setLoading: (loading) => set({ requestsLoading: loading }),
  
  setError: (error) => set({ requestsError: error }),

  getRequestsByStatus: (status) => { return get().requests.filter(request =>  request.status === status )},

  getRequestsByType: (type) => { return get().requests.filter(request =>  request.type === type )},

  getRequestById: (id) => get().requests.find(r => r.id === id),

}));