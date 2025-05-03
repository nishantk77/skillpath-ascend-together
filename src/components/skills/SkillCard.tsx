
import { Link } from "react-router-dom";
import { Skill } from "@/types";

type SkillCardProps = {
  skill: Skill;
  showDetails?: boolean;
};

export default function SkillCard({ skill, showDetails = true }: SkillCardProps) {
  const { id, name, description, category, difficulty, imageUrl } = skill;

  return (
    <Link to={`/skills/${id}`} className="block h-full">
      <div className="skill-card h-full flex flex-col">
        <div className="relative w-full h-40 overflow-hidden rounded-lg mb-4">
          <img 
            src={imageUrl} 
            alt={name} 
            className="w-full h-full object-cover object-center"
          />
          <span className="absolute top-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded-full">
            {difficulty}
          </span>
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start mb-2">
            <h3 className="text-lg font-semibold">{name}</h3>
            <span className="text-xs bg-skillpath-pale-purple text-skillpath-dark-purple px-2 py-1 rounded-full">
              {category}
            </span>
          </div>
          {showDetails && (
            <p className="text-sm text-gray-600 line-clamp-2">{description}</p>
          )}
        </div>
      </div>
    </Link>
  );
}
