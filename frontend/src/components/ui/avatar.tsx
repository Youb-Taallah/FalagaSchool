import { cn } from '../utils';

interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  className?: string;
}

export function Avatar({ src, alt = 'Avatar', initials, className }: AvatarProps) {
  return (
    <div className={cn(
      "relative rounded-full overflow-hidden bg-gradient-to-br from-indigo-500 to-purple-600 text-white flex items-center justify-center",
      className
    )}>
      {src ? (
        <img 
          src={src} 
          alt={alt} 
          className="w-full h-full object-cover" 
        />
      ) : (
        <span className="font-medium">{initials}</span>
      )}
    </div>
  );
}