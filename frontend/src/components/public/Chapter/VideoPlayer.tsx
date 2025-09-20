/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from 'react';
import { Play, Pause, Volume2, VolumeX, Maximize, SkipForward } from 'lucide-react';
import { useCurrentCourseStore } from '../../../stores/student/currentCourseStore';

interface VideoPlayerProps {
  className?: string;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({ className = '' }) => {
  const { getCurrentLesson, markLessonAsCompleted } = useCurrentCourseStore();
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [progress, setProgress] = useState(0);
  
  const currentLesson = getCurrentLesson();
  
  // This would use an actual video player in a real implementation
  // For this demo, we'll use a placeholder image
  
  const togglePlay = () => {
    setIsPlaying(!isPlaying);
  };
  
  const toggleMute = () => {
    setIsMuted(!isMuted);
  };
  
  const handleMarkComplete = () => {
    if (currentLesson) {
      markLessonAsCompleted(currentLesson.id);
    }
  };
  
  if (!currentLesson) {
    return (
      <div className={`bg-gray-900 rounded-lg overflow-hidden ${className}`}>
        <div className="h-full flex items-center justify-center text-gray-400">
          No lesson selected
        </div>
      </div>
    );
  }
  
  return (
    <div className={`bg-black rounded-lg overflow-hidden ${className} relative`}>
      {/* Video Placeholder - in a real app, this would be a video element */}
      <div className="aspect-video bg-gray-900 flex items-center justify-center">
        <img 
          src="https://images.pexels.com/photos/7605229/pexels-photo-7605229.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
          alt="Video thumbnail" 
          className="w-full h-full object-cover"
        />
        
        {!isPlaying && (
          <div className="absolute inset-0 flex items-center justify-center">
            <button 
              onClick={togglePlay}
              className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center text-white opacity-90 hover:opacity-100 transition-opacity"
            >
              <Play className="w-8 h-8" />
            </button>
          </div>
        )}
      </div>
      
      {/* Video Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="w-full h-1 bg-gray-700 rounded-full mb-3 cursor-pointer">
          <div 
            className="h-full bg-indigo-600 rounded-full transition-all duration-300 ease-in-out" 
            style={{ width: `${progress}%` }}
          ></div>
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <button 
              onClick={togglePlay} 
              className="text-white hover:text-indigo-400 transition-colors"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
            </button>
            
            <button 
              onClick={toggleMute} 
              className="text-white hover:text-indigo-400 transition-colors"
            >
              {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>
            
            <span className="text-white text-sm">
              0:00 / {currentLesson.duration}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <button 
              onClick={handleMarkComplete} 
              className="text-white text-sm hover:text-indigo-400 transition-colors"
            >
              {currentLesson.completed ? "Completed" : "Mark as complete"}
            </button>
            
            <button className="text-white hover:text-indigo-400 transition-colors">
              <SkipForward className="w-5 h-5" />
            </button>
            
            <button className="text-white hover:text-indigo-400 transition-colors">
              <Maximize className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;