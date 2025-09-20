import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { cn } from '../utils';

// Create context for dialog state
const DialogContext = createContext<{
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  open: false,
  setOpen: () => {},
});

interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
}

export function Dialog({ 
  children, 
  open, 
  onOpenChange,
  className 
}: DialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  
  // Use controlled open state if provided, otherwise use internal state
  const isOpen = open !== undefined ? open : internalOpen;
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setIsOpen = (value: boolean) => {
    if (onOpenChange) onOpenChange(value);
    setInternalOpen(value);
  };

  // Close dialog on ESC key
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleEsc);
    
    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isOpen, setIsOpen]);
  
  // Prevent body scrolling when dialog is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);
  return (
    <DialogContext.Provider value={{ open: isOpen, setOpen: setIsOpen }}>
      <div className={cn(className)}>
        {children}
      </div>
    </DialogContext.Provider>
  );
}

interface DialogContentProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogContent({ children, className }: DialogContentProps) {
  const { open, setOpen } = useContext(DialogContext);
  const ref = useRef<HTMLDivElement>(null);
  
  // Handle clicking outside to close dialog
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node) && open) {
        // Check if click was on an overlay (not on dialog content)
        const target = event.target as HTMLElement;
        if (target.classList.contains('dialog-overlay')) {
          setOpen(false);
        }
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen, open]);
  
  if (!open) return null;
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="dialog-overlay absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in-0" />
      
      <div
        ref={ref}
        className={cn(
          "relative bg-white rounded-lg shadow-lg max-w-lg w-full mx-4 p-10 max-h-[calc(100vh-40px)] overflow-y-auto",
          "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-10",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}

interface DialogHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogHeader({ children, className }: DialogHeaderProps) {
  return (
    <div className={cn("flex flex-col px-6 pt-6 pb-0", className)}>
      {children}
    </div>
  );
}

interface DialogTitleProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogTitle({ children, className }: DialogTitleProps) {
  return (
    <h2 className={cn("text-lg font-semibold text-gray-900", className)}>
      {children}
    </h2>
  );
}

interface DialogDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogDescription({ children, className }: DialogDescriptionProps) {
  return (
    <p className={cn("text-sm text-gray-500 mt-1", className)}>
      {children}
    </p>
  );
}

interface DialogFooterProps {
  children: React.ReactNode;
  className?: string;
}

export function DialogFooter({ children, className }: DialogFooterProps) {
  return (
    <div className={cn(
      "flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 px-6 py-4 border-t border-gray-200",
      className
    )}>
      {children}
    </div>
  );
}

interface DialogCloseProps {
  children?: React.ReactNode;
  className?: string;
}

export function DialogClose({ children, className }: DialogCloseProps) {
  const { setOpen } = useContext(DialogContext);
  
  return (
    <button
      className={cn(
        "absolute top-4 right-4 rounded-sm opacity-70 ring-offset-background transition-opacity",
        "hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2",
        className
      )}
      onClick={() => setOpen(false)}
    >
      {children || (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <line x1="18" y1="6" x2="6" y2="18" />
          <line x1="6" y1="6" x2="18" y2="18" />
        </svg>
      )}
      <span className="sr-only">Close</span>
    </button>
  );
}