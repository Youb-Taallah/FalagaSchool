import React from 'react';
import { X } from 'lucide-react';
import { cn } from '../utils';
import { Button } from './button';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  className?: string;
}

export function Modal({ isOpen, onClose, title, children, className }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="fixed inset-0 bg-black/50 transition-opacity" onClick={onClose} />
        <div className={cn(
          "relative w-full max-w-lg rounded-lg bg-white shadow-lg",
          "transform transition-all",
          className
        )}>
          <div className="flex items-center justify-between border-b p-4">
            <h3 className="text-lg font-semibold">{title}</h3>
            <Button
              variant="ghost"
              size="sm"
              className="p-1.5 h-auto"
              onClick={onClose}
            >
              <X size={16} />
            </Button>
          </div>
          <div className="p-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}