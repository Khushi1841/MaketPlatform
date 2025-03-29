
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { User } from '@/types';

interface UserCardProps {
  user: User;
}

const UserCard = ({ user }: UserCardProps) => {
  const { id, name, avatar, role, bio, skills, location } = user;

  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(n => n[0])
      .join('')
      .toUpperCase();
  };

  return (
    <Link to={`/users/${id}`}>
      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="h-14 w-14">
              <AvatarImage src={avatar} />
              <AvatarFallback>{getInitials(name)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg">{name}</h3>
              <p className="text-sm text-gray-500 capitalize">{role}</p>
              {location && (
                <p className="text-xs text-gray-500 mt-1">{location}</p>
              )}
            </div>
          </div>
          
          {bio && <p className="text-sm text-gray-700 line-clamp-2 mb-4">{bio}</p>}
          
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {skills.slice(0, 4).map((skill, index) => (
                <Badge key={index} variant="secondary" className="font-normal">
                  {skill}
                </Badge>
              ))}
              {skills.length > 4 && (
                <Badge variant="outline" className="font-normal">
                  +{skills.length - 4} more
                </Badge>
              )}
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};

export default UserCard;
