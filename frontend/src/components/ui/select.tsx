import React, { createContext, useContext, useState, useRef, useEffect } from 'react';
import { cn } from '../utils';

// Create context for select state
const SelectContext = createContext<{
  value: string;
  onValueChange: (value: string) => void;
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}>({
  value: '',
  onValueChange: () => {},
  open: false,
  setOpen: () => {},
});

interface SelectProps {
  children: React.ReactNode;
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  className?: string;
  disabled?: boolean;
}

export function Select({ 
  children, 
  value: controlledValue, 
  defaultValue = '',
  onValueChange,
  className,
  disabled = false
}: SelectProps) {
  const [internalValue, setInternalValue] = useState(defaultValue);
  const [open, setOpen] = useState(false);
  
  // Use controlled value if provided
  const value = controlledValue !== undefined ? controlledValue : internalValue;
  
  // Handle value change
  const handleValueChange = (newValue: string) => {
    if (onValueChange) {
      onValueChange(newValue);
    }
    setInternalValue(newValue);
    setOpen(false);
  };

  return (
    <SelectContext.Provider value={{ value, onValueChange: handleValueChange, open, setOpen }}>
      <div className={cn("relative", disabled && "opacity-50 pointer-events-none", className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
}

interface SelectTriggerProps {
  children?: React.ReactNode;
  className?: string;
  placeholder?: string;
  id?: string;
}

export function SelectTrigger({ 
  children, 
  className, 
  placeholder = "Select an option",
  id
}: SelectTriggerProps) {
  const { value, open, setOpen } = useContext(SelectContext);
  const hasValue = Boolean(value);
  
  return (
    <button
      type="button"
      id={id}
      className={cn(
        "flex items-center justify-between w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm",
        "focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-0",
        "text-left",
        className
      )}
      onClick={() => setOpen(!open)}
      aria-expanded={open}
    >
      {children || (
        <span className={cn(
          hasValue ? "text-gray-900" : "text-gray-400"
        )}>
          {hasValue ? value : placeholder}
        </span>
      )}
      
      <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className={cn(
          "h-4 w-4 text-gray-400 transition-transform",
          open && "rotate-180"
        )} 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <polyline points="6 9 12 15 18 9"></polyline>
      </svg>
    </button>
  );
}

interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export function SelectValue({ placeholder, className }: SelectValueProps) {
  const { value } = useContext(SelectContext);
  
  return (
    <span className={cn(
      value ? "text-gray-900" : "text-gray-400",
      className
    )}>
      {value || placeholder}
    </span>
  );
}

interface SelectContentProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectContent({ children, className }: SelectContentProps) {
  const { open, setOpen } = useContext(SelectContext);
  const ref = useRef<HTMLDivElement>(null);
  
  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [ref, setOpen]);
  
  if (!open) return null;
  
  return (
    <div
      ref={ref}
      className={cn(
        "absolute z-50 w-full mt-1 rounded-md bg-white p-1 shadow-lg border border-gray-200",
        "max-h-60 overflow-auto",
        "animate-in fade-in-80 zoom-in-95",
        className
      )}
    >
      {children}
    </div>
  );
}

interface SelectItemProps {
  children: React.ReactNode;
  value: string;
  className?: string;
  disabled?: boolean;
}

export function SelectItem({ 
  children, 
  value, 
  className,
  disabled = false
}: SelectItemProps) {
  const { value: selectedValue, onValueChange } = useContext(SelectContext);
  const isSelected = selectedValue === value;
  
  return (
    <button
      type="button"
      className={cn(
        "relative w-full flex items-center rounded-sm px-3 py-2 text-sm",
        "hover:bg-gray-100 cursor-pointer",
        isSelected && "bg-gray-100 font-medium",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
      onClick={() => {
        if (!disabled) {
          onValueChange(value);
        }
      }}
      disabled={disabled}
    >
      {children}
      {isSelected && (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-4 w-4 ml-auto text-indigo-600" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      )}
    </button>
  );
}

interface SelectGroupProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectGroup({ children, className }: SelectGroupProps) {
  return <div className={cn("p-1", className)}>{children}</div>;
}

interface SelectLabelProps {
  children: React.ReactNode;
  className?: string;
}

export function SelectLabel({ children, className }: SelectLabelProps) {
  return (
    <div className={cn(
      "px-3 py-1.5 text-xs font-semibold text-gray-500",
      className
    )}>
      {children}
    </div>
  );
}