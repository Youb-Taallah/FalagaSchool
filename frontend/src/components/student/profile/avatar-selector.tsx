import { useState } from 'react';
import { Check, X } from 'lucide-react';
import { cn } from '../../utils';
import { Button } from '../../ui/button';

interface AvatarSelectorProps {
  currentAvatar?: string;
  onSelect: (avatar: string) => void;
  onCancel: () => void;
}

const PRESET_AVATARS = [
  'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1542085/pexels-photo-1542085.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=300',
  'https://images.pexels.com/photos/1300402/pexels-photo-1300402.jpeg?auto=compress&cs=tinysrgb&w=300',
];

export function AvatarSelector({ currentAvatar, onSelect, onCancel }: AvatarSelectorProps) {
  const [selectedAvatar, setSelectedAvatar] = useState(currentAvatar);

  return (
    <div className="p-4 bg-white rounded-lg shadow-lg border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Select Avatar</h3>
        <Button variant="ghost" size="sm" onClick={onCancel} className="p-1.5 h-auto">
          <X size={16} />
        </Button>
      </div>
      <div className="grid grid-cols-4 gap-4">
        {PRESET_AVATARS.map((avatar) => (
          <button
            key={avatar}
            className={cn(
              "relative overflow-hidden rounded-full aspect-square transition-all transform hover:scale-105",
              selectedAvatar === avatar && "ring-2 ring-indigo-500 ring-offset-2"
            )}
            onClick={() => setSelectedAvatar(avatar)}
          >
            <img
              src={avatar}
              alt="Avatar option"
              className="w-full h-full object-cover"
            />
            {selectedAvatar === avatar && (
              <div className="absolute inset-0 bg-black/25 flex items-center justify-center">
                <Check size={24} className="text-white" />
              </div>
            )}
          </button>
        ))}
      </div>
      <div className="mt-4 flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button 
          onClick={() => selectedAvatar && onSelect(selectedAvatar)}
          disabled={!selectedAvatar}
        >
          Save
        </Button>
      </div>
    </div>
  );
}