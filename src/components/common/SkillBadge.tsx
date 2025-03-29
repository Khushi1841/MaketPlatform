
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';

interface SkillBadgeProps {
  skill: string;
  onDelete?: (skill: string) => void;
  selectable?: boolean;
  selected?: boolean;
  onClick?: (skill: string) => void;
}

const SkillBadge = ({ 
  skill, 
  onDelete, 
  selectable = false,
  selected = false,
  onClick
}: SkillBadgeProps) => {
  const handleClick = () => {
    if (selectable && onClick) {
      onClick(skill);
    }
  };

  return (
    <Badge
      variant={selected ? "default" : "secondary"}
      className={`font-normal ${selectable ? 'cursor-pointer' : ''}`}
      onClick={handleClick}
    >
      {skill}
      {onDelete && (
        <button
          className="ml-1 hover:text-destructive focus:outline-none"
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onDelete(skill);
          }}
        >
          <X size={14} />
        </button>
      )}
    </Badge>
  );
};

export default SkillBadge;
