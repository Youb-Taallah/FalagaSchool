import React from 'react';
import { Clock, Link, CalendarClock, FileText, MoreVertical, Edit2, Trash2 } from 'lucide-react';
import { 
  Card, 
  CardContent
} from '../ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { LiveSession } from '../../types/course';

export const LiveSessionCard = ({ session, courseName, onEdit, onDelete, formatDate }: { session: LiveSession, courseName: string, onEdit: () => void, onDelete: () => void, formatDate: (date: string) => string }) => {
  // Calculate if the session is upcoming or past
  const now = new Date();
  const sessionDate = new Date(session.date);
  const isPast = sessionDate < now;
  
  return (
    <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 bg-gradient-to-r from-white to-gray-50">
      <CardContent className="p-0">
        <div className="flex flex-col md:flex-row">
          {/* Left color band indicating status */}
          <div 
            className={`w-full md:w-1 h-2 md:h-auto ${
              isPast ? 'bg-gray-300' : 'bg-indigo-500'
            }`}
          />
          
          {/* Session date/time */}
          <div className="flex-shrink-0 p-4 md:p-6 md:w-64 flex flex-col justify-center items-start border-r border-gray-100">
            <div className="flex items-center text-gray-500 mb-1">
              <CalendarClock className="w-4 h-4 mr-2" />
              <span className="text-sm">{formatDate(session.date)}</span>
            </div>
            <div className="flex items-center text-gray-500">
              <Clock className="w-4 h-4 mr-2" />
              <span className="text-sm">{session.duration} minutes</span>
            </div>
            <Badge 
              className={`mt-3 ${
                isPast 
                  ? 'bg-gray-100 text-gray-600 hover:bg-gray-100' 
                  : 'bg-indigo-100 text-indigo-800 hover:bg-indigo-100'
              }`}
            >
              {isPast ? 'Past' : 'Upcoming'}
            </Badge>
          </div>
          
          {/* Session content */}
          <div className="flex-grow p-4 md:p-6">
            <div className="flex items-start justify-between">
              <div>
                <h3 className="text-lg font-semibold text-gray-900 mb-1">{session.title}</h3>
                <p className="text-sm text-indigo-600 font-medium mb-3">{courseName}</p>
              </div>
              
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={onEdit} className="cursor-pointer">
                    <Edit2 className="mr-2 h-4 w-4" />
                    <span>Edit</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={onDelete} className="cursor-pointer text-red-600">
                    <Trash2 className="mr-2 h-4 w-4" />
                    <span>Delete</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            
            {session.note && (
              <div className="flex items-start mt-2 text-gray-600">
                <FileText className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                <p className="text-sm">{session.note}</p>
              </div>
            )}
            
            <div className="mt-4 flex flex-wrap items-center gap-2">
              {session.ressources.length > 0 && (
                <div className="flex items-center">
                  <Badge variant="outline" className="mr-2">
                    {session.ressources.length} {session.ressources.length === 1 ? 'Resource' : 'Resources'}
                  </Badge>
                </div>
              )}
              
              {session.link && (
                <a 
                  href={session.link} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-800"
                >
                  <Link className="w-4 h-4 mr-1" />
                  Join Link
                </a>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};