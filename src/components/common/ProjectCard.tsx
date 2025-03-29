
import { Link } from 'react-router-dom';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Project } from '@/types';
import { formatDistanceToNow } from 'date-fns';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard = ({ project }: ProjectCardProps) => {
  const {
    id,
    title,
    description,
    company,
    skills,
    status,
    createdAt,
    budget,
    duration
  } = project;

  return (
    <Link to={`/projects/${id}`}>
      <div className="bg-white rounded-lg border shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden">
        <div className="p-5">
          <div className="flex items-center gap-3 mb-3">
            <Avatar>
              <AvatarImage src={company.logo} />
              <AvatarFallback>{company.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
              <p className="text-sm text-gray-500">{company.name}</p>
            </div>
          </div>
          
          <p className="text-sm text-gray-700 line-clamp-2 mb-4">{description}</p>
          
          <div className="flex flex-wrap gap-2 mb-4">
            {skills.slice(0, 3).map((skill, index) => (
              <Badge key={index} variant="secondary" className="font-normal">
                {skill}
              </Badge>
            ))}
            {skills.length > 3 && (
              <Badge variant="outline" className="font-normal">
                +{skills.length - 3} more
              </Badge>
            )}
          </div>
          
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3 text-sm text-gray-500">
              {budget && <span>{budget}</span>}
              {duration && <span>• {duration}</span>}
            </div>
            
            <div className="flex items-center">
              <Badge 
                variant={status === 'open' ? 'default' : 'secondary'}
                className="capitalize"
              >
                {status}
              </Badge>
            </div>
          </div>
          
          <div className="mt-3 text-xs text-gray-400">
            Posted {formatDistanceToNow(new Date(createdAt), { addSuffix: true })}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProjectCard;
